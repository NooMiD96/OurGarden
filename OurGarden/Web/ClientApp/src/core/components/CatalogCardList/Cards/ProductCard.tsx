import React, { useState } from "react";
import { connect } from "react-redux";

import Card from "@core/antd/Card";
import AddToCard from "@core/components/AddToCard";
import LazyImage from "@core/components/LazyImage";
import Paragraph from "@core/antd/Typography/Paragraph";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import GenerateLink from "../../GenerateLink";

import { actionsList } from "@components/UserCard/actions";
import { META_TITLE_PARAMS } from "@src/core/constants/cardList";

import { IProduct } from "@components/Product/State";
import { IMouseClickEvent, IPressEnterEvent } from "@core/interfaces/IEvents";
import { TDataItem } from "@core/components/CatalogCardList/ICatalogCard";

export interface IProductCardProps {
  item: TDataItem<IProduct>;
  ymId: number;
}

export interface IProductCard extends IProductCardProps {
  addToCard: typeof actionsList.addProductToCard;
}

const ProductCard = (props: TWithRouter<IProductCard>) => {
  const { item, push, ymId } = props;
  const [itemCount, setItemCount] = useState("1");

  const addToCardHandler = (e?: IMouseClickEvent | IPressEnterEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    window.ym(ymId, "reachGoal", "CHECKOUT_CLICK");

    setItemCount("1");

    props.addToCard({
      count: Number.parseInt(itemCount, 10),
      product: item,
    });
  };

  return (
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
        // prettier-ignore
        description={(
          <AddToCard
            itemCount={itemCount}
            setItemCount={setItemCount}
            product={item}
            addToCard={addToCardHandler}
          />
        )}
      />
    </Card>
  );
};

export default WithRouterPush<IProductCardProps>(
  connect(null, {
    addToCard: actionsList.addProductToCard,
  })(ProductCard) as any
);
