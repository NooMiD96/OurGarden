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
    const { newsList, errorInner, cleanErrorInner, pending } = this.props;

    return (
      <HomeWrapper>
        {errorInner && (
          <Alert
            message="Ошибка"
            description={errorInner}
            type="error"
            closable
            style={{ marginBottom: 10 }}
            onClose={cleanErrorInner}
          />
        )}
        {pending ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Carousel
              autoplay
              effect="fade"
              ref={ref => (this.caruselRef = ref)}
            >
              {newsList.map(x => (
                <div className="slick-slide-content" key={x.newsId}>
                  <div
                    className="slick-slide-content-image"
                    style={{
                      background: `center / contain no-repeat url(${x.photo
                        && x.photo.url})`
                    }}
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
