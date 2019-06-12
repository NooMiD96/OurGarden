import * as React from "react";
import { Button, Row, Col, Typography } from "@core/antd";

import { ModalTypeEnums } from "../TAccount";

const { Text } = Typography;

type AccountControlButtonsProps = {
  showModal: (ModalType: ModalTypeEnums) => void,
  logout: () => void,
  userName?: string,
};

const mobileGridOptions = {
  xs: 24,
  sm: 24,
  md: 0,
};

const MobileButtons = ({
  showModal,
}: {
  showModal: (ModalType: ModalTypeEnums) => void,
}) => (
  <Col {...mobileGridOptions}>
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon="login"
      onClick={() => showModal(ModalTypeEnums.Authentication)}
    />
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon="idcard"
      onClick={() => showModal(ModalTypeEnums.Registration)}
    />
  </Col>
);

const desctopGridOptions = {
  xs: 0,
  sm: 0,
  md: 24,
};
const DesctopButtons = ({
  showModal,
}: {
  showModal: (ModalType: ModalTypeEnums) => void,
}) => (
  <Col  {...desctopGridOptions}>
    <Button
      type="primary"
      size="large"
      icon="login"
      onClick={() => showModal(ModalTypeEnums.Authentication)}
    >
      <Text className="white-text">Войти</Text>
    </Button>
    <Button
      type="primary"
      size="large"
      icon="idcard"
      onClick={() => showModal(ModalTypeEnums.Registration)}
    >
      <Text className="white-text">Регистрация</Text>
    </Button>
  </Col>
);

const AccountControlButtons = (props: AccountControlButtonsProps) => (
  !props.userName
    ? <Row>
      <MobileButtons showModal={props.showModal} />
      <DesctopButtons showModal={props.showModal} />
    </Row>
    : <Row>
      <Col {...desctopGridOptions}>
        <Button
          type="primary"
          size="large"
          icon="logout"
          onClick={() => props.logout()}
        >
          <Text className="white-text">Выйти</Text>
        </Button>
      </Col>
      <Col  {...mobileGridOptions}>
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon="logout"
          onClick={() => props.logout()}
        />
      </Col>
    </Row>
);

export default AccountControlButtons;
