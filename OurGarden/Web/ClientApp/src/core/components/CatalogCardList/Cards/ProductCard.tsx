import React, { useState } from "react";
import { connect } from "react-redux";
import { push as pushAction } from "connected-react-router";
import { Link } from "react-router-dom";

import Card from "@core/antd/Card";
import AddToCard from "@core/components/AddToCard";
import LazyImage from "@core/components/LazyImage";
import { Paragraph } from "@core/antd/Typography";

import { actionsList } from "@components/UserCard/actions";
import { META_TITLE_PARAMS } from "@core/utils/CardList";

import { IProduct } from "@components/Product/State";
import { IMouseClickEvent } from "@core/IEvents";
import { TDataItem } from "@core/components/CatalogCardList/ICatalogCard";

export interface IProductCard {
  item: TDataItem<IProduct>;
  push: typeof pushAction;
  addToCard: typeof actionsList.addProductToCard;
  onCardClick?: () => void;
}

const ProductCard = (props: IProductCard) => {
  const { item, push, onCardClick } = props;
  const [itemCount, setItemCount] = useState("1");

  const addToCardHandler = (e: IMouseClickEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setItemCount("1");

    props.addToCard({
      count: Number.parseInt(itemCount, 10),
      product: item
    });
  };

  return (
    <Card
      hoverable
      cover={<LazyImage alt={item.alias} src={item.photoUrl} />}
      onClick={() => {
        if (onCardClick) {
          onCardClick();
        }
        push(item.link);
      }}
    >
      <Card.Meta
        // prettier-ignore
        title={(
          <Paragraph ellipsis={META_TITLE_PARAMS}>
            <Link to={item.link}>{item.alias}</Link>
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

export default connect(null, {
  addToCard: actionsList.addProductToCard
})(ProductCard);
