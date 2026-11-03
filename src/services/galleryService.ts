import imageFileFormatter from "@/helpers/imageFileFormatter";
import { axiosPrivate } from "@/lib/API"
import { FormImgsFile } from "@/types";

const galleryService = {
    createGallery: async (data: FormImgsFile[]) => {
        const formData = imageFileFormatter(data);
        const response = await axiosPrivate.post("/gallery", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    }
}

export default galleryService;