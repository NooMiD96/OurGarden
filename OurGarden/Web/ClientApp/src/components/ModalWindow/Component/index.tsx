import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import PhotoListModal from "./PhotoListModal";
import NewProductInCard from "./NewProductInCard";

import { MODAL_TIMEOUT } from "@src/core/constants";

import { ModalOpenType } from "../State";
import { TState } from "../TState";
import { INewProductInCard } from "./NewProductInCard/INewProductInCard";
import { IPhotoListModalProps } from "./PhotoListModal/IPhotoListModal";
import { IApplicationState } from "@src/Store";

const ModalWindowDump = (state: TState) => {
  // prettier-ignore
  const {
    modalOpenType,
    closeModalWindow,
    photoState,
    newProductInCard,
    router
  } = state;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalCloseTimer, setModalCloseTimer] = useState(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    null as NodeJS.Timeout | null
  );
  const [ComponentToRender, setComponentToRender] = useState(NewProductInCard);
  const [componentProps, setComponentProps] = useState({});

  useEffect(() => {
    switch (modalOpenType) {
      case ModalOpenType.AddToCard: {
        setComponentToRender(NewProductInCard);
        if ((document.activeElement as any)?.blur) {
          (document.activeElement as any).blur();
        }

        if (newProductInCard) {
          if (modalCloseTimer !== null) {
            clearTimeout(modalCloseTimer);
          }

          const closeTimer = setTimeout(() => {
            closeModalWindow();
          }, MODAL_TIMEOUT);

          setModalCloseTimer(closeTimer);
          setModalOpen(true);

          const props: INewProductInCard = {
            isModalOpen: false,
            closeModal: () => {
              if (modalCloseTimer !== null) {
                clearTimeout(modalCloseTimer);
              }
              closeModalWindow();
            },
            product: newProductInCard!,
            onEnter: () => {
              if (document?.body?.style?.overflow) {
                document.body.style.overflow = "";
                document.body.style.paddingRight = "";
                // eslint-disable-next-line no-unused-expressions
                document
                  .querySelector(
                    "body > .new-product-in-card > .MuiDialog-container"
                  )
                  ?.removeAttribute("tabindex");
              }
            },
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

        const props: IPhotoListModalProps = {
          isModalOpen: false,
          photoList: photoState.photoList,
          selectedPhoto: photoState.selectedPhoto,
          onCloseModal: closeModalWindow,
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
  }, [modalOpenType, photoState, newProductInCard]);

  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md ?
  useEffect(() => {
    if (!router.location.hash && router.action === "POP") {
      setModalOpen(false);
    }
  }, [router.location.hash]);

  return <ComponentToRender {...componentProps} isModalOpen={isModalOpen} />;
};

export default connect((state: IApplicationState) => ({
  router: state.router,
}))(ModalWindowDump);
