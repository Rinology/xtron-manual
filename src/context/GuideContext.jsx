import React, { createContext, useContext, useState, useEffect } from 'react';
import { guidesData as fallbackData, allGuideItems as fallbackItems } from '../data/guides';
import { fetchGuidesFromGoogleSheet, fetchWizardFromGoogleSheet, fetchFaqFromGoogleSheet } from '../utils/googleSheetsCMS';

const GuideContext = createContext();

export function GuideProvider({ children }) {
  const [guidesData, setGuidesData] = useState(fallbackData);
  const [allGuideItems, setAllGuideItems] = useState(fallbackItems);
  const [wizardFlow, setWizardFlow] = useState(null);
  const [faqItems, setFaqItems] = useState([]);
  const [isWizardLoading, setIsWizardLoading] = useState(true);
  const [isGuidesLoading, setIsGuidesLoading] = useState(true);
  const [isFaqLoading, setIsFaqLoading] = useState(true);

  useEffect(() => {
    async function loadCMS() {
      const baseUrl = import.meta.env.VITE_SHEETS_URL;
      const wizardBaseUrl = import.meta.env.VITE_WIZARD_SHEETS_URL;
      const faqBaseUrl = import.meta.env.VITE_FAQ_SHEETS_URL;

      // 1번(매뉴얼), 2번(마법사), 3번(FAQ) 탭을 동시에 병렬 로드하여 초기 진입 속도 최적화
      const guidesPromise = (async () => {
        try {
          if (baseUrl) {
            const remoteData = await fetchGuidesFromGoogleSheet(baseUrl);
            if (remoteData && remoteData.categories && remoteData.categories.length > 0) {
              setGuidesData(remoteData);

              const flatItems = remoteData.categories.reduce((acc, cat) => {
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
              setAllGuideItems(flatItems);
            }
          }
        } finally {
          setIsGuidesLoading(false);
        }
      })();

      const wizardPromise = (async () => {
        try {
          if (wizardBaseUrl) {
            const remoteWizardData = await fetchWizardFromGoogleSheet(wizardBaseUrl);
            if (remoteWizardData && Object.keys(remoteWizardData).length > 0) {
              setWizardFlow(remoteWizardData);
            }
          }
        } finally {
          setIsWizardLoading(false);
        }
      })();

      const faqPromise = (async () => {
        try {
          if (faqBaseUrl) {
            const remoteFaqData = await fetchFaqFromGoogleSheet(faqBaseUrl);
            if (remoteFaqData && Array.isArray(remoteFaqData)) {
              setFaqItems(remoteFaqData);
            }
          }
        } finally {
          setIsFaqLoading(false);
        }
      })();

      await Promise.all([guidesPromise, wizardPromise, faqPromise]);
    }
    loadCMS();
  }, []);

  return (
    <GuideContext.Provider value={{ guidesData, allGuideItems, wizardFlow, faqItems, isWizardLoading, isGuidesLoading, isFaqLoading }}>
      {children}
    </GuideContext.Provider>
  );
}

export function useGuides() {
  return useContext(GuideContext);
}
