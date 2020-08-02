import React from "react";

import Modal from "@core/materialUI/modal";

import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import CustomIcon from "@src/core/antd/Icon";

import { IPhotoListModalProps } from "./IPhotoListModal";

import "./style/PhotoListModal.style.scss";

/* eslint-disable jsx-a11y/alt-text */
export const PhotoListModal = ({
  isModalOpen,
  selectedPhoto,
  photoList,
  onCloseModal,
}: TWithRouter<IPhotoListModalProps>) => {
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
        <CustomIcon type="close" className="photo-modal-close-icon" />
      </span>
    </Modal>
  );
};
/* eslint-enable jsx-a11y/alt-text */

// Без WithRouterPush не работает тот рендер,
// который испаользуется в ModalWindowDump
export default WithRouterPush<IPhotoListModalProps>(PhotoListModal as any);
