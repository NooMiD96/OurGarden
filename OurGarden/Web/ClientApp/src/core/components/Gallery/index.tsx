import React from "react";
import { fetch } from "domain-task";

import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import Carousel from "@core/antd/Carousel";
import { NextArrow, PrevArrow } from "@core/components/Carousel/Arrows";

import { IGalleryProps, IGalleryState } from "./interface/IGallery";
import { IPhoto } from "@src/core/interfaces/IPhoto";
import { IResponse } from "@src/core/fetchHelper/IResponse";

import "./style/Gallery.style.scss";

const controllerName = "Gallery";
const apiUrl = "GetGallery";
export class Gallery extends React.PureComponent<
  TWithRouter<IGalleryProps>,
  IGalleryState
> {
  caruselRef: Carousel | null = null;

  state: IGalleryState = {
    loading: false,
    photos: [],
  };

  async componentDidMount() {
    const { galleryName } = this.props;
    const encodedGalleryName = encodeURIComponent(this.props.galleryName);

    const fetchUrl = `/api/${controllerName}/${apiUrl}?galleryIdentify=${encodedGalleryName}`;
    const fetchProps: RequestInit = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    this.setState({
      loading: true,
    });

    try {
      const response: Response = await fetch(fetchUrl, fetchProps);
      if (!response.ok) {
        console.error(
          `Не удалось получить галерею ${galleryName}. Статус ${response.status}: ${response.statusText}`
        );

        this.setState({
          loading: false,
        });
        return;
      }
      const responseData: IResponse<
        IPhoto[] | undefined
      > = await response.json();

      this.setState({
        loading: false,
        photos: responseData.data || [],
      });
    } catch (error) {
      console.error(
        `Не удалось получить галерею ${galleryName}. Статус ${error}`
      );

      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, photos } = this.state;
    if (loading || !photos.length) {
      return <div />;
    }

    const { galleryName, push } = this.props;

    const carouselSource = photos.map((x: IPhoto, index: number) => (
      <img
        className="slick-slide-content-image"
        alt={`${galleryName}_${index + 1}`}
        title={`${galleryName}_${index + 1}`}
        src={x.url}
        key={x.photoId}
        onClick={() => {
          // push({ hash: "Gallery" });
        }}
        onKeyDown={() => {
          // push({ hash: "Gallery" });
        }}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="link"
      />
    ));

    return (
      <React.Fragment>
        <Carousel
          className="gallery-carousel"
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

export default WithRouterPush<IGalleryProps>(Gallery as any);
