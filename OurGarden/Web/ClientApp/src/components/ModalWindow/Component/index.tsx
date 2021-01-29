import React, { useState, useEffect } from "react";

import NewProductInCardModal from "@src/core/components/Modals/NewProductInCardModal";
import PhotoListModal from "@src/core/components/Modals/PhotoListModal";
import FeedbackModal from "@src/core/components/Modals/FeedbackModal";

import { MODAL_TIMEOUT } from "@src/core/constants";

import { ModalOpenType } from "../State";
import { TState } from "../TState";
import { INewProductInCardModal } from "@src/core/components/Modals/NewProductInCardModal/interfaces/INewProductInCardModal";
import { IPhotoListModal } from "@src/core/components/Modals/PhotoListModal/interfaces/IPhotoListModal";
import { IFeedbackModal } from "@src/core/components/Modals/FeedbackModal/interfaces/IFeedbackModal";

const ModalWindowDump = (state: TState) => {
  const {
    modalOpenType,
    photoState,
    feedbackState,
    newProductInCardState,
    router,
    closeModalWindow,
    goBack,
  } = state;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalCloseTimer, setModalCloseTimer] = useState(
    null as NodeJS.Timeout | null
  );
  const [ComponentToRender, setComponentToRender] = useState(
    NewProductInCardModal
  );
  const [componentProps, setComponentProps] = useState({});

  useEffect(() => {
    switch (modalOpenType) {
      case ModalOpenType.AddToCard: {
        setComponentToRender(NewProductInCardModal);

        // Снимаем фокус с элемента, чтобы после закрытия модалки
        // фокус не вернулся.
        if ((document.activeElement as any)?.blur) {
          (document.activeElement as any).blur();
        }

        if (newProductInCardState) {
          setModalOpen(true);

          modalCloseTimer && clearTimeout(modalCloseTimer);

          const closeTimer = setTimeout(() => {
            closeModalWindow();
          }, MODAL_TIMEOUT);
          setModalCloseTimer(closeTimer);

          const props: INewProductInCardModal = {
            isModalOpen: false,
            closeModal: () => {
              modalCloseTimer && clearTimeout(modalCloseTimer);
              closeModalWindow();
            },
            product: { ...(newProductInCardState ?? {}) },
          };
          setComponentProps(props);

          return () => clearTimeout(closeTimer);
        }

        break;
      }

      case ModalOpenType.Photo: {
        setComponentToRender(PhotoListModal);

        if (!photoState) {
          setModalOpen(false);
          return () => null;
        }

        const props: IPhotoListModal = {
          isModalOpen: false,
          photoList: photoState.photoList,
          selectedPhoto: photoState.selectedPhoto,
          onCloseModal: () => {
            closeModalWindow();
            goBack();
          },
        };
        setComponentProps(props);
        setModalOpen(true);

        break;
      }

      case ModalOpenType.Feedback: {
        setComponentToRender(FeedbackModal);

        const props: IFeedbackModal = {
          isModalOpen: false,
          onCloseModal: () => {
            closeModalWindow();
          },
          product: feedbackState?.product,
        };
        setComponentProps(props);
        setModalOpen(true);

        break;
      }

      case ModalOpenType.Closed:
      default:
        setModalOpen(false);
        break;
    }

    return () => null;
  }, [modalOpenType, photoState, newProductInCardState]);

  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md ?
  useEffect(() => {
    if (!router.location.hash && router.action === "POP") {
      setModalOpen(false);
    }
  }, [router.location.hash]);

  return <ComponentToRender {...componentProps} isModalOpen={isModalOpen} />;
};

export default ModalWindowDump;
