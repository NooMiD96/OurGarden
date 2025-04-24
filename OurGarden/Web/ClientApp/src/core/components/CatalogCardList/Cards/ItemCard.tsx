import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import Card from "@core/antd/Card";
import LazyImage from "@core/components/LazyImage";
import Paragraph from "@core/antd/Typography/Paragraph";
import GenerateLink from "@src/core/components/GenerateLink";

import { META_TITLE_PARAMS } from "@src/core/constants/cardList";

import { TDataItem } from "../ICatalogCard";

export interface IItemCardProps<T> {
  item: TDataItem<T>;
  navigate: NavigateFunction;
}

export type TItemCard = <T>(props: IItemCardProps<T>) => JSX.Element;

export const ItemCard: <T>(props: IItemCardProps<T>) => JSX.Element = ({
  item,
  navigate,
}) => (
  <Card
    hoverable
    cover={<LazyImage alt={item.alias} src={item.photoUrl} />}
    onClick={() => {
      navigate(item.link);
    }}
  >
    <Card.Meta
      title={
        <Paragraph ellipsis={META_TITLE_PARAMS}>
          <GenerateLink
            onClick={(e) => {
              e.stopPropagation();
            }}
            link={item.link}
            title={item.alias}
          />
        </Paragraph>
      }
    />
  </Card>
);

export default (props: any) => <ItemCard {...props} navigate={useNavigate()} />;
