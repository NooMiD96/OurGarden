import React from "react";

import CardInfoFooter from "./CardInfoFooter";
import CardInfoTable from "@core/components/CardInfoTable";

import { ICardInfo } from "./ICardInfo";
import { IDisplayInfo } from "@core/components/CardInfoTable/Model/IDisplayInfo";
import { IProduct } from "@src/components/Product/State";

const CardInfo = (props: ICardInfo) => {
  const dataSource = props.productList.map<IDisplayInfo<IProduct>>((x) => ({
    product: x.product,
    productId: x.product.productId,
    cost: x.product.price,
    count: x.count,
    totalCost: x.count * x.product.price,
  }));

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
        cleanProductCard={props.cleanProductCard}
        totalPrice={totalPrice}
        ymId={props.ymId}
      />
    </React.Fragment>
  );
};

export default CardInfo;
