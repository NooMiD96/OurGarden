import React from "react";

import Table, { ColumnProps } from "@src/core/antd/Table";
import { Title } from "@src/core/antd/Typography";
import Button from "@src/core/antd/Button";
import NumberInput from "@src/core/components/NumberInput";
import Remove from "@src/core/icons/Remove";

import { IUserCardProduct } from "../../State";
import { IProduct } from "@src/components/Product/State";

export interface ICardInfo {
  productList: IUserCardProduct[];
  changeCountOfProduct: (payload: IUserCardProduct) => void;
  removeProductFromCard: (payload: IProduct) => void;
}

export type IDisplayInfo = {
  product: IProduct;
  productId: string;
  cost: number;
  count: number;
  totalCost: number;
};

export const cardProductToDisplay = (x: IUserCardProduct): IDisplayInfo => ({
  product: x.product,
  productId: x.product.productId,
  cost: x.product.price,
  count: x.count,
  totalCost: x.count * x.product.price
});

const getColumns = (
  changeCountOfProduct: (payload: IUserCardProduct) => void,
  removeProductFromCard: (payload: IProduct) => void
) => {
  return [
    {
      title: <Title>Корзина</Title>,
      dataIndex: "productId",
      key: "productId",
      render: (_, record) => (
        <React.Fragment>
          <img
            src={record.product.photos && record.product.photos[0].url}
            alt={record.product.alias}
            width="250px"
          />
          <span className="product-name">{record.product.alias}</span>
        </React.Fragment>
      )
    },
    {
      title: "Цена, шт",
      dataIndex: "cost",
      key: "cost"
    },
    {
      title: "Количество",
      dataIndex: "count",
      key: "count",
      render: (_, record) => {
        let count = record.count.toString();

        return (
          <NumberInput
            className="product-count-input"
            value={count}
            onValueChange={value => {
              const newCardObject: IUserCardProduct = {
                count: Number.parseInt(value, 10),
                product: record.product
              };

              changeCountOfProduct(newCardObject);
            }}
          />
        );
      }
    },
    {
      title: "Сумма",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (totalCost: number) => (
        <span>
          {totalCost.toLocaleString()}
          р
        </span>
      )
    },
    {
      title: "Удалить",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <Remove onClick={() => removeProductFromCard(record.product)} />
      )
    }
  ] as ColumnProps<IDisplayInfo>[];
};

const rowKey = (record: IUserCardProduct) => {
  return `${record.product.categoryId}-${record.product.subcategoryId}-${
    record.product.productId
  }`;
};

const CardInfo = (props: ICardInfo) => {
  const dataSource: IDisplayInfo[] = props.productList.map(
    cardProductToDisplay
  );

  const columns = getColumns(
    props.changeCountOfProduct,
    props.removeProductFromCard
  );

  const totalPrice = dataSource.map(x => x.totalCost).reduce((val, acc) => acc + val, 0);

  return (
    <React.Fragment>
      <Table dataSource={dataSource} columns={columns} rowKey={rowKey} />

      <div className="price-wrapper">
        <span>Сумма:</span>
        <span className="price">
          {totalPrice}
          {" "}
          рублей
        </span>
      </div>
      <div className="buttons-wrapper">
        <Button className="clean-button" disabled>Очистить корзину</Button>
        <Button className="cancel-button" disabled>Отмена</Button>
        <Button type="primary" className="order-button">Оформить заказ</Button>
      </div>

    </React.Fragment>
  );
};

export default CardInfo;
