import * as React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import Card from "@core/antd/Card";
import Title from "@core/antd/Typography/Title";
import LazyImage from "@core/components/LazyImage";
import GenerateLink from "../../GenerateLink";

import { INew } from "@components/News/State";

interface INewsCard {
  item: INew & { link: string; photoUrl: string };
  navigate: NavigateFunction;
}

const NewsCardWithoutRouter = ({ item, navigate }: INewsCard) => (
  <Card
    hoverable
    cover={<LazyImage alt={item.alias} src={item.photoUrl} />}
    onClick={() => {
      navigate(item.link);
    }}
  >
    <Card.Meta
      title={
        <Title level={2}>
          <GenerateLink
            onClick={(e) => {
              e.stopPropagation();
            }}
            link={item.link}
            title={item.alias}
          />
        </Title>
      }
    />
  </Card>
);

export const NewsCard = (props: any) => (
  <NewsCardWithoutRouter {...props} navigate={useNavigate()} />
);
