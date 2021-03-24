import React, { useState, useEffect } from "react";

import { MODAL_TIMEOUT } from "@core/constants";

import { ModalOpenType } from "../State";
import { TState } from "../TState";
import { INewProductInCardModal } from "@core/components/Modals/NewProductInCardModal/interfaces/INewProductInCardModal";
import { IPhotoListModal } from "@core/components/Modals/PhotoListModal/interfaces/IPhotoListModal";
import { IFeedbackModal } from "@core/components/Modals/FeedbackModal/interfaces/IFeedbackModal";

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
  const [modalCloseTimer, setModalCloseTimer] = useState(null as any);
  const [componentType, setComponentType] = useState(ModalOpenType.Closed);
  const [ComponentToRender, setComponentToRender] = useState(null as any);
  const [componentProps, setComponentProps] = useState({});

  useEffect(() => {
    switch (modalOpenType) {
      case ModalOpenType.AddToCard: {
        setComponentType(modalOpenType);

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
        setComponentType(modalOpenType);

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
        setComponentType(modalOpenType);

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

  useEffect(() => {
    const getComponent = async (type: ModalOpenType) => {
      let component = null;
      switch (type) {
        case ModalOpenType.AddToCard:
          component = await import(
            /* webpackChunkName: "NewProductInCardModal" */ "@core/components/Modals/NewProductInCardModal"
          );
          break;

        case ModalOpenType.Photo:
          component = await import(
            /* webpackChunkName: "PhotoListModal" */ "@core/components/Modals/PhotoListModal"
          );
          break;

        case ModalOpenType.Feedback:
          component = await import(
            /* webpackChunkName: "FeedbackModal" */ "@core/components/Modals/FeedbackModal"
          );
          break;

        default:
          break;
      }
      if (component) {
        setComponentToRender(component);
      }
    };

    getComponent(componentType);
  }, [componentType]);

  if (!ComponentToRender) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <ComponentToRender.default {...componentProps} isModalOpen={isModalOpen} />
  );
};

export default ModalWindowDump;
