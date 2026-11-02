"use client";

import { useGalleryStore } from "@/store/useGalleryStore";
import { useEffect, useRef, useState } from "react";

interface ImageItem {
  id: string;
  file: File;
  previewURL: string;
}

const MediaUploadArea = () => {
  const { setImagesUpload } = useGalleryStore();

  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleContainerClick = () => {
    setErrorMessage("");
    fileInputRef.current?.click();
  };

  const handleImageSelection = (files: FileList | File[]) => {
    setErrorMessage("");

    if (selectedImages.length >= 5) {
      setErrorMessage("You can only upload a maximum of 5 images.");
      return;
    }

    const validFiles = Array.from(files).filter((file) => {
      const validType = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ].includes(file.type);
      const validSize = file.size <= 5 * 1024 * 1024;
      return validType && validSize;
    });

    // Calculate how many remaining slots we have (Max: 5)
    const remainingSlots = 5 - selectedImages.length;

    if (validFiles.length > remainingSlots) {
      setErrorMessage(
        `Only the first ${remainingSlots} valid image(s) were added. (Max 5 images total)`
      );
    }

    const filesToUpload = validFiles.slice(0, remainingSlots);

    const newPreviews: ImageItem[] = filesToUpload.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: file,
      previewURL: URL.createObjectURL(file),
    }));

    setSelectedImages((prevImages) => [...prevImages, ...newPreviews]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleImageSelection(e.target.files);
    }
  };

  const handleRemoveImage = (removeId: string) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((img) => img.id !== removeId)
    );
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleImageSelection(e.dataTransfer.files);
    }
  };

  useEffect(() => {
    setImagesUpload(selectedImages);
  }, [selectedImages, setImagesUpload]);

  return (
    <div className="bg-white border border-brand-sand rounded-2xl p-6 mt-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b border-brand-sand/40 pb-2">
        <h2 className="text-base font-bold text-brand-dark">
          Product Media Gallery
        </h2>
        <span
          className={`text-xs font-mono font-bold ${
            selectedImages.length === 5
              ? "text-amber-600"
              : "text-brand-slate"
          }`}
        >
          {selectedImages.length} / 5 images
        </span>
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-100 text-rose-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <i className="fa-solid fa-circle-exclamation text-sm"></i>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Drag & Drop Field Container Box Wrapper */}
      <div
        onClick={handleContainerClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-brand-sand/80 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-rust hover:bg-brand-light/40 transition-all duration-150 select-none"
      >
        <i className="fa-solid fa-cloud-arrow-up text-brand-slate text-3xl mb-3 animate-pulse"></i>
        <span className="text-sm font-semibold text-brand-dark">
          Drag and drop images here, or{" "}
          <span className="text-brand-rust underline">browse files</span>
        </span>
        <span className="text-xs text-brand-slate mt-1">
          Supports PNG, JPG, or WebP format assets up to 5MB.
        </span>

        {/* Real HTML Hidden Input Trigger */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
        />
      </div>

      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
          {selectedImages.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-xl border border-brand-sand/60 overflow-hidden bg-brand-light/20 group shadow-sm"
            >
              {/* Actual Preview Canvas Render Element */}
              <img
                src={img.previewURL}
                alt="Product snapshot thumbnail preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />

              {/* Floating Deletion Trigger Overlay button on hover */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(img.id);
                }}
                className="absolute top-2 right-2 bg-rose-600/90 text-white rounded-lg p-1.5 shadow-md hover:bg-rose-700 transition-colors focus:outline-none md:opacity-0 md:group-hover:opacity-100 duration-150"
              >
                <i className="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUploadArea;