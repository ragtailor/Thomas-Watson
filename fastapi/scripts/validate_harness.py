"""
Star Topology Harness Validator
================================
Karpathy의 하네스 엔지니어링을 온톨로지 레이어에 적용한다.
_docs/**/*.md 파일의 frontmatter가 hub-spoke 토폴로지 규칙을 따르는지 검증한다.

실행: python scripts/validate_harness.py
설치 필요: pip install pyyaml

온톨로지 MD frontmatter 스키마:
    ---
    type: spoke          # hub 또는 spoke
    app: silicon_valley  # 이 문서가 속한 앱 이름
    links:               # 연결되는 다른 앱(노드) 목록
      - star_craft
    ---

검증 규칙:
  1. 필수 frontmatter 필드: type, app, links
  2. type 값은 'hub' 또는 'spoke'만 허용
  3. type: hub 는 star_craft 앱 전용
  4. spoke는 반드시 star_craft(hub)를 links에 포함
  5. spoke-to-spoke 직접 링크 금지
  6. 고립 노드(links 없음) 금지
  7. 링크 그래프에서 순환 참조 금지
"""

import sys
import re
from pathlib import Path

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML이 설치되지 않았습니다. 실행: pip install pyyaml")
    sys.exit(1)

HUB_APP = "star_craft"
SPOKE_APPS = {
    "titanic", "kingsman", "lion_king",
    "sherlock_homes", "silicon_valley", "harry_porter", "jobs",
}
ALL_APPS = {HUB_APP} | SPOKE_APPS
REQUIRED_FIELDS = {"type", "app", "links"}
VALID_TYPES = {"hub", "spoke"}

_FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---", re.DOTALL)


def _parse_frontmatter(path: Path) -> dict | None:
    text = path.read_text(encoding="utf-8")
    m = _FRONTMATTER_RE.match(text)
    if not m:
        return None
    try:
        return yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError as exc:
        print(f"  YAML 파싱 오류 [{path}]: {exc}")
        return None


def _collect_nodes(root: Path) -> list[tuple[Path, dict]]:
    nodes = []
    for md_file in sorted(root.rglob("_docs/**/*.md")):
        fm = _parse_frontmatter(md_file)
        if fm is not None:
            nodes.append((md_file, fm))
    return nodes


def _detect_cycle(graph: dict[str, list[str]]) -> list[str] | None:
    """DFS로 순환 참조를 탐지한다. 순환 경로 반환, 없으면 None."""
    visited: set[str] = set()
    stack: set[str] = set()

    def dfs(node: str, path: list[str]) -> list[str] | None:
        visited.add(node)
        stack.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                result = dfs(neighbor, path + [neighbor])
                if result:
                    return result
            elif neighbor in stack:
                return path + [neighbor]
        stack.discard(node)
        return None

    for node in graph:
        if node not in visited:
            result = dfs(node, [node])
            if result:
                return result
    return None


def validate(root: Path) -> bool:
    nodes = _collect_nodes(root)

    if not nodes:
        print("WARNING: 온톨로지 MD 파일을 찾을 수 없습니다.")
        print("         _docs/ 하위 MD 파일에 frontmatter를 추가하세요.")
        return True

    errors: list[str] = []
    link_graph: dict[str, list[str]] = {}

    for path, fm in nodes:
        rel = path.relative_to(root)

        # Rule 1: 필수 필드
        missing = REQUIRED_FIELDS - set(fm.keys())
        if missing:
            errors.append(f"[{rel}] 필수 frontmatter 필드 누락: {missing}")
            continue

        node_type = fm["type"]
        app = str(fm["app"])
        links: list[str] = list(fm.get("links") or [])

        # Rule 2: type 유효성
        if node_type not in VALID_TYPES:
            errors.append(f"[{rel}] type 값이 올바르지 않습니다: '{node_type}' (허용: hub, spoke)")

        # Rule 3: hub는 star_craft 전용
        if node_type == "hub" and app != HUB_APP:
            errors.append(
                f"[{rel}] type: hub는 '{HUB_APP}'만 선언할 수 있습니다. "
                f"현재 app='{app}'"
            )

        # Rule 6: 고립 노드
        if not links:
            errors.append(
                f"[{rel}] 고립 노드 — links가 비어 있습니다. "
                f"모든 노드는 최소 하나의 링크를 가져야 합니다."
            )

        if node_type == "spoke":
            # Rule 4: spoke는 반드시 hub를 포함
            if HUB_APP not in links:
                errors.append(
                    f"[{rel}] Spoke '{app}'이 허브 '{HUB_APP}'에 연결되지 않았습니다. "
                    f"links에 '{HUB_APP}'을 추가하세요."
                )

            # Rule 5: spoke-to-spoke 직접 링크 금지
            spoke_links = [lnk for lnk in links if lnk in SPOKE_APPS and lnk != app]
            if spoke_links:
                errors.append(
                    f"[{rel}] Spoke '{app}'이 다른 spoke를 직접 참조합니다: {spoke_links}. "
                    f"반드시 '{HUB_APP}'을 경유하세요."
                )

        link_graph.setdefault(app, []).extend(links)

    # Rule 7: 순환 참조
    cycle = _detect_cycle(link_graph)
    if cycle:
        errors.append(f"순환 참조 감지: {' → '.join(cycle)}")

    if errors:
        print(f"\n하네스 검증 실패 — {len(errors)}개 오류:\n")
        for err in errors:
            print(f"  ✗ {err}")
        print()
        return False

    print(f"하네스 검증 통과 — {len(nodes)}개 온톨로지 노드 확인 완료.")
    return True


if __name__ == "__main__":
    repo_root = Path(__file__).parent.parent
    success = validate(repo_root)
    sys.exit(0 if success else 1)
