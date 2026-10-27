// src/store/useUIStore.ts
import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  otpModalState: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  OpenOtpModal: () => void;
  closeOtpModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  otpModalState: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  OpenOtpModal: () => set({ otpModalState: true}),
  closeOtpModal: () => set({ otpModalState: false }),
}));