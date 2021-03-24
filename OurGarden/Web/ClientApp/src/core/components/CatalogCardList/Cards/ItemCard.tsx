import React from "react";

import Card from "@core/antd/Card";
import LazyImage from "@core/components/LazyImage";
import Paragraph from "@core/antd/Typography/Paragraph";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import GenerateLink from "@src/core/components/GenerateLink";

import { META_TITLE_PARAMS } from "@src/core/constants/cardList";

import { TDataItem } from "../ICatalogCard";

export interface IItemCardProps<T> {
  item: TDataItem<T>;
}

export type TItemCard = <T>(props: IItemCardProps<T>) => JSX.Element;

/* eslint-disable react/prop-types */
export const ItemCard: <T>(
  props: TWithRouter<IItemCardProps<T>>
) => JSX.Element = ({ item, push }) => (
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
          <GenerateLink
            onClick={(e) => {
              e.stopPropagation();
            }}
            link={item.link}
            title={item.alias}
          />
        </Paragraph>
      )}
    />
  </Card>
);
/* eslint-enable react/prop-types */

export default WithRouterPush<IItemCardProps<unknown>>(ItemCard as any);
