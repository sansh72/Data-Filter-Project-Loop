import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { parseCSV } from '@/utils/csvParser';

export interface DataRow {
  id: number;
  number: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
}

export interface FilterState {
  mod3: number[];
  mod4: number[];
  mod5: number[];
  mod6: number[];

}

interface DashboardContextType {
  data: DataRow[];
  filteredData: DataRow[];
  filterState: FilterState;
  availableOptions: Record<keyof FilterState, number[]>;
  updateFilter: (column: keyof FilterState, values: number[]) => void;
  clearAllFilters: () => void;
  loadCSVData: (csvText: string) => void;
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Generate sample data
const generateSampleData = (count: number): DataRow[] => {
  const data: DataRow[] = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      number: i,
      mod3: i % 3,
      mod4: i % 4,
      mod5: i % 5,
      mod6: i % 6,
    });
  }
  return data;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataRow[]>(() => generateSampleData(1000));
  const [isLoading, setIsLoading] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    mod3: [],
    mod4: [],
    mod5: [],
    mod6: [],
  });

  const loadCSVData = (csvText: string) => {
    setIsLoading(true);
    try {
      const parsedData = parseCSV(csvText);
      setData(parsedData);
      // Clear all filters when new data is loaded
      setFilterState({
        mod3: [],
        mod4: [],
        mod5: [],
        mod6: [],
      });
      console.log(`Loaded ${parsedData.length} rows from CSV`);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file. Please check the format.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate filtered data based on current filters
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const filterKeys = Object.keys(filterState) as (keyof FilterState)[];
      return filterKeys.every((key) => {
        const selectedValues = filterState[key];
        return selectedValues.length === 0 || selectedValues.includes(row[key]);
      });
    });
  }, [data, filterState]);

  // Calculate available options for each filter based on other active filters
  const availableOptions = useMemo(() => {
    const options: Record<keyof FilterState, number[]> = {
      mod3: [],
      mod4: [],
      mod5: [],
      mod6: [],
    };

    const filterKeys = Object.keys(filterState) as (keyof FilterState)[];

    filterKeys.forEach((currentKey) => {
      // For each filter, consider all OTHER filters to determine available options
      const otherFilters = filterKeys.filter((key) => key !== currentKey);
      
      // Apply other filters to get the subset of data
      const dataSubset = data.filter((row) => {
        return otherFilters.every((key) => {
          const selectedValues = filterState[key];
          return selectedValues.length === 0 || selectedValues.includes(row[key]);
        });
      });

      // Extract unique values for the current filter from the subset
      const uniqueValues = [...new Set(dataSubset.map((row) => row[currentKey]))];
      options[currentKey] = uniqueValues.sort((a, b) => a - b);
    });

    return options;
  }, [data, filterState]);

  const updateFilter = (column: keyof FilterState, values: number[]) => {
    setFilterState((prev) => ({
      ...prev,
      [column]: values,
    }));
  };

  const clearAllFilters = () => {
    setFilterState({
      mod3: [],
      mod4: [],
      mod5: [],
      mod6: [],
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        data,
        filteredData,
        filterState,
        availableOptions,
        updateFilter,
        clearAllFilters,
        loadCSVData,
        isLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
