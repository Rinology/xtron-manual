import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { guidesData as fallbackData, allGuideItems as fallbackItems } from '../data/guides';
import { fetchGuidesFromGoogleSheet, fetchWizardFromGoogleSheet, fetchFaqFromGoogleSheet } from '../utils/googleSheetsCMS';

const GuideContext = createContext();

function flattenCategoriesToItems(categories) {
  return categories.reduce((acc, cat) => {
    let catItems = cat.items ? [...cat.items] : [];

    if (cat.subCategories) {
      const subItems = cat.subCategories.reduce((subAcc, subCat) => {
        let items = subCat.items ? [...subCat.items] : [];
        if (subCat.childCategories) {
          subCat.childCategories.forEach(childCat => {
            if (childCat.items) {
              items = [...items, ...childCat.items];
            }
          });
        }
        return [...subAcc, ...items];
      }, []);
      catItems = [...catItems, ...subItems];
    }
    return [...acc, ...catItems];
  }, []);
}

export function GuideProvider({ children }) {
  const [guidesData, setGuidesData] = useState(fallbackData);
  const [allGuideItems, setAllGuideItems] = useState(fallbackItems);
  const [wizardFlow, setWizardFlow] = useState(null);
  const [faqItems, setFaqItems] = useState([]);
  const [isWizardLoading, setIsWizardLoading] = useState(true);
  const [isGuidesLoading, setIsGuidesLoading] = useState(true);
  const [isFaqLoading, setIsFaqLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCMS() {
      const baseUrl = import.meta.env.VITE_SHEETS_URL;
      const wizardBaseUrl = import.meta.env.VITE_WIZARD_SHEETS_URL;
      const faqBaseUrl = import.meta.env.VITE_FAQ_SHEETS_URL;

      // 1번(매뉴얼), 2번(마법사), 3번(FAQ) 탭을 동시에 병렬 로드한 뒤 단일 배치(Batch)로 상태를 일괄 반영하여 다단계 리렌더링 깜빡임 방지
      const [remoteGuidesResult, remoteWizardResult, remoteFaqResult] = await Promise.all([
        baseUrl ? fetchGuidesFromGoogleSheet(baseUrl).catch(() => null) : Promise.resolve(null),
        wizardBaseUrl ? fetchWizardFromGoogleSheet(wizardBaseUrl).catch(() => null) : Promise.resolve(null),
        faqBaseUrl ? fetchFaqFromGoogleSheet(faqBaseUrl).catch(() => null) : Promise.resolve(null),
      ]);

      if (!isMounted) return;

      if (remoteGuidesResult && remoteGuidesResult.categories && remoteGuidesResult.categories.length > 0) {
        setGuidesData(remoteGuidesResult);
        setAllGuideItems(flattenCategoriesToItems(remoteGuidesResult.categories));
      }
      if (remoteWizardResult && Object.keys(remoteWizardResult).length > 0) {
        setWizardFlow(remoteWizardResult);
      }
      if (remoteFaqResult && Array.isArray(remoteFaqResult)) {
        setFaqItems(remoteFaqResult);
      }

      setIsGuidesLoading(false);
      setIsWizardLoading(false);
      setIsFaqLoading(false);
    }
    loadCMS();
    return () => {
      isMounted = false;
    };
  }, []);

  const contextValue = useMemo(() => ({
    guidesData,
    allGuideItems,
    wizardFlow,
    faqItems,
    isWizardLoading,
    isGuidesLoading,
    isFaqLoading
  }), [guidesData, allGuideItems, wizardFlow, faqItems, isWizardLoading, isGuidesLoading, isFaqLoading]);

  return (
    <GuideContext.Provider value={contextValue}>
      {children}
    </GuideContext.Provider>
  );
}

export function useGuides() {
  return useContext(GuideContext);
}
