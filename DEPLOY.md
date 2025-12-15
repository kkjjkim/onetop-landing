# 원탑경영컨설팅 랜딩페이지 - 배포 가이드

## 📋 프로젝트 정보

- **라이브 URL**: https://onetop-alpha.vercel.app
- **GitHub 저장소**: https://github.com/kkjjkim/onetop-landing
- **로컬 개발 서버**: http://localhost:5173

---

## 🚀 코드 수정 후 배포 방법

코드를 수정한 후, 터미널에서 아래 명령어를 실행하면 **자동으로 배포**됩니다:

```bash
git add . && git commit -m "변경내용 설명" && git push
```

### 예시:
```bash
git add . && git commit -m "연락처 정보 수정" && git push
```

Vercel이 GitHub 푸시를 감지하여 1-2분 내에 자동 배포합니다.

---

## 🛠️ 로컬에서 개발 및 테스트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

---

## 📊 Google Sheets 연동

상담신청 폼 데이터는 Google Apps Script를 통해 Google Sheets에 자동 기록됩니다.

- **Apps Script URL**: `https://script.google.com/macros/s/AKfycbzdwtQJ4KN7racN72gzgQtStA22GYAoWNvYY183kB0wS5xODPToYzObiJj96uByk2qb/exec`

---

## ✅ 완료된 설정

1. ✅ Google Apps Script URL 수정
2. ✅ 폼 제출 방식 개선 (URLSearchParams)
3. ✅ GitHub 저장소 연결 (자동 배포)
4. ✅ Vercel 도메인 설정 (onetop-alpha.vercel.app)
