import { IPhoto } from "@src/core/interfaces/IPhoto";

export interface IPhotoListModal {
  isModalOpen: boolean;
  selectedPhoto?: IPhoto;
  photoList?: IPhoto[];
  onCloseModal: () => void;
}
