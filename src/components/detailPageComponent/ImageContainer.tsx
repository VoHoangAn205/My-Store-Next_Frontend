"use client"
import { Gallery } from "@/types"
import Image from "next/image"
import { useState } from "react"

interface Props {
    data: Gallery
    productName: string
}

const ImageContainer = ({data, productName}: Props) => {
    const listImages = data.images;
    const [selectedImage, setSelectedImage] = useState(listImages[0].url)

    return (
        <>
            <div className="flex flex-col gap-4">
            {/* Main Featured Image Container */}
            <div className="relative w-full h-80 sm:h-96 bg-brand-light rounded-xl overflow-hidden border border-brand-sand">
              {selectedImage ? (
                <Image
                  fill
                  src={selectedImage}
                  alt={productName}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-slate">
                  No Image Available
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {listImages && listImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {listImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img.url)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img.url
                        ? "border-brand-rust ring-2 ring-brand-rust/20"
                        : "border-brand-sand opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      fill
                      src={img.url}
                      alt={`${productName} thumbnail ${idx + 1}`}
                      sizes="80px"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
    )
}

export default ImageContainer;