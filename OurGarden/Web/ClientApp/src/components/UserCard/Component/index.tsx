import React from "react";

import HeaderHelmet from "@src/core/components/Helmet";

import CardInfo from "./CardInfo";
import CardConfirmation from "./CardConfirmation";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

import { TState, TComponentState, DisplayTypeEnum } from "../TState";

import "./style/UserCard.style.scss";

export class UserCard extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    displayType: DisplayTypeEnum.CardInfo,
    mounted: false
  };

  componentDidMount() {
    this.props.setBreadcrumb({
      breadcrumb: [],
      key: "",
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
    const { displayType } = this.state;

    if (!productList || productList.length === 0) {
      return "flex-grow-0";
    }

    return displayType === DisplayTypeEnum.CardConfirmation ? "card-confirmation flex-grow-0" : "card-info flex-grow-1";
  };

  render() {
    const {
      productList,
      pending,
      sendOrder,
      changeCountOfProduct,
      removeProductFromCard,
      сleanProductCard
    } = this.props;

    const { displayType, mounted } = this.state;

    if (!mounted) {
      return <div />;
    }

    const renderComponent
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
          sendOrder={sendOrder}
          onChangeOrderStep={this.onChangeOrderStep}
          pending={pending}
        />
      );

    const additionalClassName = this.getAdditionalClassName(productList);

    return (
      <div className={`user-card-wrapper content white-background grey-border ${additionalClassName}`}>
        <HeaderHelmet
          {...getSEOMetaData("userCard")}
        />
        {renderComponent}
      </div>
    );
  }
}

export default UserCard;
