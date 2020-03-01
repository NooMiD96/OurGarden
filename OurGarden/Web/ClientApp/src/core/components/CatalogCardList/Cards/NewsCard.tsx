import * as React from "react";
import { push as pushAction } from "connected-react-router";
import { Link } from "react-router-dom";

import Card from "@core/antd/Card";
import { Title } from "@core/antd/Typography";
import LazyImage from "@core/components/LazyImage";

import { INew } from "@components/News/State";

interface INewsCard {
  item: INew & { link: string; photoUrl: string };
  push: typeof pushAction;
}

export const NewsCard = ({ item, push }: INewsCard) => (
  <Card
    hoverable
    cover={<LazyImage alt={item.title} src={item.photoUrl} />}
    onClick={() => {
      push(item.link);
    }}
  >
    <Card.Meta
      // prettier-ignore
      title={(
        <Title level={2}>
          <Link to={item.link}>{item.title}</Link>
        </Title>
      )}
    />
  </Card>
);
