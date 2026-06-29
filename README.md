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
| **CategoryID** | 대분류를 식별하는 고유 영문 ID | `basic` |
| **CategoryTitle** | 화면에 표시될 대분류 이름 | `기본 가이드` |
| **SubCategoryID** | 중분류를 식별하는 고유 영문 ID | `basic-assembly` |
| **SubCategoryTitle** | 화면에 표시될 중분류 이름 | `조립 및 피팅` |
| **ItemID** | 개별 가이드를 식별하는 고유 영문 ID | `pedal` |
| **ItemTitle** | 화면에 표시될 개별 가이드 제목 | `페달 장착 방법` |
| **Icon** | 사용할 lucide-react 아이콘 이름 | `Wrench` |
| **Summary** | 검색 시 나타날 요약 설명 (여러 줄일 경우 `\|` 구분자 사용) | `좌/우 페달 식별... \| 페달 렌치로...` |
| **MarkdownFile** | 연결될 마크다운 문서 파일의 경로 | `basic/pedal.md` |
| **YoutubeLink** | (선택) 영상이 있는 경우 유튜브 주소 입력 | `https://youtu.be/T0fKF32Y158` (없으면 빈칸) |

#### 📝 작성 예시 데이터:
| CategoryID | CategoryTitle | SubCategoryID | SubCategoryTitle | ItemID | ItemTitle | Icon | Summary | MarkdownFile | YoutubeLink |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| basic | 기본 가이드 | basic-assembly | 조립 및 피팅 | pedal | 페달 장착 방법 | Wrench | 좌/우 페달 식별... \| 페달 렌치로... | basic/pedal.md | |
| basic | 기본 가이드 | basic-parts | 부품 교체 | suntour-seatpost | 썬투어 서스펜션 교체 | Wrench | 안장과 싯포스트를... | basic/suntour-seatpost.md | https://youtu.be/T0fKF32Y158 |

### 🛠️ 데이터 연결 및 반영 방법:

스프레드시트에 입력된 데이터는 내부적으로 **`src/data/guides.jsx`** 형태의 중첩된 그룹 구조(Nested JSON)로 변환되어 사용됩니다.

1. **웹 브라우저 자동 연동**: 시스템에 자동 변환(`googleSheetsCMS.jsx`)이 설정되어 있다면 스프레드시트를 수정한 후 별도 작업 없이 **웹페이지를 새로고침**하면 변환 스크립트를 거쳐 홈페이지에 즉시 반영됩니다.
2. **수동 코드 반영 (로컬 개발 시)**: 오프라인이나 로컬 코드 위주로 작업하신다면, 스프레드시트의 내용을 바탕으로 `src/data/guides.jsx` 파일에 직접 위 데이터 구조에 맞게 코드를 추가해 주시면 됩니다. (예: `youtubeLink: "링크주소",` 한 줄 추가)

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

## 🤖 4. 자가진단 마법사 봇 질문 수정 (관리자 코딩 영역)

메인 화면에 뜨는 챗봇 스타일의 '상황별 자가진단 마법사' 문항을 바꾸려면 소스코드를 약간 수정해야 합니다.

1. GitHub에서 `src/components/TroubleshootingWizard.jsx` 파일을 엽니다.
2. 파일 위쪽에 위치한 `const WIZARD_FLOW = { ... }` 객체를 찾습니다.
3. 질문(`question`)과 선택지(`options`)를 수정할 수 있습니다.
   * `label`: 사용자에게 보여질 선택지 이름
   * `next`: 다음으로 넘어갈 질문 덩어리 이름
   * `result`: 이 선택지를 눌렀을 때 최종적으로 이동시킬 **가이드 ID** (스프레드시트에 있는 `ItemID`와 정확히 같아야 함)

수정 후 Commit을 하시면 마찬가지로 홈페이지에 바로 반영됩니다.

### 🧠 동작 원리 및 시각화 (흐름도)

자가진단 마법사는 사용자가 겪고 있는 문제를 단계별로 좁혀나가, 최종적으로 **가장 적합한 가이드 문서(MD)**를 매칭해 주는 "스무고개" 형식의 네비게이션 시스템입니다. 현재 코딩되어 있는 질문 흐름을 시각화하면 다음과 같습니다:

```mermaid
graph TD
    %% 시작 노드
    Start("어떤 종류의 문제를 겪고 계신가요?")

    %% 1단계 선택지
    Start -->|전원이 안 켜지거나 배터리 문제| Power1("충전기를 연결했을 때<br/>어댑터(충전기)의 LED 색상은?")
    Start -->|주행 시 소음이나 소리가 남| Noise1("소음이 발생하는 부위가 어디인가요?")
    Start -->|자전거가 잘 안 나감| ResultTire((타이어 가이드<br/>`error-tire`))

    %% 전원 문제 세부 노드 (Power1)
    Power1 -->|빨간색 (충전 중 표시)| Power2("충전 후에도 모니터가 켜지지 않나요?")
    Power1 -->|초록색 (완충 표시) 이지만 안 켜짐| ResultPower1((전원 가이드<br/>`error-power`))
    Power1 -->|불이 아예 안 들어옴| ResultPower2((전원 가이드<br/>`error-power`))

    %% 전원 문제 세부 노드 2 (Power2)
    Power2 -->|네, 아무 반응이 없습니다.| ResultPower3((전원 가이드<br/>`error-power`))
    Power2 -->|켜지지만 금방 꺼집니다.| ResultPower4((전원 가이드<br/>`error-power`))

    %% 소음 문제 세부 노드 (Noise1)
    Noise1 -->|바퀴 쪽 (브레이크 삐-익 소리)| ResultBrake1((브레이크 가이드<br/>`error-brake`))
    Noise1 -->|기타 부위 (기어, 모터 등)| ResultBrake2((브레이크 가이드<br/>`error-brake`))

    %% 스타일링
    classDef questionNode fill:#f9f9ff,stroke:#3b82f6,stroke-width:2px,color:#1e293b,font-weight:bold
    classDef resultNode fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff,font-weight:bold
    
    class Start,Power1,Power2,Noise1 questionNode
    class ResultTire,ResultPower1,ResultPower2,ResultPower3,ResultPower4,ResultBrake1,ResultBrake2 resultNode
```

### 🛠️ 시나리오 추가/수정 예시

새로운 질문을 추가하고 싶다면, 단순히 `WIZARD_FLOW` 객체 안에 새로운 덩어리를 만들고 `next`로 연결만 해주면 무한히 질문을 확장할 수 있습니다. 마치 레고 블록을 조립하듯 설계하시면 됩니다.

**(예시: 페달 소음 질문 추가하기)**
```javascript
noise_sub_1: {
  question: "소음이 발생하는 부위가 어디인가요?",
  options: [
    { label: "바퀴 쪽", result: "error-brake" },
    { label: "페달을 돌릴 때마다 '딱딱' 소리", next: "pedal_noise_1" } // 새로운 질문 덩어리로 연결
  ]
},
pedal_noise_1: { // 새로 추가된 질문 덩어리
  question: "페달이 헐겁게 느껴지시나요?",
  options: [
    { label: "네, 흔들거립니다.", result: "pedal" }, // 페달 조립 가이드 문서로 이동
    { label: "아니오, 단단합니다.", result: "error-motor" } // 모터 점검 가이드 문서로 이동
  ]
}
```
