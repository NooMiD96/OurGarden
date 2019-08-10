import * as React from "react";

import Alert from "@core/components/Alert";
import Carousel from "@core/antd/Carousel";
import Loading from "@src/core/components/Loading";

import HomeWrapper from "./style/Home.style";

import { TState, TComponentState } from "../TState";

export class Home extends React.PureComponent<TState, TComponentState> {
  caruselRef: Carousel | null = null;

  componentDidMount() {
    this.props.getNewsList();
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
    const { newsList, push, pending } = this.props;

    const displayList = newsList.slice(0, 3);

    return (
      <HomeWrapper className="content">
        {pending ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Carousel
              autoplay
              effect="fade"
              ref={ref => (this.caruselRef = ref)}
            >
              {displayList.map(x => (
                <div
                  key={x.newsId}
                  className="slick-slide-content"
                  onClick={() => {
                    push(`/Акции/${x.newsId}`);
                  }}
                  onKeyDown={() => {
                    push(`/Акции/${x.newsId}`);
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
        )}
      </HomeWrapper>
    );
  }
}

export default Home;
