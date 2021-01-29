import React from "react";

import { Title } from "@core/antd/Typography";
import AddToCardButton from "@core/components/AddToCardButton";
import RussianCurrency from "@core/components/RussianCurrency";
import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { getPhotoSrc } from "@core/utils/photo";
import { getFormattedDescription } from "@src/core/helpers/description/DescriptionHelper";

import { IMouseClickEvent, IPressEnterEvent } from "@core/interfaces/IEvents";
import { IProductContentProps, IProductContentState } from "./IProductContent";

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role,jsx-a11y/interactive-supports-focus */

export class ProductContent extends React.PureComponent<
  IProductContentProps,
  IProductContentState
> {
  productWrapper: HTMLDivElement | null = null;

  onResizeHandlerTimer?: NodeJS.Timeout;

  constructor(props: IProductContentProps) {
    super(props);

    this.state = {
      itemCount: "1",
      showTitleBeforeProductPhoto: false,
      showTitleAfterProductPhoto: true,
      productImageClass: "max-width-30",
    };
  }

  componentDidMount() {
    if (window) {
      window.addEventListener("resize", this.onResizeHandler);
    }
    this.detectProductWrapperSize();
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("resize", this.onResizeHandler);
    }
  }

  onResizeHandler = () => {
    if (this.onResizeHandlerTimer) {
      clearTimeout(this.onResizeHandlerTimer);
    }

    this.onResizeHandlerTimer = setTimeout(this.detectProductWrapperSize, 250);
  };

  detectProductWrapperSize = () => {
    if (this.productWrapper) {
      const { width } = this.productWrapper.getBoundingClientRect();

      if (width <= 475) {
        this.setState({
          showTitleBeforeProductPhoto: true,
          showTitleAfterProductPhoto: false,
        });
      } else {
        this.setState({
          showTitleBeforeProductPhoto: false,
          showTitleAfterProductPhoto: true,
        });
      }
      this.setState({
        productImageClass: width >= 425 ? "max-width-30" : "",
      });
    }
  };

  setItemCount = (newCount: string) => {
    this.setState({
      itemCount: newCount,
    });
  };

  addToCard = (e?: IMouseClickEvent | IPressEnterEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const { ymId } = this.props;

    window.ym(ymId, "reachGoal", "CHECKOUT_CLICK");

    this.setState({
      itemCount: "1",
    });

    this.props.addProductToCard({
      count: Number.parseInt(this.state.itemCount, 10),
      product: this.props.product,
    });
  };

  openFeedbackModal = () => {
    this.props.showFeedbackModalWindow({
      product: this.props.product,
    });
  };

  render() {
    const { product, push, showPhotoModalWindow } = this.props;
    const {
      itemCount,
      showTitleBeforeProductPhoto,
      showTitleAfterProductPhoto,
      productImageClass,
    } = this.state;

    const productPhoto = getPhotoSrc(product);
    const description = getFormattedDescription(product.description);

    return (
      <React.Fragment>
        <div
          className="product-info"
          // eslint-disable-next-line no-return-assign
          ref={(x) => (this.productWrapper = x)}
        >
          {showTitleBeforeProductPhoto && (
            <Title className="title-before-product-photo">
              {product.alias}
            </Title>
          )}

          {productPhoto && (
            <img
              src={productPhoto}
              alt={product.alias}
              className={`product-photo ${productImageClass} ${
                showTitleBeforeProductPhoto ? "w-100" : ""
              }`}
              onClick={() => {
                showPhotoModalWindow(product.photos[0], product.photos);
                push({ hash: `photo=${product.photos[0].photoId}` });
              }}
              onKeyDown={() => {
                showPhotoModalWindow(product.photos[0], product.photos);
                push({ hash: `photo=${product.photos[0].photoId}` });
              }}
              role="button"
            />
          )}

          {showTitleAfterProductPhoto && (
            <Title className="title-after-product-photo">{product.alias}</Title>
          )}

          <span className="product-cost">
            {product.price ? (
              <>
                {`${product.price.toLocaleString()}`}
                <RussianCurrency />
              </>
            ) : (
              "Под заказ"
            )}
          </span>
          <span className="product-description">Описание</span>
        </div>

        <DescriptionWrapper
          description={description}
          wrapperClassName="wysiwyg-description"
        />

        {product.price ? (
          <AddToCardButton
            itemCount={itemCount}
            setItemCount={this.setItemCount}
            addToCard={this.addToCard}
          />
        ) : (
          <span
            className="empty-cost-hint cursor-pointer"
            onClick={this.openFeedbackModal}
            onKeyDown={this.openFeedbackModal}
            role="button"
          >
            Свяжитесь с нами для уточнения цены
          </span>
        )}
      </React.Fragment>
    );
  }
}

/* eslint-enable jsx-a11y/interactive-supports-focus */

export default ProductContent;
