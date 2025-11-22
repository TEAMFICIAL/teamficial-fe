import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  uuid: string | null;
  userId: string | null;
  userName: string | null;
  setUser: (data: { uuid: string; userId: string; userName: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      uuid: null,
      userId: null,
      userName: null,
      setUser: (data) => set(data),
      clearUser: () => set({ uuid: null, userId: null, userName: null }),
    }),
    {
      name: 'user',
    },
  ),
);
