import * as React from "react";
import { push } from "connected-react-router";

import Carousel from "@core/antd/Carousel";

import { INew } from "@src/components/News/State";

export interface INewsCarousel {
  displayList: INew[];
  push: typeof push;
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
    setTimeout(() => {
      this.setState({ mount: true });
    }, 0);
  }

  prevSlide = () => {
    this.callSlideChange("prev");
  };

  nextSlide = () => {
    this.callSlideChange("next");
  };

  callSlideChange = (slideChangeFuncName: "next" | "prev") => {
    if (this.caruselRef) {
      this.caruselRef[slideChangeFuncName]();
    }
  };

  render() {
    const { displayList, push } = this.props;

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
          push(`/News/${x.alias}`);
        }}
        onKeyDown={() => {
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
          draggable
          lazyLoad="progressive"
        >
          {carouselSource}
        </Carousel>
        <div
          className="carousel-slide-changer carousel-slide-prev"
          onClick={this.prevSlide}
          onKeyDown={this.prevSlide}
          role="button"
          tabIndex={-1}
        >
          <span className="carousel-slide" />
        </div>
        <div
          className="carousel-slide-changer carousel-slide-next"
          onClick={this.nextSlide}
          onKeyDown={this.nextSlide}
          role="button"
          tabIndex={-1}
        >
          <span className="carousel-slide" />
        </div>
      </React.Fragment>
    );
  }
}

/* eslint-enable jsx-a11y/interactive-supports-focus */

export default NewsCarousel;
