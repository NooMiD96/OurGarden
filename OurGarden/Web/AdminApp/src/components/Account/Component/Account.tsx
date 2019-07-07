import * as React from "react";

import Modal from "@core/antd/Modal";
import Alert from "@core/antd/Alert";
import Authentication from "./Authentication";

import { TState } from "../TState";
import { TAuthenticationModel } from "../TModel";

export class Account extends React.Component<TState, {}> {
  handleSubmit = (payload: TAuthenticationModel) => {
    this.props.removeErrorMessage();
    this.props.authentication(payload);
  }

  logout = () => this.props.logout();

  render() {
    const { pending, errorMessage } = this.props;

    return (
      <div
        className="account-container"
      >
        <Modal
          title={<span className="account-modal-title">Авторизация</span>}
          visible
          closable={false}
          footer={null}
        >
          {
            errorMessage && (
              <Alert
                message="Ошибка"
                description={errorMessage}
                type="error"
                closable={false}
                style={{ marginBottom: 10 }}
              />
            )
          }
          <Authentication
            handleSubmit={this.handleSubmit}
            loading={pending}
          />
        </Modal>
      </div>
    );
  }
}
