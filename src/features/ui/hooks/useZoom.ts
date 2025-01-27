import { create } from 'zustand';

interface ZoomState {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  increaseZoom: () => void;
  decreaseZoom: () => void;
  resetZoom: () => void;
}

export const useZoom = create<ZoomState>((set) => ({
  zoom: 1,
  minZoom: 0.5,
  maxZoom: 2,
  increaseZoom: () => set((state) => ({
    zoom: Math.min(state.maxZoom, state.zoom + 0.1)
  })),
  decreaseZoom: () => set((state) => ({
    zoom: Math.max(state.minZoom, state.zoom - 0.1)
  })),
  resetZoom: () => set({ zoom: 1 })
}));