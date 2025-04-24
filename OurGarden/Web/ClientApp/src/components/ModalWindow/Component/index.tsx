import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

import { MODAL_TIMEOUT } from "@core/constants";

import { ModalOpenType } from "../State";
import { TState } from "../TState";
import { INewProductInCardModal } from "@core/components/Modals/NewProductInCardModal/interfaces/INewProductInCardModal";
import { IPhotoListModal } from "@core/components/Modals/PhotoListModal/interfaces/IPhotoListModal";
import { IFeedbackModal } from "@core/components/Modals/FeedbackModal/interfaces/IFeedbackModal";

const ModalWindowDump = (props: TState) => {
  const {
    modalOpenType,
    photoState,
    feedbackState,
    newProductInCardState,
    closeModalWindow,
    goBack,
  } = props;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalCloseTimer, setModalCloseTimer] = useState(null as any);
  const [componentType, setComponentType] = useState(ModalOpenType.Closed);
  const [ComponentToRender, setComponentToRender] = useState(null as any);
  const [componentProps, setComponentProps] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const routeAction = useNavigationType();

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
            navigate,
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

  useEffect(() => {
    if (!location.hash && routeAction === "POP") {
      setModalOpen(false);
    }
  }, [location.hash, routeAction]);

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
    <ComponentToRender.default {...componentProps} isModalOpen={isModalOpen} />
  );
};

export default ModalWindowDump;
