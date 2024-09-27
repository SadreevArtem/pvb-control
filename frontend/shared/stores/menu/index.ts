import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MenuState {
  currentMenu: string;
  setCurrentMenu: (menu: string) => void;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      currentMenu: 'users', // значение по умолчанию
      setCurrentMenu: (menu) => set({ currentMenu: menu }),
    }),
    {
      name: 'menu-storage', // ключ в localStorage
    }
  )
);
