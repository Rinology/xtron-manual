# 프로젝트 공통 규칙 (Agent Rules)

- **문서화 의무 (Documentation Requirement)**: 기능 구현이나 패치(버그 픽스 등) 작업을 완료한 다음에는 **반드시 가장 먼저** `PATCH_NOTES.md`에 패치된 사항을 기록하고, 연관된 `README.md` 항목이 있다면 최신 상태로 업데이트해야 합니다.
- **README 히스토리 의무 (README History Requirement)**: `README.md` 파일이 수정될 때마다 반드시 `readme_history.md` 파일에도 변경 사항의 요약을 함께 작성하여 히스토리를 남겨야 합니다.
- **메인 가이드 MD 작성 규칙 (`src/data/markdown/*.md`)**:
  - **순서 및 비중**: 반드시 **`짧은 1줄 행위 지시(글)` → `2D 일러스트(그림)`** 순서를 유지하며, 글은 최소화하고 그림(또는 `placehold.co` 자리 표시)을 최대한으로 배치합니다.
  - **1동작 = 1이미지**: 한 단계에 동작이 2개 이상이면 이미지 자리도 2장 이상으로 분리합니다.
  - **기존 임시 경로 존중 & HTML 제거**: 이미 입력된 임시 이미지 경로는 임의로 삭제·수정하지 않으며, `<div align="center">`, `<img style=...>`, 알림 박스 내 중복 이모지(`⚠️`, `🚨`, `💡`) 등 불필요한 HTML/꾸밈을 사용하지 않습니다.
  - **세부 규칙 참조**: 매뉴얼 MD 파일을 작성·다듬을 때는 반드시 [GUIDE_STYLE_RULES.md](./GUIDE_STYLE_RULES.md)를 따릅니다.
