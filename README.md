# 정책자금 맞춤형 진단 웹앱

이 프로젝트는 정부 지원사업 심사위원이자 컨설턴트를 위한 **정책자금 맞춤형 진단 및 DB 수집 웹앱**입니다.
React, Tailwind CSS, Framer Motion을 사용하여 하이엔드 디자인과 인터랙티브한 사용자 경험을 제공합니다.

## 1. 프로젝트 실행 방법

### 필수 요구사항
- Node.js (v18 이상 권장)

### 설치 및 실행
터미널에서 다음 명령어를 순서대로 실행하세요.

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하면 앱을 확인할 수 있습니다.

## 2. 주요 기능

- **랜딩 페이지**: 신뢰감을 주는 디자인과 애니메이션.
- **맞춤형 설문**: 업종 및 업력 선택 (단계별 진행).
- **실시간 분석 연출**: 사용자의 선택에 따라 분석하는 듯한 로딩 애니메이션.
- **결과 리포트**: 선택 조건에 맞는 자금 추천.
- **DB 수집**: 상담 신청 시 이름/연락처 수집 및 Supabase 연동.

## 3. 기술 스택

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS (Deep Blue & White 테마)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (클라이언트 연동)

## 4. Supabase 설정

`src/lib/supabase.js` 파일에서 본인의 Supabase 프로젝트 정보를 입력해야 실제 데이터가 저장됩니다.

```javascript
const supabaseUrl = 'https://your-project-url.supabase.co'
const supabaseAnonKey = 'your-anon-key'
```

## 5. 유지보수 가이드

모든 주요 로직과 컴포넌트에는 **한글 주석**이 달려 있습니다. 코드를 수정할 때 주석을 참고하세요.
