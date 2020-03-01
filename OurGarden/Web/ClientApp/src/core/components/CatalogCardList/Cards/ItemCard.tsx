import React from "react";
import { push as pushAction } from "connected-react-router";
import { Link } from "react-router-dom";

import Card from "@core/antd/Card";
import LazyImage from "@core/components/LazyImage";
import { Paragraph } from "@core/antd/Typography";

import { META_TITLE_PARAMS } from "@src/core/utils/CardList";

import { TDataItem } from "../ICatalogCard";

export interface IItemCardProps<T> {
  item: TDataItem<T>;
  push: typeof pushAction;
}

export type TItemCardReturn = JSX.Element;

export type TItemCard = <T>(props: IItemCardProps<T>) => TItemCardReturn;

/* eslint-disable react/prop-types */
export const ItemCard: TItemCard = ({ item, push }) => (
  <Card
    hoverable
    cover={<LazyImage alt={item.alias} src={item.photoUrl} />}
    onClick={() => {
      push(item.link);
    }}
  >
    <Card.Meta
      // prettier-ignore
      title={(
        <Paragraph ellipsis={META_TITLE_PARAMS}>
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            to={item.link}
          >
            {item.alias}
          </Link>
        </Paragraph>
      )}
    />
  </Card>
);
/* eslint-enable react/prop-types */

export default ItemCard;
