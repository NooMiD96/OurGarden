import React from "react";
import { push as pushAction } from "connected-react-router";

import Card from "@core/antd/Card";
import LazyImage from "@core/components/LazyImage";
import { Paragraph } from "@core/antd/Typography";

import { META_TITLE_PARAMS } from "@src/core/utils/CardList";

import { TDataItem } from "./ICatalogCard";

export interface IItemCardProps<T> {
  item: TDataItem<T>;
  onCardClick?: () => void;
  push: typeof pushAction;
}

export type TItemCardReturn = JSX.Element;

export type TItemCard = <T>(props: IItemCardProps<T>) => TItemCardReturn;

/* eslint-disable react/prop-types */
export const ItemCard: TItemCard = ({ item, onCardClick, push }) => (
  <Card
    hoverable
    cover={<LazyImage alt={item.alias} src={item.photoUrl} />}
    onClick={() => {
      if (onCardClick) {
        onCardClick();
      }
      push(item.link);
    }}
  >
    <Card.Meta
      title={(
        <Paragraph
          ellipsis={META_TITLE_PARAMS}
        >
          {item.alias}
        </Paragraph>
      )}
    />
  </Card>
);
/* eslint-enable react/prop-types */

export default ItemCard;
