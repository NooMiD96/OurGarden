/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";

import Modal from "@core/materialUI/modal";

import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import { CloseButton } from "../Components/CloseButton";
import { NextArrow, PrevArrow } from "@core/components/Arrows";

import { IPhotoListModal } from "./interfaces/IPhotoListModal";

import "./style/PhotoListModal.style.scss";

/* eslint-disable jsx-a11y/alt-text */
export const PhotoListModal = ({
  isModalOpen,
  selectedPhoto,
  photoList,
  onCloseModal,
}: TWithRouter<IPhotoListModal>) => {
  if (!selectedPhoto || !photoList || !photoList.length) {
    return <div />;
  }

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(
    photoList.findIndex((x) => selectedPhoto.photoId === x.photoId)
  );

  useEffect(() => {
    setSelectedPhotoIndex(
      photoList.findIndex((x) => selectedPhoto.photoId === x.photoId)
    );
  }, [selectedPhoto]);

  return (
    <Modal
      className="photo-list-modal"
      classes={{ paper: "photo-list-modal-paper" }}
      open={isModalOpen}
      onClose={onCloseModal}
      onKeyDown={(event: React.KeyboardEvent<HTMLImageElement>) => {
        if (event.key === "ArrowRight") {
          setSelectedPhotoIndex((selectedPhotoIndex + 1) % photoList.length);
        }
        if (event.key === "ArrowLeft") {
          // prettier-ignore
          setSelectedPhotoIndex(
            (
              (
                selectedPhotoIndex === 0
                  ? photoList.length
                  : selectedPhotoIndex
              ) - 1
            ) % photoList.length
          );
        }
        if (event.key === "Escape") {
          onCloseModal();
        }
      }}
    >
      <div
        className="image-img-wrapper"
        onClick={(e) => {
          e.preventDefault();
          onCloseModal();
        }}
      >
        <img
          className="image-img"
          src={photoList[selectedPhotoIndex].url}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      </div>
      <CloseButton onCloseModal={onCloseModal} />
      {photoList.length > 1 && (
        <>
          <PrevArrow
            tabindex={-1}
            // prettier-ignore
            onClick={() => setSelectedPhotoIndex(
              (
                (
                  selectedPhotoIndex === 0
                    ? photoList.length
                    : selectedPhotoIndex
                ) - 1
              ) % photoList.length
            )}
          />
          <NextArrow
            tabindex={-1}
            // prettier-ignore
            onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % photoList.length)}
          />
        </>
      )}
    </Modal>
  );
};
/* eslint-enable jsx-a11y/alt-text */

// Без WithRouterPush не работает тот рендер,
// который используется в ModalWindowDump
export default WithRouterPush<IPhotoListModal>(PhotoListModal as any);
