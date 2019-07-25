import React from "react";

import ProductWrapper from "./style/Product.style";
import Loading from "@src/core/components/Loading";

import { TState, TComponentState } from "../TState";
import { Row } from "@src/core/antd";
import { Title } from "@src/core/antd/Typography";
import AddToCardButton from "@src/core/components/AddToCardButton";
import { IMouseClickEvent } from "@src/core/IEvents";

const contentMoq = `<span>
Blanditiis et dolores tempora aut. At amet quia cupiditate natus
pariatur eum. Omnis eum quia vel doloribus eveniet. Quia officiis
nesciunt quasi tenetur. Ipsa aut ab et quae eum. Reiciendis qui at
sit. Quia atque temporibus modi et aut aliquam recusandae. Ducimus
dignissimos nulla laudantium magnam ut repellendus cumque iusto.
Qui vero ut ipsam voluptas molestiae error iusto eius. Fugit
maxime numquam libero tenetur voluptatem velit. Consequatur vitae
ipsa ut assumenda sunt incidunt. Dolor nam ab. Et hic sed
recusandae veniam voluptas deleniti non. Modi neque ad quo est
eligendi non labore rerum. Reprehenderit voluptas in et corporis
enim necessitatibus quibusdam veniam minus.temporibus-qui-estSint
occaecati culpa excepturi magnam fugit explicabo. Enim aliquam
omnis in fugiat laudantium velit vel. Esse explicabo sit quidem
praesentium. At ut laboriosam rerum dolores in iure. Nobis nulla
nostrum velit dolore quaerat. Tempore voluptates perferendis aut
distinctio modi voluptatibus. Nihil libero sunt itaque quos
impedit porro. Dolor maxime tempora est. Temporibus consequatur
fugiat dignissimos atque itaque placeat. Totam porro sint. Qui est
et aut quia nemo adipisci. Esse inventore enim autem. Ex inventore
quasi quis quia nihil autem ea. Impedit perspiciatis aliquid autem
consectetur illum quibusdam officia officia soluta. Perferendis
labore iste sit.
</span>`;

export class Product extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    itemCount: "1"
  };

  componentDidMount() {
    const {
      getProduct,
      match: {
        params: { categoty, subcategory, product }
      }
    } = this.props;

    getProduct(categoty, subcategory, product);
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getProduct,
      match: {
        params: { categoty, subcategory, product }
      }
    } = this.props;

    if (prevProps.match.params !== this.props.match.params) {
      getProduct(categoty, subcategory, product);
    }
  }

  setItemCount = (newCount: string) => {
    this.setState({
      itemCount: newCount
    });
  };

  addToCard = (e: IMouseClickEvent) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      itemCount: "1"
    });

    this.props.addProductToCard({
      count: Number.parseInt(this.state.itemCount),
      product: this.props.product!
    });
  };

  render() {
    const { product, pending } = this.props;
    const { itemCount } = this.state;

    return (
      <ProductWrapper>
        {pending || !product ? (
          <Loading />
        ) : (
          <Row>
            <img
              src={product.photos && product.photos[0].url}
              alt={product.alias}
              className="product-photo"
            />

            <div className="product-info">
              <Title>{product.alias}</Title>
              <span className="product-cost">
                {product.price.toLocaleString()}
                р.
              </span>
              <span className="product-description">Описание</span>
            </div>

            <div
              className="product-description-wysiwyg"
              dangerouslySetInnerHTML={{ __html: contentMoq }}
            />

            <AddToCardButton
              itemCount={itemCount}
              setItemCount={this.setItemCount}
              addToCard={this.addToCard}
            />
          </Row>
        )}
      </ProductWrapper>
    );
  }
}

export default Product;
