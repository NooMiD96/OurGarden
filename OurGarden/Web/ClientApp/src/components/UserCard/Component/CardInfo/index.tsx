import React from "react";

import CardInfoTable, { cardProductToDisplay } from "./CardInfoTable";

import { IDisplayInfo, ICardInfo } from "./ICardInfo";
import CardInfoFooter from "./CardInfoFooter";

const CardInfo = (props: ICardInfo) => {
  const dataSource: IDisplayInfo[] = props.productList.map(
    cardProductToDisplay
  );

  const totalPrice = dataSource
    .map((x) => x.totalCost)
    .reduce((val, acc) => acc + val, 0);

  return (
    <React.Fragment>
      <CardInfoTable
        dataSource={dataSource}
        changeCountOfProduct={props.changeCountOfProduct}
        removeProductFromCard={props.removeProductFromCard}
      />
      <CardInfoFooter
        isVisible={!!dataSource.length}
        onChangeOrderStep={props.onChangeOrderStep}
        сleanProductCard={props.сleanProductCard}
        totalPrice={totalPrice}
      />
    </React.Fragment>
  );
};

export default CardInfo;
