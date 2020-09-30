import React from "react";
import { fetch } from "domain-task";
import { connect } from "react-redux";

import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import Carousel from "@core/components/Carousel";

import { actionCreators } from "@src/components/ModalWindow/actions";

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

    const { galleryName, push, showPhotoModalWindow } = this.props;

    return (
      <React.Fragment>
        <Carousel
          className="gallery-carousel"
          dataSource={photos}
          getKey={(x) => x.photoId}
          getAlt={(_, index) => `${galleryName}_${index + 1}`}
          getTitle={(_, index) => `${galleryName}_${index + 1}`}
          // prettier-ignore
          getImageSrc={(x) => x.previewUrl || x.url}
          onClick={(x) => {
            showPhotoModalWindow(x, photos);
            push({ hash: `photo=${x.photoId}` });
            //
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect(null, {
  showPhotoModalWindow: actionCreators.showPhotoModalWindow,
})(WithRouterPush<IGalleryProps>(Gallery as any));
