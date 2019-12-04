import * as React from "react";
import { push as pushAction } from "connected-react-router";

import Card from "@core/antd/Card";
import { Title } from "@src/core/antd/Typography";
import LazyImage from "@core/components/LazyImage";

import { INew } from "@src/components/News/State";

interface INewsCard {
  item: INew & { link: string };
  pending: boolean;
  push: typeof pushAction;
  onCardClick?: () => void;
}

export const NewsCard = ({
  item, pending, push, onCardClick
}: INewsCard) => (
  <Card
    loading={pending}
    hoverable
    cover={<LazyImage alt={item.title} src={item.photo && item.photo.url} />}
    onClick={() => {
      if (onCardClick) {
        onCardClick();
      }
      push(item.link);
    }}
  >
    <Card.Meta title={<Title level={2}>{item.title}</Title>} />
  </Card>
);
