import * as React from "react";

import AntdCarousel from "@core/antd/Carousel";
import { NextArrow, PrevArrow } from "@core/components/Carousel/Arrows";

import { MobileContext } from "@src/core/constants";

import { ICarouselProps } from "./interface/ICarousel";

import "./style/Carousel.style.scss";

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

export class Carousel<T> extends React.PureComponent<ICarouselProps<T>, {}> {
  caruselRef: AntdCarousel | null = null;

  render() {
    // prettier-ignore
    const {
      className,
      dataSourse,
      onClick,
      getAlt,
      getTitle,
      getKey,
      getImageSrc
    } = this.props;

    const carouselSource = dataSourse.map((x, index) => (
      <img
        key={getKey(x, index)}
        className="slick-slide-content-image"
        title={getTitle(x, index)}
        alt={getAlt(x, index)}
        src={getImageSrc(x, this.context)}
        onClick={(e) => onClick && onClick(x, e)}
        onKeyDown={(e) => onClick && onClick(x, e)}
        role="link"
      />
    ));

    let hideDotsClassName = "";
    if (dataSourse.length > 6) {
      hideDotsClassName = "hide-dots-on-mobile";
    }
    if (dataSourse.length > 23) {
      hideDotsClassName += " hide-dots";
    }

    return (
      <React.Fragment>
        <AntdCarousel
          className={`${className} ${hideDotsClassName}`}
          autoplay
          effect="fade"
          ref={(ref: AntdCarousel | null) => {
            this.caruselRef = ref;
          }}
          adaptiveHeight
          arrows
          draggable
          lazyLoad="progressive"
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          {carouselSource}
        </AntdCarousel>
      </React.Fragment>
    );
  }
}

Carousel.contextType = MobileContext;

/* eslint-enable jsx-a11y/interactive-supports-focus */

export default Carousel;
