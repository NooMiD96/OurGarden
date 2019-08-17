import * as React from "react";
import { push } from "connected-react-router";

import Carousel from "@core/antd/Carousel";

import { INew } from "@src/components/News/State";

export interface INewsCarousel {
  displayList: INew[];
  push: typeof push;
}

export class NewsCarousel extends React.PureComponent<INewsCarousel, {}> {
  caruselRef: Carousel | null = null;

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

    return (
      <React.Fragment>
        <Carousel autoplay effect="fade" ref={ref => (this.caruselRef = ref)}>
          {displayList.map(x => (
            <div
              key={x.newsId}
              className="slick-slide-content"
              onClick={() => {
                push(`/Акции/${x.alias}`);
              }}
              onKeyDown={() => {
                push(`/Акции/${x.alias}`);
              }}
              role="link"
            >
              <img
                className="slick-slide-content-image"
                alt={x.title}
                src={x.photo && x.photo.url}
              />
            </div>
          ))}
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

export default NewsCarousel;
