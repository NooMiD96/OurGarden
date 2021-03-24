import React from "react";

import Svg from "@src/core/components/Svg";

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
    <Svg type="close" className="photo-modal-close-icon" />
  </span>
);
