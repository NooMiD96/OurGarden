import { IPhoto } from "@src/core/interfaces/IPhoto";

export interface IGalleryProps {
  galleryName: string;
}

export interface IGalleryState {
  photos: IPhoto[];
  loading: boolean;
}
