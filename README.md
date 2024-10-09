# jogakzip
조각집 Backend repository

### Git Convention

#### Branch

```
main
  |
  |------ develop
          |
          |------ feature/기능/#이슈번호

```

![image](https://github.com/user-attachments/assets/3214ddce-acbb-4eca-b207-49ce984e7b8a)

         
- main: 배포 가능한 상태의 브랜치
- develop: 기능 개발 브랜치들이 병합되는 중앙 브랜치
- feature(기능 개발 브랜치): 각 기능 단위로 생성하고 작업하는 브랜치

#### 작업 순서
1. 기능별 이슈를 만들고 여기서 feature 브랜치를 생성 후 작업
2. PR → develop 브랜치에 merge
3. 최종 완성 코드를 main 브랜치에 merge

#### Commit Message
```
<type>: <description>
[optional body]

ex) feat: 회원가입/로그인
    fix: 회원가입 이메일 인증 오류
```
#### Commit Type
| type      | 설명                                               |
|-----------|--------------------------------------------------|
| `feat`    | A new feature                                    |
| `test`    | Adding new test or making changes to existing test |
| `fix`     | A bug fix                                        |
| `perf`    | A code that improves performance                 |
| `docs`    | Documentation a related changes                  |
| `refactor` | Changes for refactoring                      |
| `build`   | Changes related to building the code             |
| `chore`   | Changes that do not affect the external user     |

- - -

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
- 도메인 별로 route-controller-service-model
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
