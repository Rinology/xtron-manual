import Papa from 'papaparse';
import React from 'react';
// Lucide 아이콘을 동적으로 렌더링하기 위한 매핑용
import * as Icons from 'lucide-react';

/**
 * 구글 스프레드시트 CSV 데이터를 파싱하여 guidesData 형식의 JSON으로 변환합니다.
 * 
 * 스프레드시트 구조 (열 이름):
 * CategoryID | CategoryTitle | SubCategoryID | SubCategoryTitle | ItemID | ItemTitle | IconName | Summary | MarkdownFile
 * 
 * @param {string} csvUrl 구글 스프레드시트 CSV 웹 게시 URL
 * @returns {Promise<Object>} 변환된 guidesData 구조
 */
export async function fetchGuidesFromGoogleSheet(csvUrl) {
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;
          const parsedCategories = [];

          data.forEach(row => {
            const { 
              CategoryID, CategoryTitle, 
              SubCategoryID, SubCategoryTitle, 
              ItemID, ItemTitle, IconName, Summary, MarkdownFile, YoutubeLink
            } = row;

            // 1. 카테고리 찾기 또는 생성
            let category = parsedCategories.find(c => c.id === CategoryID);
            if (!category) {
              category = { id: CategoryID, title: CategoryTitle, subCategories: [] };
              parsedCategories.push(category);
            }

            // 2. 서브카테고리 찾기 또는 생성
            let subCategory = category.subCategories.find(sc => sc.id === SubCategoryID);
            if (!subCategory) {
              subCategory = { id: SubCategoryID, title: SubCategoryTitle, items: [] };
              category.subCategories.push(subCategory);
            }

            // 3. 아이콘 동적 렌더링 처리
            const IconComponent = Icons[IconName] || Icons.HelpCircle;

            // 4. 아이템 추가
            subCategory.items.push({
              id: ItemID,
              title: ItemTitle,
              icon: <IconComponent size={18} />,
              summary: Summary ? Summary.split('|').map(s => s.trim()) : [], // | 문자로 줄바꿈 분리
              markdownFile: MarkdownFile,
              youtubeLink: YoutubeLink
            });
          });

          resolve({ categories: parsedCategories });
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  } catch (error) {
    console.error("Failed to fetch Google Sheets CSV:", error);
    return null;
  }
}

/**
 * 연동 테스트 사용 예시 (이 함수를 App.jsx 나 최상위 컴포넌트의 useEffect 에서 호출하세요)
 */
export async function testSheetIntegration() {
  // 사용방법:
  // 1. 구글 스프레드시트 작성 후 [파일] -> [공유] -> [웹에 게시] -> [CSV] 형식으로 링크 복사
  // 2. 아래 링크에 붙여넣기
  const SAMPLE_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTXXX_YOUR_CSV_URL_XXX/pub?output=csv";
  
  /* 주석 해제 후 테스트
  const newData = await fetchGuidesFromGoogleSheet(SAMPLE_CSV_URL);
  if (newData) {
    console.log("Google Sheets Data successfully loaded!", newData);
    // 이 newData를 상태(State)에 저장하여 기존 guidesData 대신 사용하면 됩니다.
  }
  */
}
