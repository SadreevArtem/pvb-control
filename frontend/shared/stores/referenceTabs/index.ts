import { References } from '@/components/RefernceBooks/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TabsState {
    currentTab: References;
    setTab: (menu: References) => void;
  }
// Создаем хранилище для вкладок с сохранением в localStorage
export const useReferenceTabsStore = create<TabsState>()(
    persist(
      (set) => ({
        currentTab: 'customers' as References, // вкладка по умолчанию
        setTab: (tab: References) => set({ currentTab: tab }),
      }),
      {
        name: 'tab-storage', // имя ключа в localStorage
      }
    )
  );
