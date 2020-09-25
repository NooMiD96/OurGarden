import React, { useState, useEffect } from "react";

import NewProductInCardModal from "@src/core/components/NewProductInCardModal";
import PhotoListModal from "@src/core/components/PhotoListModal";

import { MODAL_TIMEOUT } from "@src/core/constants";

import { ModalOpenType } from "../State";
import { TState } from "../TState";
import { INewProductInCardModal } from "@src/core/components/NewProductInCardModal/interfaces/INewProductInCardModal";
import { IPhotoListModal } from "@src/core/components/PhotoListModal/interfaces/IPhotoListModal";

const ModalWindowDump = (state: TState) => {
  // prettier-ignore
  const {
    modalOpenType,
    photoState,
    newProductInCardState,
    router,
    closeModalWindow,
    goBack
  } = state;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalCloseTimer, setModalCloseTimer] = useState(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
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

        /// Снимаем фокус с элемента, чтобы после закрытия модалки
        /// фокус не вернулся.
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
