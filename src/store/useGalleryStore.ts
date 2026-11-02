import { create } from "zustand";

interface ImageItem {
  id: string;
  file: File;
  previewURL: string;
}

interface GalleryState {
  imagesUpload: ImageItem[];
  setImagesUpload: (images: ImageItem[]) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
    imagesUpload: [],
    setImagesUpload: (images) => set({ imagesUpload: images }),
}))