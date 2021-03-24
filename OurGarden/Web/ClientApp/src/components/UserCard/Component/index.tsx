import React from "react";

import CardInfo from "./CardInfo";
import CardConfirmation from "./CardConfirmation";
import OrderCreate from "@src/core/components/OrderCreate";

import { TState, TComponentState, DisplayTypeEnum } from "../TState";
import { IOrderUserInformation } from "../Model/IModel";

import { WHITE_BLOCK } from "@src/core/constants/style";

import "./style/UserCard.style.scss";

export class UserCard extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    displayType: DisplayTypeEnum.CardInfo,
    mounted: false,
  };

  componentDidMount() {
    this.props.setBreadcrumb({
      breadcrumb: [],
      key: "",
    });
    this.setState({
      mounted: true,
    });
  }

  componentDidUpdate(prevProps: TState) {
    // prettier-ignore
    // Если изменился ключ локации, значит был
    // изменён роутер на тот же, где и находимся
    // (иначе бы данный компонент уже не рендерился).
    // В этом случае нужно обнулить параметры.
    if (
      prevProps.location.key
      && this.props.location.key
      && prevProps.location.key !== this.props.location.key
      && this.state.displayType !== DisplayTypeEnum.CardInfo
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        displayType: DisplayTypeEnum.CardInfo
      });
      this.props.setOrderId();
      this.props.cleanErrorInner();
    }
  }

  onChangeOrderStep = (newType: DisplayTypeEnum) => {
    this.setState({
      displayType: newType,
    });
  };

  getAdditionalClassName = () => {
    const { productList } = this.props;
    const { displayType } = this.state;

    if (!productList || productList.length === 0) {
      return "card-empty";
    }

    if (displayType === DisplayTypeEnum.OrderCreate) {
      return "card-confirm";
    }

    return displayType === DisplayTypeEnum.CardConfirmation
      ? "card-confirmation flex-grow-0"
      : "card-info flex-grow-1";
  };

  sendOrder = (userInfo: IOrderUserInformation) => {
    this.setState({
      displayType: DisplayTypeEnum.OrderCreate,
    });
    this.props.sendOrder(userInfo);
  };

  render() {
    const {
      productList,
      pending,
      errorInner,
      ymId,
      orderId,
      changeCountOfProduct,
      removeProductFromCard,
      cleanProductCard,
    } = this.props;

    const { displayType, mounted } = this.state;

    if (!mounted) {
      return <div />;
    }

    let renderComponent = null;
    switch (displayType) {
      case DisplayTypeEnum.OrderCreate:
        renderComponent = (
          <OrderCreate
            pending={pending}
            orderId={orderId}
            errorInner={errorInner}
            ymId={ymId}
          />
        );
        break;

      case DisplayTypeEnum.CardInfo:
        renderComponent = (
          <CardInfo
            productList={productList}
            removeProductFromCard={removeProductFromCard}
            changeCountOfProduct={changeCountOfProduct}
            cleanProductCard={cleanProductCard}
            onChangeOrderStep={this.onChangeOrderStep}
            ymId={ymId}
          />
        );
        break;

      case DisplayTypeEnum.CardConfirmation:
        renderComponent = (
          <CardConfirmation
            productList={productList}
            sendOrder={this.sendOrder}
            onChangeOrderStep={this.onChangeOrderStep}
            ymId={ymId}
          />
        );
        break;

      default:
        renderComponent = <div />;
        break;
    }

    const additionalClassName = this.getAdditionalClassName();

    return (
      <div
        className={`user-card-wrapper content ${WHITE_BLOCK} ${additionalClassName}`}
      >
        {renderComponent}
      </div>
    );
  }
}

export default UserCard;
