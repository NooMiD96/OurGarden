import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { IDefaultState } from "@src/core/IDefaultState";

// -----------------
//#region STATE
export interface IGallery {
  galleryId: number;
  name: string;
  alias: string;
  isVisible: boolean;
  photos: IPhoto[];
}

export interface IGalleryDTO extends IMultiplyPhotoDTO {
  galleryId: number;
  name: string;
  isVisible: boolean;
}

export interface IGalleryState extends IDefaultState {
  listItem: IGallery[];
}

export const unloadedState: IGalleryState = {
  listItem: [],
  pending: false,
  errorInner: ""
};
//#endregion
