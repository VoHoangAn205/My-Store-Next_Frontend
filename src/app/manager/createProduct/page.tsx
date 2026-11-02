"use client"
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import getErrorMessage from "@/helpers/getErrorMessage";
import MediaUploadArea from "@/components/MediaUploadArea";
import { useGalleryStore } from "@/store/useGalleryStore";
import CategorySelectionBar from "@/components/CategorySelectionBar";
import { useCategoryStore } from "@/store/useCategoryStore";

function createProduct() {
    const categoryUpload = useCategoryStore().categoryUpload;
    const imagesUpload = useGalleryStore().imagesUpload;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", 
    price: "",
    stock: "",
    description: "",
    status: "Available",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    // setIsLoading(true);

    // try {
    //   const uploadedGallery = await dispatch(createGallery(imagesUpload)).unwrap();

    //   const finalFormData = {
    //     ...formData,
    //     gallery: imagesUpload,
    //     category: categoryUpload,
    //   };

    //   await dispatch(createProduct(finalFormData)).unwrap();

    //   toast.success("Product successfully listed");
    //   navigate("/productManager");
    // } catch (err) {
    //   const message = getErrorMessage(err);
    //   toast.error(message || "Falled to finalize store listing");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">
            Add New Product
          </h1>
          <p className="text-sm text-brand-slate">
            List a new item in your digital store inventory catalog.
          </p>
        </div>

        {/* Quick Top Controls */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onSubmit={handleSubmit}
            disabled={isLoading}
            form="product-form"
            type="submit"
            className="grow sm:flex-none px-5 py-2.5 text-sm font-semibold bg-brand-rust text-white rounded-xl shadow-md hover:bg-brand-rust/90 transition-colors duration-150 "
          >
            {isLoading && (
              <i
                id="btnSpinner"
                className="fa-solid fa-circle-notch fa-spin hidden"
              ></i>
            )}{" "}
            Publish Product
          </button>
        </div>
      </div>

      {/* Main Form Engine */}
      <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
        {/* BLOCK 1: GENERAL APPRAISAL */}
        <div className="bg-white border border-brand-sand rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-brand-dark border-b border-brand-sand/40 pb-2">
            Basic Description
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g., Studio Monitors Monitor Gen 2"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CategorySelectionBar />

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Status
              </label>
              <select
                name="status"
                required
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
              >
                <option value="Available">Available</option>
                <option value="Sold out">Sold out</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
              Full Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Outline technical features, hardware specs, box contents, or dimensions..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors resize-none"
            />
          </div>
        </div>

        {/* BLOCK 2: FINANCIAL & INVENTORY MANAGEMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pricing Box Wrapper */}
          <div className="bg-white border border-brand-sand rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-brand-dark border-b border-brand-sand/40 pb-2">
              Pricing Structure
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Stock Tracking Box */}
          <div className="bg-white border border-brand-sand rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-brand-dark border-b border-brand-sand/40 pb-2">
              Inventory Ledger
            </h2>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Initial Units in Stock *
              </label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                placeholder="e.g., 50"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
              />
            </div>
          </div>
        </div>
      </form>

      {/* BLOCK 3: MEDIA UPLOAD AREA GRAPHICS */}
      <MediaUploadArea />
    </div>
  );
}

export default createProduct;