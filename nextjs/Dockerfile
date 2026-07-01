# 1. Node.js 기본 이미지 선택
FROM node:24.11.0-alpine

# 2. pnpm 설치를 위한 설정
RUN npm install -g pnpm

# 3. 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# 4. 패키지 파일 복사 및 의존성 설치
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --ignore-scripts

# 5. 나머지 소스 코드 복사
COPY . .

# 6. Next.js 빌드 진행 (빌드 타임 DB 연결 오류 방지용 플레이스홀더)
ARG DATABASE_URL=postgresql://placeholder:placeholder@placeholder/placeholder
ENV DATABASE_URL=${DATABASE_URL}
RUN pnpm build

# 7. Next.js 프로덕션 서버 실행 (3000 포트 오픈)
CMD ["pnpm", "start"]
