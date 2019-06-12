import * as React from "react";
import { ButtonGroup, Modal, Alert } from "@core/antd";

import AccountControlButtons from "./AccountControlButtons";
import ModalContent from "./ModalContent";

import {
  TState,
  ModalTypeEnums,
  TComponentState,
  TRegistrationModel,
  TAuthenticationModel,
} from "../TAccount";

export class Account extends React.Component<TState, TComponentState> {
  state = {
    modalType: ModalTypeEnums.Nothing,
    pending: false,
  };
  containerRef = React.createRef<HTMLDivElement>();

  static getDerivedStateFromProps(nextProps: TState, prevState: TComponentState) {
    if (prevState.pending && !nextProps.pending) {
      if (nextProps.errorMessage) {
        return {
          ...prevState,
          pending: false,
        } as TComponentState;
      }
      return {
        ...prevState,
        modalType: ModalTypeEnums.Nothing,
        pending: false,
      } as TComponentState;
    }
    return null;
  }

  handleSubmit = (cb: Function, payload: TRegistrationModel | TAuthenticationModel) => {
    this.props.removeErrorMessage();
    cb(payload);
    this.setState({
      pending: true,
    });
  }

  logout = () => this.props.logout();

  showModal = (type: ModalTypeEnums) => this.setState({
    modalType: type,
  })
  closeModal = () => this.setState({
    modalType: ModalTypeEnums.Nothing,
  })

  render() {
    const { modalType } = this.state;
    const { pending, userName, errorMessage } = this.props;

    return (
      <div
        className="account-container"
        ref={this.containerRef}
      >
        <ButtonGroup>
          <AccountControlButtons
            showModal={this.showModal}
            logout={this.logout}
            userName={userName}
          />
          <Modal
            getContainer={() => this.containerRef.current!}
            title={<span className="account-modal-title">{ModalTypeEnums[modalType]}</span>}
            visible={modalType !== ModalTypeEnums.Nothing}
            closable={false}
            footer={null}
          >
            {
              errorMessage && <Alert
                message="Ошибка"
                description={errorMessage}
                type="error"
                closable={false}
                style={{ marginBottom: 10 }}
              />
            }
            <ModalContent
              handleAuthSubmit={(payload: TAuthenticationModel) => this.handleSubmit(this.props.authentication, payload)}
              handleRegSubmit={(payload: TRegistrationModel) => this.handleSubmit(this.props.registration, payload)}
              generalProps={{
                handleСlose: this.closeModal,
                loading: pending,
              }}
              modalType={modalType}
            />
          </Modal>
        </ButtonGroup>
      </div>
    );
  }
}
