import { create } from 'zustand'

interface ImageItem {
    isSelected: boolean;
  }

type Store = {
  images: Map<string, ImageItem>;
  getImages: () => ImageItem[];
}

const useStore = create<Store>((set, get) => ({
  images: new Map(),
  getImages: () => {
    return Array.from( get().images.values());
  },
}))

export default useStore;