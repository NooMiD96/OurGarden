import React from "react";

import Modal from "@core/materialUI/modal";

import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import CloseIcon from "@icons/CloseOutlined";

import { IPhotoListModal } from "./interfaces/IPhotoListModal";

import "./style/PhotoListModal.style.scss";

/* eslint-disable jsx-a11y/alt-text */
export const PhotoListModal = ({
  isModalOpen,
  selectedPhoto,
  photoList,
  onCloseModal,
}: TWithRouter<IPhotoListModal>) => {
  const selectedPhotoIndex = photoList?.findIndex(
    (x) => selectedPhoto?.photoId === x.photoId
  );

  return (
    <Modal open={isModalOpen} onClose={onCloseModal}>
      <img width="100%" height="100%" src={selectedPhoto?.url} />
      <span
        role="button"
        onKeyDown={onCloseModal}
        onClick={onCloseModal}
        className="photo-modal-close"
        tabIndex={0}
      >
        <CloseIcon className="photo-modal-close-icon" />
      </span>
    </Modal>
  );
};
/* eslint-enable jsx-a11y/alt-text */

// Без WithRouterPush не работает тот рендер,
// который используется в ModalWindowDump
export default WithRouterPush<IPhotoListModal>(PhotoListModal as any);
