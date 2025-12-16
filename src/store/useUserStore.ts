import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  uuid: string | null;
  userId: string | null;
  userName: string | null;
  _hasHydrated: boolean;
  setUser: (data: { uuid: string; userId: string; userName: string }) => void;
  clearUser: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      uuid: null,
      userId: null,
      userName: null,
      _hasHydrated: false,
      setUser: (data) => set(data),
      clearUser: () => {
        set({ uuid: null, userId: null, userName: null });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'user',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);
