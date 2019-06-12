import * as React from "react";

import Authentication from "./Authentication";
import Registration from "./Registration";

import {
  ModalTypeEnums,
  TAuthenticationModel,
  TRegistrationModel,
} from "../TAccount";

type AccountControlButtonsProps = {
  handleAuthSubmit: (payload: TAuthenticationModel) => void,
  handleRegSubmit: (payload: TRegistrationModel) => void,
  generalProps: {
    handleСlose: () => void,
    loading: boolean,
  }
  modalType: ModalTypeEnums,
};

const AccountControlButtons = (props: AccountControlButtonsProps) => {
  switch (props.modalType) {
    case ModalTypeEnums.Authentication:
      return (
        <Authentication
          handleSubmit={props.handleAuthSubmit}
          {...props.generalProps}
        />
      );
    case ModalTypeEnums.Registration:
      return (
        <Registration
          handleSubmit={props.handleRegSubmit}
          {...props.generalProps}
        />
      );
    default:
      return <div />;
  }
};

export default AccountControlButtons;
