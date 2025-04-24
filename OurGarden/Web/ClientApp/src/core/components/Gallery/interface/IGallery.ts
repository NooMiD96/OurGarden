import { NavigateFunction } from "react-router-dom";

import { IPhoto } from "@src/core/interfaces/IPhoto";
import { actionCreators } from "@src/components/ModalWindow/actions";

export interface IGalleryProps {
  galleryName: string;
  showPhotoModalWindow: typeof actionCreators.showPhotoModalWindow;
  navigate: NavigateFunction;
}

export interface IGalleryState {
  photos: IPhoto[];
  loading: boolean;
}
