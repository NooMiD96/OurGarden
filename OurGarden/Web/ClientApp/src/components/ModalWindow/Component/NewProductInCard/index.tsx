import React from "react";

import Button from "@core/antd/Button";
import { DialogContent, DialogContentText } from "@core/materialUI/modal";
import { StyledModal, StyledDialogActions } from "./StyledModal";
import { INewProductInCard } from "./INewProductInCard";

export const NewProductInCard = ({
  product,
  closeModal,
  isModalOpen,
  onEnter,
}: INewProductInCard) => {
  const linkToCard = "";
  const onToCardClickHanlder = () => {
    closeModal();
  };
  const onContinueClickHandler = () => {
    closeModal();
  };

  return (
    <StyledModal
      classes={{ root: "new-product-in-card" }}
      open={isModalOpen}
      hideBackdrop
      onEntering={onEnter}
    >
      <DialogContent dividers>
        <DialogContentText>
          {`${product?.alias ?? "Товар был"} добавлен в корзину`}
        </DialogContentText>
      </DialogContent>
      <StyledDialogActions classes={{ root: "modal-action-buttons" }}>
        <Button
          key="toCard"
          type="primary"
          className="custome-styled-btn flex-grow-1"
          onClick={onContinueClickHandler}
        >
          Перейти в корзину
        </Button>
        <Button
          className="custome-styled-btn flex-grow-1"
          key="continue"
          onClick={onToCardClickHanlder}
        >
          Продолжить покупки
        </Button>
      </StyledDialogActions>
    </StyledModal>
  );
};

export default NewProductInCard;
