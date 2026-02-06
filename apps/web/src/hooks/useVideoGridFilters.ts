'use client';

import { useState, useCallback } from 'react';

export type CounselorType = 'ALL' | 'TAROT' | 'MECHANICS' | 'SHAMANISM';

export interface VideoGridFiltersState {
  activeTray: string | null;
  searchQuery: string;
  selectedCategory: string;
  selectedCounselor: string;
  selectedCreator: string;
  selectedSort: string;
  selectedTime: string;
  counselorType: CounselorType;
  startDate: string;
  endDate: string;
  traySearch: string;
}

export interface VideoGridFiltersHandlers {
  setSearchQuery: (query: string) => void;
  setSelectedSort: (sort: string) => void;
  setCounselorType: (type: CounselorType) => void;
  setTraySearch: (search: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  toggleTray: (trayName: string) => void;
  closeTray: () => void;
  handleCategorySelect: (label: string) => void;
  handleCounselorSelect: (label: string) => void;
  handleCreatorSelect: (label: string) => void;
  handleTimeSelect: (label: string, value: string) => void;
  handleSortSelect: (label: string) => void;
  filterItems: (
    items: { label: string; count?: number }[]
  ) => { label: string; count?: number }[];
}

export type UseVideoGridFiltersReturn = VideoGridFiltersState &
  VideoGridFiltersHandlers;

export function useVideoGridFilters(): UseVideoGridFiltersReturn {
  const [activeTray, setActiveTray] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Active Filters State
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedCounselor, setSelectedCounselor] = useState('전체보기');
  const [selectedCreator, setSelectedCreator] = useState('전체보기');
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [selectedTime, setSelectedTime] = useState('전체');

  const [counselorType, setCounselorType] = useState<CounselorType>('ALL');

  // Custom Date Range State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [traySearch, setTraySearch] = useState('');

  const toggleTray = useCallback(
    (trayName: string) => {
      if (activeTray === trayName) {
        setActiveTray(null);
      } else {
        setActiveTray(trayName);
        setTraySearch(''); // Reset search when opening new tray
      }
    },
    [activeTray]
  );

  // Helper to filter items in tray based on search
  const filterItems = useCallback(
    (items: { label: string; count?: number }[]) => {
      if (!traySearch) return items;
      return items.filter((item) =>
        item.label.toLowerCase().includes(traySearch.toLowerCase())
      );
    },
    [traySearch]
  );

  // Close tray
  const closeTray = useCallback(() => setActiveTray(null), []);

  // Selection handlers
  const handleCategorySelect = useCallback((label: string) => {
    setSelectedCategory(label);
    setActiveTray(null);
  }, []);

  const handleCounselorSelect = useCallback((label: string) => {
    setSelectedCounselor(label);
    setActiveTray(null);
  }, []);

  const handleCreatorSelect = useCallback((label: string) => {
    setSelectedCreator(label);
    setActiveTray(null);
  }, []);

  const handleTimeSelect = useCallback((label: string, value: string) => {
    setSelectedTime(label);
    if (value !== 'custom') {
      setActiveTray(null);
    }
  }, []);

  const handleSortSelect = useCallback((label: string) => {
    setSelectedSort(label);
    setActiveTray(null);
  }, []);

  return {
    // State
    activeTray,
    searchQuery,
    selectedCategory,
    selectedCounselor,
    selectedCreator,
    selectedSort,
    selectedTime,
    counselorType,
    startDate,
    endDate,
    traySearch,
    // Handlers
    setSearchQuery,
    setSelectedSort,
    setCounselorType,
    setTraySearch,
    setStartDate,
    setEndDate,
    toggleTray,
    closeTray,
    handleCategorySelect,
    handleCounselorSelect,
    handleCreatorSelect,
    handleTimeSelect,
    handleSortSelect,
    filterItems,
  };
}
