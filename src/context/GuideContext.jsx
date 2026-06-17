import React, { createContext, useContext, useState, useEffect } from 'react';
import { guidesData as fallbackData, allGuideItems as fallbackItems } from '../data/guides';
import { fetchGuidesFromGoogleSheet } from '../utils/googleSheetsCMS';

const GuideContext = createContext();

export function GuideProvider({ children }) {
  const [guidesData, setGuidesData] = useState(fallbackData);
  const [allGuideItems, setAllGuideItems] = useState(fallbackItems);

  useEffect(() => {
    async function loadCMS() {
      // User provided spreadsheet URL for CSV output (loaded from environment variable)
      const baseUrl = import.meta.env.VITE_SHEETS_URL;
      const SHEET_URL = `${baseUrl}&t=${new Date().getTime()}`;
      
      const remoteData = await fetchGuidesFromGoogleSheet(SHEET_URL);
      if (remoteData && remoteData.categories && remoteData.categories.length > 0) {
        setGuidesData(remoteData);
        
        // Flatten the items for easy searching and routing
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
    loadCMS();
  }, []);

  return (
    <GuideContext.Provider value={{ guidesData, allGuideItems }}>
      {children}
    </GuideContext.Provider>
  );
}

export function useGuides() {
  return useContext(GuideContext);
}
