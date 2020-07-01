import * as React from "react";

import Card from "@core/antd/Card";
import { Title } from "@core/antd/Typography";
import LazyImage from "@core/components/LazyImage";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import GenerateLink from "../../GenerateLink";

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
          <GenerateLink
            onClick={(e) => {
              e.stopPropagation();
            }}
            link={item.link}
            title={item.alias}
          />
        </Title>
      )}
    />
  </Card>
);

export const NewsCard = WithRouterPush<INewsCard>(NewsCardWithoutRouter as any);
