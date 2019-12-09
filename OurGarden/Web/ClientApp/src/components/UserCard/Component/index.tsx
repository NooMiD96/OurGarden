import React from "react";

import HeaderHelmet from "@src/core/components/Helmet";

import CardInfo from "./CardInfo";
import CardConfirmation from "./CardConfirmation";
import CardConfirm from "./CardConfirm";

import { TState, TComponentState, DisplayTypeEnum } from "../TState";
import { IOrderUserInformation } from "../IModel";

import "./style/UserCard.style.scss";

export class UserCard extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    displayType: DisplayTypeEnum.CardInfo,
    orderCreated: false,
    mounted: false
  };

  componentDidMount() {
    this.props.setBreadcrumb({
      breadcrumb: [],
      key: ""
    });
    this.setState({
      mounted: true
    });
  }

  onChangeOrderStep = (newType: DisplayTypeEnum) => {
    this.setState({
      displayType: newType
    });
  };

  getAdditionalClassName = () => {
    const { productList } = this.props;
    const { displayType, orderCreated } = this.state;

    if (!productList || productList.length === 0) {
      return "card-empty";
    }

    if (orderCreated) {
      return "card-confirm";
    }

    return displayType === DisplayTypeEnum.CardConfirmation
      ? "card-confirmation flex-grow-0"
      : "card-info flex-grow-1";
  };

  sendOrder = (userInfo: IOrderUserInformation) => {
    this.setState({
      orderCreated: true
    });
    this.props.sendOrder(userInfo);
  };

  render() {
    const {
      productList,
      changeCountOfProduct,
      removeProductFromCard,
      сleanProductCard,
      pending,
      errorInner
    } = this.props;

    const { displayType, orderCreated, mounted } = this.state;

    if (!mounted) {
      return <div />;
    }

    let renderComponent = null;

    if (orderCreated) {
      renderComponent = (
        <CardConfirm pending={pending} errorInner={errorInner} />
      );
    } else {
      // prettier-ignore
      renderComponent
        = displayType === DisplayTypeEnum.CardInfo ? (
          <CardInfo
            productList={productList}
            removeProductFromCard={removeProductFromCard}
            changeCountOfProduct={changeCountOfProduct}
            сleanProductCard={сleanProductCard}
            onChangeOrderStep={this.onChangeOrderStep}
          />
        ) : (
          <CardConfirmation
            productList={productList}
            sendOrder={this.sendOrder}
            onChangeOrderStep={this.onChangeOrderStep}
          />
        );
    }

    const additionalClassName = this.getAdditionalClassName();

    return (
      <div
        className={`user-card-wrapper content white-background grey-border ${additionalClassName}`}
      >
        <HeaderHelmet seoSectionName="userCard" />
        {renderComponent}
      </div>
    );
  }
}

export default UserCard;
