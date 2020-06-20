import React from "react";
import { Link } from "react-router-dom";

import Table, { ColumnProps } from "@core/antd/Table";
import { Title } from "@core/antd/Typography";
import NumberInput from "@core/components/NumberInput";
import LottieWebIcon from "@core/components/LottieWebIcon";
import LazyImage from "@core/components/LazyImage";
import RussianCurrency from "@core/components/RussianCurrency";

import { getPreviewPhotoSrc } from "@core/utils/photo";
import { GetLinkToProduct } from "@src/core/helpers/linkGenerator";

import { IUserCardProduct } from "../../State";
import { IProduct } from "@src/components/Product/State";
import { IDisplayInfo, ICardInfoTable } from "./ICardInfo";

import "../style/Table.style.scss";

export const cardProductToDisplay = (x: IUserCardProduct): IDisplayInfo => ({
  product: x.product,
  productId: x.product.productId,
  cost: x.product.price,
  count: x.count,
  totalCost: x.count * x.product.price,
});

// prettier-ignore
const getColumns = (
  changeCountOfProduct: (payload: IUserCardProduct) => void,
  removeProductFromCard: (payload: IProduct) => void
) => [
  {
    title: <Title>Корзина</Title>,
    dataIndex: "productId",
    key: "productId",
    render: (_: any, record: any) => (
      <div className="table-product-wrapper">
        <LazyImage
          className="product-img"
          src={getPreviewPhotoSrc(record.product)}
          alt={record.product.alias}
          visibleByDefault
        />
        <Link className="product-name" to={GetLinkToProduct(record.product)}>
          <span>{record.product.alias}</span>
        </Link>
      </div>
    )
  },
  {
    title: "Цена, шт",
    dataIndex: "cost",
    key: "cost",
    width: 110
  },
  {
    title: "Количество",
    dataIndex: "count",
    key: "count",
    width: 110,
    render: (_: any, record: any) => {
      const count = record.count.toString();

      return (
        <NumberInput
          className="product-count-input"
          value={count}
          onValueChange={(value) => {
            const newCardObject: IUserCardProduct = {
              count: Number.parseInt(value, 10) || 0,
              product: record.product
            };

            changeCountOfProduct(newCardObject);
          }}
          onBlur={() => {
            if (count === "0") {
              removeProductFromCard(record.product);
            }
          }}
        />
      );
    }
  },
  {
    title: "Сумма",
    dataIndex: "totalCost",
    key: "totalCost",
    width: 150,
    render: (totalCost: number) => (
      <span>
        {totalCost.toLocaleString()}
        <RussianCurrency />
      </span>
    )
  },
  {
    title: "Удалить",
    dataIndex: "operation",
    key: "operation",
    width: 90,
    render: (_: any, record: any) => (
      <LottieWebIcon
        type="remove"
        onClick={() => removeProductFromCard(record.product)}
      />
    )
  }
] as ColumnProps<IDisplayInfo>[];

// prettier-ignore
const rowKey = (record: IUserCardProduct) => `${record.product.categoryId}-${record.product.subcategoryId}-${record.product.productId}`;

const pagination = {
  defaultCurrent: 1,
  defaultPageSize: 6,
  hideOnSinglePage: true,
};

const scroll = {
  x: 799,
  y: "calc(100% - 88px)",
  scrollToFirstRowOnChange: true,
};

const getAdditionalClassName = (dataSource: IDisplayInfo[]) => {
  if (!dataSource || dataSource.length === 0) {
    return "empty-table";
  }

  return dataSource.length > 6 ? "with-pagination" : "without-pagination";
};

const CardInfoTable = (props: ICardInfoTable) => {
  const columns = getColumns(
    props.changeCountOfProduct,
    props.removeProductFromCard
  );

  const { dataSource } = props;

  const additionalClassName = getAdditionalClassName(dataSource);

  return (
    <div className={`card-info-table ${additionalClassName}`}>
      <Table
        dataSource={props.dataSource}
        columns={columns}
        rowKey={rowKey}
        pagination={pagination}
        scroll={scroll}
      />
    </div>
  );
};

export default CardInfoTable;
