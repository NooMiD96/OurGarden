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
                <div className="slick-slide-content" key={x.id}>
                  <div
                    className="slick-slide-content-image"
                    style={{
                      background: `center / contain no-repeat url(${x.photo})`
                    }}
                  />
                </div>
              ))}
            </Carousel>
            <span
              className="carousel-slide-changer carousel-prev-slide"
              onClick={this.prevSlide}
              onKeyDown={this.prevSlide}
              role="button"
              tabIndex={-1}
            >
              prev
            </span>
            <span
              className="carousel-slide-changer carousel-next-slide"
              onClick={this.nextSlide}
              onKeyDown={this.nextSlide}
              role="button"
              tabIndex={-1}
            >
              next
            </span>
          </React.Fragment>
        )}
      </HomeWrapper>
    );
  }
}
