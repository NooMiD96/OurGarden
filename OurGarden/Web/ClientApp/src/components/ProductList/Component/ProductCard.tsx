import React, { useState } from "react";
import { connect } from "react-redux";
import { push as pushAction } from "connected-react-router";

import Card from "@core/antd/Card";
import AddToCard from "@core/components/AddToCard";
import LazyImage from "@core/components/LazyImage";
import { Paragraph } from "@src/core/antd/Typography";

import { actionsList } from "@components/UserCard/actions";
import { META_TITLE_PARAMS } from "@src/core/utils/CardList";

import { IProduct } from "@components/Product/State";
import { IMouseClickEvent } from "@core/IEvents";
import { TDataItem } from "@src/core/components/CatalogCardList/ICatalogCard";

export interface IProductCard {
  pending: boolean;
  item: TDataItem<IProduct>;
  push: typeof pushAction;
  addToCard: typeof actionsList.addProductToCard;
  onCardClick?: () => void;
}

const ProductCard = (props: IProductCard) => {
  const {
    pending, item, push, onCardClick
  } = props;
  const [itemCount, setItemCount] = useState("1");

  const addToCardFn = (e: IMouseClickEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setItemCount("1");

    props.addToCard({
      count: Number.parseInt(itemCount, 10),
      product: item
    });
  };

  const description = (
    <AddToCard
      itemCount={itemCount}
      setItemCount={setItemCount}
      product={item}
      addToCard={addToCardFn}
    />
  );

  const title = (
    <Paragraph
      ellipsis={META_TITLE_PARAMS}
    >
      {item.alias}
    </Paragraph>
  );

  return (
    <Card
      loading={pending}
      hoverable
      cover={
        <LazyImage alt={item.alias} src={item.photoUrl} />
      }
      onClick={() => {
        if (onCardClick) {
          onCardClick();
        }
        push(item.link);
      }}
    >
      <Card.Meta
        title={title}
        description={description}
      />
    </Card>
  );
};

export default connect(
  null,
  {
    addToCard: actionsList.addProductToCard
  }
)(ProductCard);
