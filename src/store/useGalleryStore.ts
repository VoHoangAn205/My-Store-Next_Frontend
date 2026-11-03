import { FormImgsFile } from "@/types";
import { create } from "zustand";

interface GalleryState {
  imagesUpload: FormImgsFile[];
  setImagesUpload: (images: FormImgsFile[]) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
    imagesUpload: [],
    setImagesUpload: (images) => set({ imagesUpload: images }),
}))