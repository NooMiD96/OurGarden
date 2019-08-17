import React from "react";
import { push } from "connected-react-router";

import Card from "@core/antd/Card";
import { Title } from "@src/core/antd/Typography";

import { INew } from "@src/components/News/State";

interface INewsCard {
  item: INew & { link: string };
  pending: boolean;
  push: typeof push;
}

export const NewsCard = ({ item, pending, push }: INewsCard) => {
  return (
    <Card
      loading={pending}
      hoverable
      style={{ width: "100%" }}
      cover={<img alt={item.title} src={item.photo && item.photo.url} />}
      onClick={() => {
        push(item.link);
      }}
    >
      <Card.Meta title={<Title level={2}>{item.title}</Title>} />
    </Card>
  );
};
