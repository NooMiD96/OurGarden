import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { IDefaultState } from "@src/core/IDefaultState";

// -----------------
// #region STATE
export interface IGallery {
  galleryId: number;
  alias: string;
  normalizeAlias: string;
  isVisible: boolean;
  photos: IPhoto[];
}

export interface IGalleryDTO extends IMultiplyPhotoDTO {
  galleryId: number;
  alias: string;
  isVisible: boolean;
}

export interface IGalleryState extends IDefaultState {
  listItem: IGallery[];
}

export const unloadedState: IGalleryState = {
  listItem: [],
  pending: false,
  errorInner: "",
};
// #endregion
