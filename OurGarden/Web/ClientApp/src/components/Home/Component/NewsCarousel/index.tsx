import * as React from "react";
import { useNavigate } from "react-router-dom";

import Carousel from "@core/components/Carousel";

import { getPreviewPhotoSrc } from "@core/utils/photo";

import { INew } from "@components/News/State";

export interface INewsCarousel {
  displayList: INew[];
  ymId: number;
}
export const NewsCarousel = (props: INewsCarousel) => {
  const { displayList, ymId } = props;
  const navigate = useNavigate();

  return (
    <Carousel
      dataSource={displayList}
      getKey={(x) => x.newsId}
      getAlt={(x) => x.alias}
      getTitle={(x) => x.alias}
      getImageSrc={(x) => getPreviewPhotoSrc(x)}
      onClick={(x) => {
        window.ym(ymId, "reachGoal", "BANNER_MAIN_CLICK");
        navigate(`/News/${x.newsId}`);
      }}
    />
  );
};

export default NewsCarousel;
