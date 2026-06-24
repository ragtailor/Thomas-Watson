# Backend — tailor

FastAPI Python 백엔드. 루트 지침은 [../CLAUDE.md](../CLAUDE.md)를 참고한다.

---

## 실행

```powershell
cd tailor
$env:PYTHONPATH = ".;apps"
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

---

## 환경 변수

`tailor/.env`를 `.env.example` 기반으로 생성한다.

```
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/dbname
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash   # 선택
```

---

## 의존성

```bash
cd tailor
pip install -r requirements.txt
pip install -r requirements-test.txt
```

---

## DB 마이그레이션

테이블은 앱 시작 시 `create_all_tables()`로 자동 생성된다. Alembic이 필요할 때:

```bash
cd tailor
alembic revision --autogenerate -m "description"
alembic upgrade head
```

---

## 아키텍처

**헥사고날(Ports & Adapters)** 아키텍처를 사용한다.

```
tailor/
├── main.py                 # FastAPI 엔트리포인트, CORS, lifespan
├── core/
│   └── matrix/             # DB 엔진·세션 (SQLAlchemy async), Gemini 클라이언트
└── apps/
    ├── titanic/            # 타이타닉 승객 CSV 업로드·조회 (ML 교육용)
    ├── kingsman/           # 사용자·관리자 관리
    ├── lion_king/          # 소셜 기능 (스켈레톤)
    ├── sherlock_homes/     # 문서 분석
    └── jobs/               # DB 헬스체크
```

각 앱은 다음 레이어로 구성된다.

```
apps/<앱명>/
├── domain/             # 엔티티·값 객체 (순수 비즈니스 로직, 외부 의존 없음)
├── app/
│   ├── ports/input/    # 유스케이스 인터페이스 (입력 포트)
│   ├── ports/output/   # 레포지터리 인터페이스 (출력 포트)
│   ├── dtos/           # Query / Command / Response 데이터 클래스
│   └── use_cases/      # 유스케이스 구현체 (인터랙터)
├── adapter/
│   ├── inbound/api/    # FastAPI 라우터 및 Pydantic 스키마
│   └── outbound/       # ORM 모델, PostgreSQL 레포지터리
├── dependencies/       # FastAPI DI 프로바이더
└── tests/              # 단위 테스트 (TDD, DB 불필요)
    ├── domain/
    ├── app/use_cases/
    └── adapter/
```

**의존성 방향:** `adapter` → `app` → `domain`. 역방향 임포트는 순환 참조를 유발한다.

**Python import 경로:** `tailor/`와 `tailor/apps/`가 PYTHONPATH에 포함되므로 `from titanic.xxx import ...` 형태로 임포트한다 (`from apps.titanic.xxx`가 아님).

---

## 앱 목록

| 앱 | 역할 | CLAUDE.md |
|----|------|-----------|
| `titanic` | 타이타닉 승객 CSV 업로드·조회 (ML 교육용) | [apps/titanic/_docs/CLAUDE.md](apps/titanic/_docs/CLAUDE.md) |
| `kingsman` | 사용자·관리자 관리 | — |
| `lion_king` | 소셜 기능 (스켈레톤) | — |
| `sherlock_homes` | 문서 분석 | — |
| `jobs` | DB 헬스체크 | — |

새 앱을 추가할 때 위 표에 행을 추가하고, `apps/<앱명>/_docs/CLAUDE.md`를 생성한다.

---

## 네이밍 컨벤션

파일명·클래스명·라우터 prefix에 **영화 캐릭터 이름**을 bounded context 식별자로 사용한다.

예: `james_router`, `rose_router`, `walter_repository`

앱별 캐릭터 목록은 해당 앱의 `_docs/CLAUDE.md`를 참고한다.

---

## 테스트 (TDD)

켄트 벡의 **Red → Green → Refactor** 사이클을 적용한다.

```bash
cd tailor
python -m pytest                          # 전체
python -m pytest apps/titanic/tests/ -v   # 앱별
```

`pytest.ini`가 `tailor/` 루트에 있으며 `asyncio_mode = auto`로 설정되어 있다.

---

## 머신러닝 데이터 분석 원칙

### Categorical — 카테고리로 묶이는 데이터

| 척도 | 설명 | 예시 |
|------|------|------|
| **nominal** (명목) | 순서 없이 이름으로만 구분 | 청팀 / 홍팀 / 백팀 |
| **ordinal** (순위) | 순서(서열)가 존재하나 간격은 불균일 | 매우 낮음 / 낮음 / 보통 / 높음 / 매우 높음 |

### Quantitative — 숫자로 측정되는 데이터

| 척도 | 설명 | 예시 |
|------|------|------|
| **interval** (등간) | 일정한 측정 구간, 절대적 원점 없음 — 배율 비교 불가 | 온도, pH, 시간대 |
| **ratio** (비율) | 절대적 원점(0)이 존재 — 배율 비교 가능 | 나이, 금액, 몸무게 |

---

## async 사용 원칙

메소드에 `async`를 붙일지 여부는 **I/O 여부**로 판단한다.

| 성격 | 형태 | 이유 |
|------|------|------|
| CPU-bound (형태소 분석, 순수 연산 등) | `def` | `async def`로 바꿔도 이벤트 루프를 비블로킹으로 만들지 않음. `async` 표시만 붙고 실제로는 블로킹 — 더 나쁜 상황 |
| I/O-bound (DB, 외부 API, 파일 등) | `async def` | `await`로 이벤트 루프를 양보할 수 있음 |

CPU-bound 작업이 실제로 무거워서 이벤트 루프 블로킹이 문제가 된다면, 메소드를 `async`로 바꾸지 말고 **호출 측에서 스레드풀로 넘긴다.**

```python
await asyncio.to_thread(use_case.analyze_intent, question)
```
