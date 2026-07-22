# 전기자전거 웹 매뉴얼 관리 가이드 (CMS 통합 버전)

이 프로젝트는 누구나 쉽게 새로운 매뉴얼을 추가하고 관리할 수 있도록 설계되었습니다. 
코딩을 잘 모르시더라도 구글 스프레드시트와 GitHub 웹사이트만 있으면 100% 관리가 가능합니다.

---

## 🚀 실시간으로 수정 내용 확인하기 (라이브 뷰 - 초보자용)

내 컴퓨터(IDE)에서 수정한 내용을 실시간으로 확인하려면 아래 명령어를 사용하세요.

### 📝 실행 방법:
1. VS Code 하단 터미널(Terminal)창을 엽니다. (단축키: `Ctrl + `` `)
2. 아래 명령어를 입력하고 엔터를 누릅니다.
   ```bash
   npm run dev
   ```
3. 터미널에 뜨는 주소(예: `http://localhost:5173/`)를 `Ctrl + 클릭` 하거나 브라우저에 입력하면 실시간 화면이 열립니다.
   * **팁**: 코드를 수정하고 저장(`Ctrl + S`)하면 브라우저 화면이 자동으로 새로고침되어 반영됩니다!

---

## 📂 1. 좌측 메뉴판 & 카테고리 관리 (Google Sheets)
좌측에 보이는 네비게이션 메뉴와 통합 검색용 요약 데이터는 구글 스프레드시트에서 중앙 관리됩니다.

* **관리용 구글 스프레드시트 주소:**
  [Xtron Manual CMS 접속하기](https://docs.google.com/spreadsheets/d/e/2PACX-1vQLeyv9lic0ituxpPWhCvEfqnkEpttZn9GbGMIBtZGjErqYvKkzirEN2hVW-Q7Wy8rXQVzpcQcHTqwG/edit?usp=sharing) (관리자 권한 필요)

### 🚀 메뉴 수정 및 추가 방법 (스프레드시트 구조):

스프레드시트의 각 행(Row)은 화면에 표시될 **하나의 개별 가이드 항목**을 나타냅니다.

| 열 이름 (Column) | 설명 | 작성 예시 |
| :--- | :--- | :--- |
| **CategoryID** | 대분류를 식별하는 고유 영문 ID | `battery-guide` |
| **CategoryTitle** | 화면에 표시될 대분류 이름 | `배터리 가이드` |
| **SubCategoryID** | 중분류를 식별하는 고유 영문 ID | `battery-removal` |
| **SubCategoryTitle** | 화면에 표시될 중분류 이름 | `배터리 탈착` |
| **ChildCategoryID** | **[선택]** 소분류를 식별하는 고유 영문 ID (없을 경우 빈칸) | `seatpost` |
| **ChildCategoryTitle** | **[선택]** 화면에 표시될 소분류 이름 (없을 경우 빈칸) | `싯포스트형` |
| **ItemID** | 개별 가이드를 식별하는 고유 영문 ID | `battery-seatpost` |
| **ItemTitle** | 화면에 표시될 개별 가이드 제목 | `ㄴ 싯포스트 배터리 탈착` |
| **IconName** | 사용할 lucide-react 아이콘 이름 ([전체 목록 보기](https://lucide.dev/icons)) | `Key` |
| **Summary** | 검색 시 나타날 요약 설명 (여러 줄일 경우 `\|` 구분자 사용) | `싯포스트 일체형...` |
| **MarkdownFile** | 연결될 마크다운 문서 파일의 경로 | `battery/battery-seatpost.md` |
| **YoutubeLink** | (선택) 영상이 있는 경우 유튜브 주소 입력 | `https://youtu.be/...` (없으면 빈칸) |

#### 📝 작성 예시 데이터:
| CategoryID | CategoryTitle | SubCategoryID | SubCategoryTitle | ChildCategoryID | ChildCategoryTitle | ItemID | ItemTitle | Icon | Summary | MarkdownFile | YoutubeLink |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| battery-guide | 배터리 가이드 | battery-removal | 배터리 탈착 | seatpost | 싯포스트형 | battery-seatpost | ㄴ 싯포스트 배터리 탈착 | Key | 싯포스트 일체형... | battery/battery-seatpost.md | |
| basic | 기본 가이드 | basic-assembly | 조립 및 피팅 | | | pedal | 페달 장착 방법 | Wrench | 좌/우 페달 식별... | basic/pedal.md | https://youtu.be/... |

> **💡 스프레드시트 작성 팁 (3단계 vs 4단계 구조)**
> 소분류가 필요 없는 일반 항목(예: '페달 장착 방법')은 `ChildCategoryID`와 `ChildCategoryTitle`을 **빈칸**으로 두시면, 기존처럼 3단계(중분류 바로 아래 아이템)로 렌더링됩니다. 이름만 상황에 맞게 잘 지정해두시면 알아서 구조가 잡힙니다!

> **🎨 IconName 작성 가이드**
> [lucide.dev/icons](https://lucide.dev/icons)에서 원하는 아이콘을 검색한 뒤 **PascalCase** 이름을 그대로 입력합니다. 잘못된 이름이나 빈칸일 경우 자동으로 `HelpCircle`(❓) 아이콘이 표시됩니다.
>
> **현재 사용 중인 아이콘 목록:**
> `Wrench` · `BatteryCharging` · `AlertTriangle` · `Wind` · `ZapOff` · `Settings` · `MonitorPlay` · `ShieldAlert` · `VolumeX` · `Power` · `Activity` · `PersonStanding` · `Gauge` · `Lightbulb` · `ArrowLeftRight` · `Navigation` · `Key` · `Zap` · `CheckCircle`

### 🛠️ 데이터 연결 및 반영 방법:

스프레드시트에 입력된 데이터는 내부적으로 **`src/data/guides.jsx`** 형태의 중첩된 그룹 구조(Nested JSON)로 변환되어 사용됩니다.

1. **웹 브라우저 자동 연동 (캐싱 시스템 적용)**: 구글 스프레드시트 서버의 과부하(Rate Limit)를 방지하고 사용자의 웹페이지 로딩 속도를 극대화하기 위해 **5분 단위의 브라우저 캐싱(Session Storage)**이 적용되어 있습니다. 
   * **반영 시간:** 스프레드시트에서 내용을 수정한 뒤, 사용자가 사이트에 접속(또는 새로고침)하면 **최대 5분 안**에 자동으로 업데이트된 내용이 반영됩니다.
   * **즉시 확인:** 캐시가 만료되기 전 즉시 확인하고 싶다면 브라우저의 새 탭이나 시크릿 창을 열어 접속하시면 바로 확인 가능합니다.
2. **수동 코드 반영 (로컬 개발 시)**: 오프라인이나 로컬 코드 위주로 작업하신다면, 스프레드시트의 내용을 바탕으로 `src/data/guides.jsx` 파일에 직접 위 데이터 구조에 맞게 코드를 추가해 주시면 됩니다.

---

## 📝 2. 본문 내용 작성 및 수정 (GitHub Markdown)
가이드 본문의 상세한 텍스트와 사진은 GitHub 저장소에 보관된 **마크다운(.md)** 파일들로 관리됩니다.

### 🚀 내용 수정하는 방법:
1. GitHub 저장소로 이동합니다. (`src/data/markdown/` 폴더)
   👉 [저장소 마크다운 폴더 바로가기](https://github.com/Rinology/xtron-manual/tree/main/src/data/markdown)
2. 수정하고 싶은 파일(예: `pedal.md`)을 클릭하여 엽니다.
3. 우측 상단의 **✏️ (연필 모양 버튼)**을 누릅니다.
4. 구글 문서처럼 자유롭게 글을 쓰고 사진 링크를 넣습니다.
5. 작성을 완료한 후 우측 상단의 초록색 **[Commit changes...]** 버튼을 누르면 즉시 실서버(Vercel)에 배포가 시작됩니다. (약 1분 뒤 반영)

### 🌟 새로운 마크다운(새 가이드 본문) 추가하기 (초보자용 GitHub 가이드):
1. GitHub 저장소의 `src/data/markdown/` 폴더로 이동합니다.
2. 우측 상단에 있는 **[Add file]** 버튼을 클릭하고 **[Create new file]**을 선택합니다.
3. 파일 이름 입력칸에 원하는 영어 이름과 함께 `.md` 확장자를 붙여 적어줍니다. (예: `new-guide.md`)
4. 아래쪽 넓은 편집창에 마크다운 문법으로 원하는 내용을 자유롭게 작성합니다.
5. 작성이 끝나면 우측 상단의 초록색 **[Commit changes...]** 버튼을 누르고, 다시 나타나는 창에서 초록색 버튼을 한 번 더 누르면 파일이 저장됩니다.
6. 마지막으로, 방금 만든 파일의 이름(`new-guide.md`)을 구글 스프레드시트의 `MarkdownFile` 열에 똑같이 적어주시면 홈페이지와 완벽하게 연결됩니다!
   * **💡 꿀팁:** `basic`, `battery` 등 하위 폴더에 파일을 분류해 넣었더라도 스프레드시트에는 폴더 경로 없이 **파일명만(`new-guide.md`)** 적으시면 시스템이 똑똑하게 알아서 찾아줍니다!

> [!IMPORTANT]
> **스프레드시트 목차 등록 시 주의사항!**
> 1. **목차 등록 필수:** GitHub에 `.md` 파일을 작성했다면 반드시 구글 스프레드시트(목차)에 행을 추가해 파일명을 등록해야 홈페이지 메뉴에 나타납니다.
> 2. **⚠️ 파일명 중복 주의:** 시스템이 파일명만으로 전체 폴더를 뒤져서 알아서 문서를 찾아오기 때문에, 다른 폴더에 있더라도 **마크다운 파일명은 절대 중복되지 않게 고유한 이름**으로 지어주셔야 오류가 발생하지 않습니다!

> [!TIP]
> **🚀 깃허브 충돌(Conflict) 방지를 위한 꿀팁 (작업 영역 분리)**
> 브랜치(Branch)나 PR(Pull Request) 같은 복잡한 깃허브 기능 없이도, 여러 명이 충돌(에러) 없이 안전하게 동시 작업하는 가장 확실한 방법은 **'작업 영역을 완벽하게 나누는 것'**입니다.
> - **👨‍💻 개발자 (로컬 IDE 사용):** 사이트 기능과 뼈대가 되는 `src/components`, `src/utils` 등의 '코드 파일'만 수정합니다.
> - **📝 콘텐츠 작성자 (웹사이트 사용):** 매뉴얼 본문이 들어있는 `src/data/markdown` 안의 **`.md` 파일들만 수정**합니다.
> 
> 서로 수정하는 '폴더와 파일'이 겹치지만 않는다면, 복잡한 절차 없이 웹에서 곧바로 초록색 **[Commit changes]** 버튼을 눌러도 충돌 없이 알아서 병합(Merge)되어 사이트에 반영됩니다!

---

## 📸 3. 마크다운 자동 디자인 및 기본 문법

단순한 텍스트로 작성된 마크다운(.md) 파일이 웹페이지에서 깔끔하게 보이는 이유는 시스템(`GuideContent.jsx`)이 텍스트를 읽고 미리 지정된 브랜드 디자인을 **자동으로 덧입혀주기 때문**입니다. 작성자는 디자인을 신경 쓸 필요 없이 내용에만 집중하시면 됩니다!

### 🎨 자동 적용되는 스타일 및 문법

* **제목 달기 (Heading)**: `#` 기호를 씁니다.
  ```markdown
  ### 이것은 소제목입니다
  #### 이것은 더 작은 제목입니다
  ```
  👉 **결과:** 폰트 크기가 커지고, 브랜드 컬러(파란색)와 여백 및 하단 테두리가 자동으로 예쁘게 적용됩니다.

* **인용문 및 경고 박스 (Blockquote)**: `>` 기호를 씁니다.
  ```markdown
  > [!CAUTION]
  > **안전 안내 사항**
  > 반드시 전원을 차단하고 배터리를 분리하십시오.
  ```
  👉 **결과:** 좌측에 굵은 파란색 테두리가 생기고, 옅은 배경색이 깔린 예쁜 알림/경고 박스 형태로 디자인됩니다.

* **사진 넣기 (AWS S3 연동 및 크기 규격)**: 
  사진은 프로젝트 용량 관리를 위해 **AWS S3**에 업로드하고 가져옵니다. 시스템 환경 변수(`.env`)에 기본 CDN 도메인이 설정되어 있으므로, 전체 주소를 적을 필요 없이 **S3 폴더 경로와 파일명**만 적으면 자동으로 렌더링됩니다.
  ```markdown
  ![사진설명글](/project/xtron-guide/basic/pedal-01.webp)
  ```
  👉 **이미지 자동 최적화 규격:**
  모든 이미지는 화면 렌더링 시 **가로 최대 600px, 세로 최대 600px**로 자동 제한됩니다. 아무리 해상도가 높거나 세로로 긴 사진을 넣어도 화면을 벗어나지 않고 **원본 비율을 유지하며 안전하게 축소**되므로 사이즈를 억지로 맞춰서 올리실 필요가 없습니다. (추가로 모서리가 8px 둥글게 깎이고 깔끔한 테두리가 적용됩니다.)

  ### ⚡ AWS S3 + CloudFront 연동 아키텍처 (비용 및 속도 최적화)
  AWS S3에 이미지를 올리고 CloudFront를 연동하면 트래픽 비용이 절감되고 로딩 속도가 극대화됩니다.
  
  #### 📊 데이터 흐름 다이어그램
  ```mermaid
  sequenceDiagram
      participant User as 👤 사용자 브라우저
      participant Vercel as 🌐 Vercel (프론트엔드)
      participant CF as ⚡ CloudFront (캐시 서버)
      participant S3 as 🪣 AWS S3 (원본 저장소)

      Note over User, Vercel: [1단계] 웹사이트 최초 접속
      User->>Vercel: 웹사이트 접속 (xtron-manual)
      Vercel-->>User: 글자, 레이아웃, 코드 전달 (빠름)

      Note over User, S3: [2단계] 첫 번째 이미지 요청 (최초 1회)
      User->>CF: 1번 사진 보여줘! (pedal.jpg)
      CF->>S3: (캐시에 없음) S3야 1번 사진 줘!
      S3-->>CF: 1번 사진 전달 (S3 ➡️ CF 전송비용 무료)
      CF-->>User: 사진 전달 및 CloudFront 서버에 임시 저장(캐싱)

      Note over User, S3: [3단계] 두 번째 방문 혹은 다른 사람의 접속
      User->>CF: 1번 사진 보여줘! (pedal.jpg)
      CF-->>User: S3 안 가고 저장해둔 사진 바로 전달! (초고속)
      
      Note right of CF: ✨ S3 트래픽 미발생 (비용 절감) <br> ✨ 로딩 속도 압도적 향상
  ```
  
  * **비용 절감 원리:** 첫 1명째 방문 시에만 S3에서 사진을 꺼내오고 나머지 방문자들에게는 CloudFront가 복사본을 전달하므로 **S3 아웃바운드 트래픽 요금**이 거의 발생하지 않습니다. (CloudFront는 매월 1TB 무료)
  * **설정 팁:** CloudFront는 기존 AWS 계정에서 별도 가입 없이 바로 연결 세팅이 가능합니다.
  * **URL 변경:** 마크다운에 주소를 적을 때 길고 복잡한 S3 주소(`s3.ap-northeast...`) 대신 **CloudFront가 제공하는 짧은 주소(`d1234abcd.cloudfront.net`)**를 사용하세요.

* **유튜브 영상 버튼 넣기**: 
  메뉴 데이터(구글 스프레드시트) 쪽에 `youtubeLink` 같은 별도 항목을 두어 버튼화하는 것도 가능하며, 마크다운 본문에도 직접 링크를 적어주면 작동합니다.

* **강조 및 목록**:
  ```markdown
  **이 글씨는 굵게 나옵니다**
  * 항목 1
  * 항목 2
  ```
  👉 **결과:** 줄 간격이 넓고 가독성 좋은 부드러운 회색 톤(`lineHeight: 1.6`)으로 렌더링됩니다.

---

## 🤖 4. 자가진단 마법사 봇 질문 수정 (스프레드시트 연동)

메인 화면에 뜨는 챗봇 스타일의 '상황별 자가진단 마법사' 질문 흐름은 구글 스프레드시트의 **`WizardFlow`** 탭에서 전적으로 관리됩니다. 

구글 AppSheet와의 완벽한 호환성과 확장성을 모두 고려하여, **"1행 = 1개의 선택지(버튼)"** 형식의 데이터베이스(DB) 정규화 모델로 설계되어 있습니다.

### 📊 자가진단 마법사 스프레드시트 구조 (WizardFlow 탭)

| 열 이름 (Column) | 설명 | AppSheet 역할 |
| :--- | :--- | :--- |
| **RowID** | **[필수]** 각 행을 식별하는 고유 ID (예: `OPT-001`, `OPT-002`). | `Key` 컬럼 (Primary Key) |
| **NodeID** | 질문의 묶음(화면)을 식별하는 ID (예: `start`, `power_1`). 이 값이 같은 행들은 하나의 화면(질문)에 나오는 버튼들로 묶입니다. | `Group By` 기준 컬럼 |
| **Question** | 화면 최상단에 띄울 질문 내용입니다. (동일한 `NodeID` 안에서는 같은 질문을 복사해 넣습니다.) | 화면 제목 텍스트 |
| **OptionLabel** | 사용자가 누르게 될 선택지 버튼의 텍스트입니다. | 버튼 텍스트 |
| **NextNodeID** | 버튼을 눌렀을 때 이어질 다음 질문의 `NodeID`입니다. (가이드로 바로 넘어갈 경우 비워둡니다.) | 다음 화면 라우팅 |
| **ResultItemID** | 버튼을 눌렀을 때 연결할 최종 가이드의 `ItemID`입니다. (기존 가이드 시트의 ItemID와 동일. 다음 질문이 있을 경우 비워둡니다.) | 최종 결과(URL) 매핑 |
| **Keywords** | (선택사항) 초기 `start` 화면에서 사용자가 검색할 때 걸리게 할 보조 키워드(유의어)들을 쉼표로 구분해 넣습니다. (예: `충전불가, 배터리 부족, 방전`) | 검색 보조 키워드 |

> **💡 ResultItemID의 역할은 무엇인가요?**
> `ResultItemID`는 스무고개의 **최종 정답지**를 의미합니다. 예를 들어 사용자가 선택지를 누르다가 이 값에 `error-tire`가 적혀 있다면, 마법사는 즉시 "이 문제를 해결하려면 '타이어 공기압' 가이드를 보세요!" 라고 판단하여 `troubleshooting/error-tire.md` 문서로 화면을 자동 이동시켜 줍니다.

#### 📝 실제 데이터 입력 예시 (Keywords 활용)

| RowID | NodeID | Question | OptionLabel | Keywords | NextNodeID | ResultItemID |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| OPT-001 | `start` | 어떤 종류의 문제를 겪고 계신가요? | 전원이 안 켜지거나 배터리 문제 | `방전, 충전불가, 켜지지않음` | `power_sub_1` | |
| OPT-002 | `start` | 어떤 종류의 문제를 겪고 계신가요? | 주행 시 소음이나 소리가 남 | `소리, 끽끽, 딸깍` | `noise_sub_1` | |
| OPT-003 | `start` | 어떤 종류의 문제를 겪고 계신가요? | 자전거가 잘 안 나감 (주행감 저하) | `무거움, 타이어, 바람, 펑크` | | `error-tire` |
| OPT-004 | `power_sub_1` | 충전 시 어댑터의 LED 색상은 무엇인가요? | 빨간색 (충전 중 표시) | | `power_sub_2` | |
| OPT-005 | `power_sub_1` | 충전 시 어댑터의 LED 색상은 무엇인가요? | 초록색 (완충 표시) 이지만 안 켜짐 | | | `error-power` |

### 🧠 동작 원리 및 시각화 (흐름도)

자가진단 마법사는 위 표를 바탕으로, 사용자가 겪고 있는 문제를 단계별로 좁혀나가 최종적으로 **가장 적합한 가이드 문서(MD)**를 매칭해 주는 시스템입니다.

```mermaid
graph TD
    %% 시작 노드
    Start["어떤 종류의 문제를 겪고 계신가요?"]

    %% 1단계 선택지
    Start -->|전원이 안 켜지거나 배터리 문제| Power1["충전기를 연결했을 때 어댑터(충전기)의 LED 색상은?"]
    Start -->|주행 시 소음이나 소리가 남| Noise1["소음이 발생하는 부위가 어디인가요?"]
    Start -->|자전거가 잘 안 나감| ResultTire(("타이어 가이드 (error-tire)"))

    %% 전원 문제 세부 노드 (Power1)
    Power1 -->|빨간색 (충전 중 표시)| Power2["충전 후에도 모니터가 켜지지 않나요?"]
    Power1 -->|초록색 (완충 표시) 이지만 안 켜짐| ResultPower1(("전원 가이드 (error-power)"))

    %% 스타일링
    classDef questionNode fill:#f9f9ff,stroke:#3b82f6,stroke-width:2px,color:#1e293b,font-weight:bold
    classDef resultNode fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff,font-weight:bold
    
    class Start,Power1,Power2,Noise1 questionNode
    class ResultTire,ResultPower1 resultNode
```

 