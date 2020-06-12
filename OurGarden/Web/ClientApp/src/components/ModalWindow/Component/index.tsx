import React, { useState, useEffect } from "react";

import NewProductInCard from "./NewProductInCard";

import { ModalType } from "../State";
import { TState } from "../TState";

const MODAL_TIMEOUT = 5_000;

const ModalWindowDump = ({ newProductInCard, closeModalWindow }: TState) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalCloseTimer, setModalCloseTimer] = useState(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    null as NodeJS.Timeout | null
  );
  const [modalType, setModalType] = useState(ModalType.Closed);

  useEffect(() => {
    if (newProductInCard) {
      if (modalCloseTimer !== null) {
        clearTimeout(modalCloseTimer);
      }

      const closeTimer = setTimeout(() => {
        closeModalWindow();
      }, MODAL_TIMEOUT);

      setModalCloseTimer(closeTimer);
      setModalType(ModalType.NewProduct);
      setModalOpen(true);

      return () => clearTimeout(closeTimer);
    }

    setModalOpen(false);
    return () => null;
  }, [newProductInCard, closeModalWindow]);

  switch (modalType) {
    case ModalType.NewProduct:
      return (
        <NewProductInCard
          isModalOpen={isModalOpen}
          closeModal={() => {
            if (modalCloseTimer !== null) {
              clearTimeout(modalCloseTimer);
            }
            closeModalWindow();
          }}
          product={newProductInCard!}
          onEnter={() => {
            if (document?.body?.style?.overflow) {
              document.body.style.overflow = "";
              document.body.style.paddingRight = "";
            }
          }}
        />
      );

    default:
      return null;
  }
};

export default ModalWindowDump;
