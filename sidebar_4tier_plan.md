# 사이드바 4단계 계층 구조 개편 구현 계획서 (Flexible 4-Tier Hierarchy)

현재 3단계(`대분류` > `중분류` > `본문`) 구조로 이루어진 사이드바 및 CMS 데이터 파싱 아키텍처를 토스페이먼츠 개발자센터 스타일의 **`대분류` > `중분류` > `소분류` > `본문`** 4단계 구조로 확장하기 위한 설계안입니다. 

소분류가 없는 일반 항목도 유연하게 지원(하이브리드 지원)되도록 설계합니다.

---

## 1. 개편 아키텍처 개요

### 기존 구조 (3-Tier)
```
[대분류] (Category)
 └── [중분류] (SubCategory)
      └── [본문] (Item)
```

### 개편 구조 (Flexible 4-Tier)
```
[대분류] (Category)
 └── [중분류] (SubCategory)
      ├── [소분류] (ChildCategory)  <-- (선택 사항: 소분류가 없으면 바로 Item 나열)
      │    └── [본문] (Item)
      └── [본문] (Item)             <-- (소분류가 없는 경우 기존처럼 바로 노출)
```

---

## 2. Google Sheets CMS 열 구조 개편 방안

구글 스프레드시트에 **소분류 ID(`ChildCategoryID`)**와 **소분류 제목(`ChildCategoryTitle`)** 열을 새롭게 추가합니다.

### 변경된 스프레드시트 컬럼 명세

| 기존 열 | 새로 개편되는 열 (Column) | 필수 여부 | 설명 | 작성 예시 |
| :--- | :--- | :--- | :--- | :--- |
| CategoryID | **CategoryID** | 필수 | 대분류 ID | `service` |
| CategoryTitle | **CategoryTitle** | 필수 | 대분류 제목 | `결제 서비스` |
| SubCategoryID | **SubCategoryID** | 필수 | 중분류 ID | `widget` |
| SubCategoryTitle | **SubCategoryTitle** | 필수 | 중분류 제목 | `결제위젯` |
| -(신규) | **ChildCategoryID** | **선택** | **소분류 ID (소분류 없을 경우 빈칸)** | `understand` |
| -(신규) | **ChildCategoryTitle**| **선택** | **소분류 제목 (소분류 없을 경우 빈칸)** | `이해하기` |
| ItemID | **ItemID** | 필수 | 본문(가이드) ID | `widget-concept` |
| ItemTitle | **ItemTitle** | 필수 | 본문(가이드) 제목 | `결제위젯 개념 정리` |
| Icon | **Icon** | 필수 | Lucide 아이콘명 | `Wrench` |
| Summary | **Summary** | 선택 | 요약 설명 (`\|` 구분) | `요약1 \| 요약2` |
| MarkdownFile | **MarkdownFile** | 필수 | 마크다운 파일 경로 | `widget/concept.md` |
| YoutubeLink | **YoutubeLink** | 선택 | 유튜브 URL | `https://...` |

#### 스프레드시트 작성 시나리오 예시:

| CategoryID | CategoryTitle | SubCategoryID | SubCategoryTitle | ChildCategoryID | ChildCategoryTitle | ItemID | ItemTitle |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| service | 결제 서비스 | widget | 결제위젯 | understand | 이해하기 | widget-intro | 결제위젯 알아보기 |
| service | 결제 서비스 | widget | 결제위젯 | integration | 연동하기 | widget-order | ㄴ 주문서형 연동하기 |
| service | 결제 서비스 | widget | 결제위젯 | integration | 연동하기 | widget-popup | ㄴ 결제창형 연동하기 |
| basic | 기본 가이드 | assembly | 조립 및 피팅 | *(빈칸)* | *(빈칸)* | pedal | 페달 장착 방법 |

---

## 3. 코드 개편 계획

### Component 1: `src/utils/googleSheetsCMS.jsx` (데이터 파서)
- 기존: `Category -> SubCategory -> Item` 3단 파싱
- 개편:
  1. `ChildCategoryID` 가 존재하는 경우: `SubCategory.childCategories` 배열 아래에 소분류 생성 후 아이템 추가
  2. `ChildCategoryID` 가 빈칸인 경우: 기존처럼 `SubCategory.items` 배열 아래에 바로 아이템 추가
- 결과 반환 데이터 구조 (JSON 데이터 스키마):
  ```js
  {
    categories: [
      {
        id: "service",
        title: "결제 서비스",
        subCategories: [
          {
            id: "widget",
            title: "결제위젯",
            items: [ /* 소분류 없는 아이템들 */ ],
            childCategories: [ /* 소분류를 가진 그룹들 */
              {
                id: "integration",
                title: "연동하기",
                items: [
                  { id: "widget-order", title: "ㄴ 주문서형 연동하기", ... }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  ```

### Component 2: `src/data/guides.jsx` (로컬 백업 데이터)
- 구글 시트 연결 불가 시를 대비한 백업 데이터 파일 역시 확장된 4단계 JSON 구조로 업데이트.

### Component 3: `src/components/Sidebar.jsx` (사이드바 UI 렌더러)
- **접기/펴기 상태 관리 (`openChildCategories`)**:
  - 소분류 단계의 accordion 토글을 위한 로컬 state 추가 (`useState({})`).
- **3차 뎁스 UI 구현**:
  - `SubCategory` 영역 내부에 `childCategories`가 존재할 경우, 한 번 더 들여쓰기(`padding-left`)와 토글 화살표(`ChevronRight`/`ChevronDown`)를 적용하여 렌더링.
  - 소분류 항목 밑의 최하위 가이드 아이템은 토스페이먼츠 디자인처럼 `ㄴ` 모양 접두사 아이콘 및 들여쓰기 시각 효과 부여.

---

## 4. README.md 개편 계획

- **1. 메뉴 및 카테고리 관리 파트 업데이트**:
  - 구글 스프레드시트 표 명세에 `ChildCategoryID`, `ChildCategoryTitle` 열 추가 설명 명시.
  - "소분류가 필요한 경우" vs "소분류 없이 3단계만 사용할 경우"의 작성 팁 가이드 추가.
  - 업데이트된 작성 예시표 기재.

---

## 5. 검증 및 테스트 계획

1. **로컬 데이터 검증 (`guides.jsx`)**: 4단계 샘플 데이터를 작성하여 사이드바가 소분류가 있는 항목과 없는 항목 모두 올바르게 아코디언 토글 및 선택이 되는지 테스트.
2. **구글 시트 파싱 검증 (`googleSheetsCMS.jsx`)**: 빈칸 데이터 처리 및 파싱 결과 구조 검증.
3. **UI/UX 미관 검증**: 토스페이먼츠 스타일의 들여쓰기, 폰트 크기, 마우스 호버 효과 및 모바일 반응형 검증.
