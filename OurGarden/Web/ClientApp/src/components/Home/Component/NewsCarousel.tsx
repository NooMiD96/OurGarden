import * as React from "react";
import { push as pushAction } from "connected-react-router";

import Carousel from "@core/antd/Carousel";
import { NextArrow, PrevArrow } from "./Arrows";

import { INew } from "@src/components/News/State";

export interface INewsCarousel {
  displayList: INew[];
  push: typeof pushAction;
  ymId: number;
}

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

export class NewsCarousel extends React.PureComponent<
  INewsCarousel,
  { mount: boolean }
> {
  caruselRef: Carousel | null = null;

  state = {
    mount: false
  };

  componentDidMount() {
    this.setState({ mount: true });
  }

  render() {
    const { displayList, push, ymId } = this.props;

    if (!this.state.mount) {
      return <div />;
    }

    const carouselSource = displayList.map((x: INew) => (
      <img
        className="slick-slide-content-image"
        alt={x.title}
        src={x.photo && x.photo.url}
        key={x.newsId}
        onClick={() => {
          window.ym(ymId, "reachGoal", "BANNER_MAIN_CLICK");
          push(`/News/${x.alias}`);
        }}
        onKeyDown={() => {
          window.ym(ymId, "reachGoal", "BANNER_MAIN_CLICK");
          push(`/News/${x.alias}`);
        }}
        role="link"
      />
    ));

    return (
      <React.Fragment>
        <Carousel
          autoplay
          effect="fade"
          ref={(ref: Carousel | null) => {
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
        </Carousel>
      </React.Fragment>
    );
  }
}

/* eslint-enable jsx-a11y/interactive-supports-focus */

export default NewsCarousel;
