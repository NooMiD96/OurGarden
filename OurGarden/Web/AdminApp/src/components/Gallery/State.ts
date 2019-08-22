import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface IGallery {
  galleryId: number;
  name: string;
  alias: string;
  description: string;
  photos: IPhoto[];
}

export interface IGalleryDTO {
  galleryId: number;
  name: string;
  description: string;
  addFiles: File[];
  removeFiles: string[] | null;
}

export interface IGalleryState {
  listItem: IGallery[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IGalleryState = {
  listItem: [],
  pending: false,
  errorInner: "",
};
//#endregion
