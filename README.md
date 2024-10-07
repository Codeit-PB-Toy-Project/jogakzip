# jogakzip
조각집 Backend repository

## 프로젝트 개요
- 제목: 조각집   
- 소개: 기억 저장 및 공유 서비스
- 주요 기능
  - 그룹
    - 그룹 등록/수정/삭제, 그룹 목록 조회, 그룹 상세 조회
    - 그룹 배지
  - 게시글(추억)
    - 게시글 등록/수정/삭제, 게시글 목록 조회, 게시글 상세 조회
  - 댓글
    - 댓글 등록/수정/삭제, 댓글 목록 조회

## 기술 스택
JavaScript, Node.js, express, MongoDB

## 폴더 구조
(추후 수정)
```
jogakzip/
├── src/
│   ├── config/
│   ├── domain/
│   │   ├── groups/
│   │   │   ├── group-model.js
│   │   │   ├── group-service.js
│   │   │   ├── group-controller.js
│   │   │   ├── group-route.js
│   │   ├── posts/
│   │   │   ├── post-model.js
│   │   │   ├── post-service.js
│   │   │   ├── post-controller.js
│   │   │   ├── post-route.js
│   │   ├── comments/
│   │   │   ├── comment-model.js
│   │   │   ├── comment-service.js
│   │   │   ├── comment-controller.js
│   │   │   ├── comment-route.js
│   │   ├── images/
│   │   │   ├── image-model.js
│   │   │   ├── image-service.js
│   │   │   ├── image-controller.js
│   │   │   ├── image-route.js
│   ├── exception/
│   ├── middleware/
│   ├── utils/
│   ├── tests/
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── app.js
├── server.js

```

## 배포
