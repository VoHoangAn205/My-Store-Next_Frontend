import { FormImgsFile } from "@/types";

const imageFileFormatter = (listFile: FormImgsFile[]) => {
  const formData = new FormData();

  if (!Array.isArray(listFile)) return formData;

  listFile.forEach((item) => {
    const fileBinary = item?.file ? item.file : item;

    if (fileBinary instanceof File) {
      formData.append("images", fileBinary);
    }
  });
  return formData;
};

export default imageFileFormatter;
