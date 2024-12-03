import { create } from 'zustand';
import { User } from 'firebase/auth';
import { onAuthChange } from '../services/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize auth listener
  onAuthChange((user) => {
    set({ user, loading: false });
  });

  return {
    user: null,
    loading: true,
    setUser: (user) => set({ user }),
  };
});