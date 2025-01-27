import { create } from 'zustand';

type UIState = {
  isInventoryOpen: boolean;
  isChatOpen: boolean;
  isMinimapOpen: boolean;
  isNavigationOpen: boolean;
  toggleInventory: () => void;
  toggleChat: () => void;
  toggleMinimap: () => void;
  toggleNavigation: () => void;
};

export const useUIState = create<UIState>((set) => ({
  isInventoryOpen: false,
  isChatOpen: false,
  isMinimapOpen: false,
  isNavigationOpen: true,
  toggleInventory: () => set((state) => ({ isInventoryOpen: !state.isInventoryOpen })),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  toggleMinimap: () => set((state) => ({ isMinimapOpen: !state.isMinimapOpen })),
  toggleNavigation: () => set((state) => ({ isNavigationOpen: !state.isNavigationOpen })),
}));