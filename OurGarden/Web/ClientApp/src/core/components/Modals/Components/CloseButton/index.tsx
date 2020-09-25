import React from "react";

import CloseIcon from "@icons/CloseOutlined";

import { ICloseButton } from "./interfaces/ICloseButton";

import "./style/CloseButton.style.scss";

export const CloseButton = ({ onCloseModal }: ICloseButton) => (
  <span
    role="button"
    onKeyDown={onCloseModal}
    onClick={onCloseModal}
    className="photo-modal-close"
    tabIndex={0}
  >
    <CloseIcon className="photo-modal-close-icon" />
  </span>
);
