import { StaticImageData } from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";

export type UploadImageFolder = "movies" | "theaters";

export const getImage = (
  fileName: string | StaticImageData,
  folderType?: UploadImageFolder
): string | StaticImageData => {
  if (!fileName) {
    return "";
  }

  if (typeof fileName !== "string") {
    return fileName;
  }

  const cleanPath = fileName.replace(/^\/+/, "");

  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    return fileName;
  }

  if (folderType && !cleanPath.includes("/")) {
    return `${API_BASE_URL}/uploads/${folderType}/${cleanPath}`;
  }

  return `${API_BASE_URL}/${cleanPath}`;
};


export default getImage;
