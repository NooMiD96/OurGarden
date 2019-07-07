import * as React from "react";

import { TState, TComponentState } from "@components/Home/TState";
import Alert from "@core/components/Alert";
import Carousel from "@core/antd/Carousel";
import Loading from "@src/core/components/Loading";

import HomeWrapper from "./style/Home.style";

export class Home extends React.PureComponent<TState, TComponentState> {
  componentDidMount() {
    this.props.getNewsList();
  }

  render() {
    const {
      newsList,
      errorInner,
      cleanErrorInner,
      pending
    } = this.props;

    return (
      <HomeWrapper>
        {
          errorInner && (
            <Alert
              message="Ошибка"
              description={errorInner}
              type="error"
              closable
              style={{ marginBottom: 10 }}
              onClose={cleanErrorInner}
            />
          )
        }
        {
          pending && <Loading />
        }
        <Carousel
          autoplay
          effect="fade"
        >
          {
            newsList.map(x => (
              <div className="slick-slide-content" key={x.id}>
                <div
                  className="slick-slide-content-image"
                  style={{background: `center / contain no-repeat url(${x.photo})`}}
                >
                  {x.description}
                </div>
              </div>
            ))
          }
        </Carousel>
      </HomeWrapper>
    );
  }
}
