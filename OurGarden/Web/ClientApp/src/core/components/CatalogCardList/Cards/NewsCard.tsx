import * as React from "react";
import { Link } from "react-router-dom";

import Card from "@core/antd/Card";
import { Title } from "@core/antd/Typography";
import LazyImage from "@core/components/LazyImage";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";

import { INew } from "@components/News/State";

interface INewsCard {
  item: INew & { link: string; photoUrl: string };
}

const NewsCardWithoutRouter = ({ item, push }: TWithRouter<INewsCard>) => (
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
        <Title level={2}>
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            to={item.link}
          >
            {item.alias}
          </Link>
        </Title>
      )}
    />
  </Card>
);

export const NewsCard = WithRouterPush<INewsCard>(NewsCardWithoutRouter as any);
