import React from "react";

import { Title } from "@core/antd/Typography";
import LazyImage from "@core/components/LazyImage";
import GenerateLink from "@src/core/components/GenerateLink";
import NumberInput from "@core/components/NumberInput";
import LottieWebIcon from "@core/components/LottieWebIcon";
import RussianCurrency from "@core/components/RussianCurrency";

import { getPreviewPhotoSrc } from "@core/utils/photo";
import { getLinkToProduct } from "@src/core/helpers/linkGenerator";

import { IRecord, ITableRecord } from "./Model/ITableRecord";
import { IDisplayInfo } from "./Model/IDisplayInfo";
import { ColumnProps } from "@core/antd/Table";
import {
  IChangeCountOfProduct,
  IRemoveProductFromCard,
} from "./Model/ICardInfoTable";

// prettier-ignore
export const getColumns = <T extends IRecord>(
  changeCountOfProduct: IChangeCountOfProduct<T>,
  removeProductFromCard: IRemoveProductFromCard<T>
) => [
    {
      title: <Title>Корзина</Title>,
      dataIndex: "productId",
      key: "productId",
      render: (_: T, record: IDisplayInfo<T>) => (
        <div className="table-product-wrapper">
          <LazyImage
            className="product-img"
            src={getPreviewPhotoSrc(record.product)}
            alt={record.product.alias}
            visibleByDefault
          />
          <GenerateLink
            link={getLinkToProduct(record.product)}
            title={record.product.alias}
            linkClassName="product-name"
          />
        </div>
      ),
    } as ColumnProps<IDisplayInfo<T>>,
    {
      title: "Цена, шт",
      dataIndex: "cost",
      key: "cost",
      width: 110,
    },
    {
      title: "Количество",
      dataIndex: "count",
      key: "count",
      width: 110,
      render: (_: T, record: IDisplayInfo<T>) => {
        const count = record.count.toString();

        return (
          <NumberInput
            className="product-count-input"
            value={count}
            onValueChange={(value) => {
              const newCardObject: ITableRecord<T> = {
                count: Number.parseInt(value, 10) || 0,
                product: record.product,
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
      },
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
      ),
    },
    {
      title: "Удалить",
      dataIndex: "operation",
      key: "operation",
      width: 90,
      render: (_: any, record: IDisplayInfo<T>) => (
        <LottieWebIcon
          type="remove"
          onClick={() => removeProductFromCard(record.product)}
        />
      ),
    },
] as ColumnProps<IDisplayInfo<T>>[];
