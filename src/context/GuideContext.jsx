import React, { createContext, useContext, useState, useEffect } from 'react';
import { guidesData as fallbackData, allGuideItems as fallbackItems } from '../data/guides';
import { fetchGuidesFromGoogleSheet } from '../utils/googleSheetsCMS';

const GuideContext = createContext();

export function GuideProvider({ children }) {
  const [guidesData, setGuidesData] = useState(fallbackData);
  const [allGuideItems, setAllGuideItems] = useState(fallbackItems);

  useEffect(() => {
    async function loadCMS() {
      // User provided spreadsheet URL for CSV output
      const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQLeyv9lic0ituxpPWhCvEfqnkEpttZn9GbGMIBtZGjErqYvKkzirEN2hVW-Q7Wy8rXQVzpcQcHTqwG/pub?output=csv";
      
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
