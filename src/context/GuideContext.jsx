import React, { createContext, useContext, useState, useEffect } from 'react';
import { guidesData as fallbackData, allGuideItems as fallbackItems } from '../data/guides';
import { fetchGuidesFromGoogleSheet, fetchWizardFromGoogleSheet } from '../utils/googleSheetsCMS';

const GuideContext = createContext();

export function GuideProvider({ children }) {
  const [guidesData, setGuidesData] = useState(fallbackData);
  const [allGuideItems, setAllGuideItems] = useState(fallbackItems);
  const [wizardFlow, setWizardFlow] = useState(null); // 초기에는 null (로딩 상태 구분을 위해)

  useEffect(() => {
    async function loadCMS() {
      // 1. 가이드 메뉴 데이터 로딩
      const baseUrl = import.meta.env.VITE_SHEETS_URL;
      if (baseUrl) {
        const SHEET_URL = `${baseUrl}&t=${new Date().getTime()}`;
        const remoteData = await fetchGuidesFromGoogleSheet(SHEET_URL);
        if (remoteData && remoteData.categories && remoteData.categories.length > 0) {
          setGuidesData(remoteData);
          
          const flatItems = remoteData.categories.reduce((acc, cat) => {
            if (cat.subCategories) {
              const subItems = cat.subCategories.reduce((subAcc, subCat) => [...subAcc, ...(subCat.items || [])], []);
              return [...acc, ...subItems];
            }
            return acc;
          }, []);
          setAllGuideItems(flatItems);
        }
      }

      // 2. 자가진단 마법사 데이터 로딩
      const wizardBaseUrl = import.meta.env.VITE_WIZARD_SHEETS_URL;
      if (wizardBaseUrl) {
        const WIZARD_SHEET_URL = `${wizardBaseUrl}&t=${new Date().getTime()}`;
        const remoteWizardData = await fetchWizardFromGoogleSheet(WIZARD_SHEET_URL);
        if (remoteWizardData && Object.keys(remoteWizardData).length > 0) {
          setWizardFlow(remoteWizardData);
        }
      }
    }
    loadCMS();
  }, []);

  return (
    <GuideContext.Provider value={{ guidesData, allGuideItems, wizardFlow }}>
      {children}
    </GuideContext.Provider>
  );
}

export function useGuides() {
  return useContext(GuideContext);
}
