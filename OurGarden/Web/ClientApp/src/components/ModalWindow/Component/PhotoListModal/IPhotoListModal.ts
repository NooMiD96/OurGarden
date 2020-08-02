import { IPhoto } from "@src/core/interfaces/IPhoto";

export interface IPhotoListModalProps {
  isModalOpen: boolean;
  selectedPhoto?: IPhoto;
  photoList?: IPhoto[];
  onCloseModal: () => void;
}
