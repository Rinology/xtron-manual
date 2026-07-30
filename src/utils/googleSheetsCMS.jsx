import Papa from 'papaparse';
import React from 'react';
// Lucide 아이콘을 동적으로 렌더링하기 위한 매핑용
import * as Icons from 'lucide-react';

const CACHE_PREFIX = 'xtron_sheet_cache_';
// 현재 테스트를 위해 캐시 만료 시간을 0으로 설정 (실시간 반영)
// 향후 실 서비스 배포 시 1000 * 60 * 5 (5분)으로 변경 예정
const CACHE_EXPIRATION_MS = 0;

async function fetchWithCache(url) {
  const cacheKey = CACHE_PREFIX + url;
  
  // 1. 캐시 확인
  try {
    const cachedItem = sessionStorage.getItem(cacheKey);
    if (cachedItem) {
      const { timestamp, data } = JSON.parse(cachedItem);
      // 유효 시간(10분) 이내인지 확인
      if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
        console.log("Using cached CSV data for:", url);
        return data; // CSV 텍스트 반환
      }
    }
  } catch (e) {
    console.warn("Session storage read failed", e);
  }

  // 2. 캐시가 없거나 만료된 경우 네트워크 요청
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  const csvText = await response.text();

  // 3. 캐시에 저장
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data: csvText
    }));
  } catch (e) {
    console.warn("Session storage write failed", e);
  }

  return csvText;
}

/**
 * 구글 스프레드시트 CSV 데이터를 파싱하여 guidesData 형식의 JSON으로 변환합니다.
 * 
 * 스프레드시트 구조 (열 이름):
 * CategoryID | CategoryTitle | SubCategoryID | SubCategoryTitle | ChildCategoryID | ChildCategoryTitle | ItemID | ItemTitle | IconName | Summary | MarkdownFile | YoutubeLink
 * 
 * @param {string} csvUrl 구글 스프레드시트 CSV 웹 게시 URL
 * @returns {Promise<Object>} 변환된 guidesData 구조
 */
export async function fetchGuidesFromGoogleSheet(csvUrl) {
  try {
    const csvText = await fetchWithCache(csvUrl);

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: header => header.trim(),
        complete: (results) => {
          const data = results.data;
          const parsedCategories = [];

          const isLive = window.location.hostname.includes('xtron-guide.kr');

          data.forEach(row => {
            const { 
              CategoryID, CategoryTitle, 
              SubCategoryID, SubCategoryTitle, 
              ChildCategoryID, ChildCategoryTitle,
              ItemID, ItemTitle, IconName, Summary, MarkdownFile, YoutubeLink, Status
            } = row;

            // Status 값이 비어있을 경우 기본값을 'deploy'로 간주
            const safeStatus = (Status || 'deploy').trim().toLowerCase();

            // 0. 상태(Status) 필터링 (라이브/테스트 서버 분리)
            if (isLive) {
              if (safeStatus !== 'deploy') return; // 라이브 서버: Deploy만 노출
            } else {
              // 테스트 서버(브랜치): Deploy 및 BranchDeploy 노출
              if (safeStatus !== 'branchdeploy' && safeStatus !== 'deploy') return;
            }

            // 1. 카테고리 찾기 또는 생성
            let category = parsedCategories.find(c => c.id === CategoryID);
            if (!category) {
              category = { id: CategoryID, title: CategoryTitle, subCategories: [] };
              parsedCategories.push(category);
            }

            // 2. 서브카테고리 찾기 또는 생성
            let subCategory = category.subCategories.find(sc => sc.id === SubCategoryID);
            if (!subCategory) {
              subCategory = { id: SubCategoryID, title: SubCategoryTitle, items: [], childCategories: [] };
              category.subCategories.push(subCategory);
            }

            // 3. 아이콘 동적 렌더링 처리
            const IconComponent = Icons[IconName] || Icons.HelpCircle;

            const newItem = {
              id: ItemID,
              title: ItemTitle,
              icon: <IconComponent size={18} />,
              summary: Summary ? Summary.split('|').map(s => s.trim()) : [], // | 문자로 줄바꿈 분리
              markdownFile: MarkdownFile,
              youtubeLink: YoutubeLink
            };

            // 4. 소분류(ChildCategory) 존재 여부에 따른 아이템 추가
            if (ChildCategoryID && ChildCategoryID.trim() !== "") {
              let childCategory = subCategory.childCategories.find(cc => cc.id === ChildCategoryID);
              if (!childCategory) {
                childCategory = { id: ChildCategoryID, title: ChildCategoryTitle, items: [] };
                subCategory.childCategories.push(childCategory);
              }
              childCategory.items.push(newItem);
            } else {
              subCategory.items.push(newItem);
            }
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
 * 자가진단 마법사(Wizard) 구글 스프레드시트 CSV 데이터를 파싱하여 WIZARD_FLOW 형식의 JSON으로 변환합니다.
 * 
 * @param {string} csvUrl 구글 스프레드시트 CSV 웹 게시 URL (WizardFlow 탭)
 * @returns {Promise<Object>} 변환된 wizardFlow 구조
 */
export async function fetchWizardFromGoogleSheet(csvUrl) {
  try {
    if (!csvUrl) return null;
    
    const csvText = await fetchWithCache(csvUrl);

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: header => header.trim(),
        complete: (results) => {
          const data = results.data;
          const wizardFlow = {};

          const isLive = window.location.hostname.includes('xtron-guide.kr');

          data.forEach(row => {
            const { 
              RowID, NodeID, Question, OptionLabel, NextNodeID, ResultItemID, Keywords, Status 
            } = row;

            // Status 값이 비어있을 경우 기본값을 'deploy'로 간주
            const safeStatus = (Status || 'deploy').trim().toLowerCase();

            // 상태(Status) 필터링 (라이브/테스트 서버 분리)
            if (isLive) {
              if (safeStatus !== 'deploy') return; // 라이브 서버: Deploy만 노출
            } else {
              // 테스트 서버(브랜치): Deploy 및 BranchDeploy 노출
              if (safeStatus !== 'branchdeploy' && safeStatus !== 'deploy') return;
            }

            if (!NodeID) return; // NodeID가 없으면 무시

            // Node 초기화
            if (!wizardFlow[NodeID]) {
              wizardFlow[NodeID] = {
                question: Question || '',
                options: []
              };
            }

            // Option 추가
            const option = { 
              label: OptionLabel || '',
              keywords: Keywords || '' 
            };
            if (NextNodeID) option.next = NextNodeID;
            if (ResultItemID) option.result = ResultItemID;

            wizardFlow[NodeID].options.push(option);
          });

          resolve(wizardFlow);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  } catch (error) {
    console.error("Failed to fetch Wizard Google Sheets CSV:", error);
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
