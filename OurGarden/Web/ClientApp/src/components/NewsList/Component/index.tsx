import * as React from "react";

import CatalogCardList from "@core/components/CatalogCardList";
import { NewsCard } from "@core/components/CatalogCardList/Cards/NewsCard";

import { getPreviewPhotoSrc } from "@src/core/utils/photo";
import { getLinkToNews } from "@src/core/helpers/linkGenerator";

import { TState } from "../TState";
import { INew } from "@components/News/State";

import { WHITE_BLOCK } from "@src/core/constants";

import "./style/NewsList.style.scss";

export class NewsList extends React.PureComponent<TState, unknown> {
  constructor(props: TState) {
    super(props);

    if (!props.isDataWasGeted) {
      if (!props.newsList.length) {
        props.getNewsList();
      }

      props.setBreadcrumb({
        breadcrumb: [
          {
            displayName: "Акции",
            url: "News",
            order: 1,
          },
        ],
        key: "News",
      });
    }
  }

  render() {
    const {
      newsList,
      replace,
      location: { state: locationState },
    } = this.props;

    const dataList = newsList.map((news: INew) => ({
      ...news,
      link: getLinkToNews(news),
      photoUrl: getPreviewPhotoSrc(news),
    }));

    return (
      <div className="news-list-wrapper content">
        {dataList.length === 0 ? (
          <div className={`content ${WHITE_BLOCK} p25`}>
            На данный момент никаких активных акций нет.
          </div>
        ) : (
          <CatalogCardList
            dataList={dataList}
            colClassName="grey-border"
            useCardGrid={false}
            paginationParams={{ page: 1, pageSize: 4 }}
            rowGutter={0}
            cardTitleField="title"
            replace={replace}
            locationState={locationState}
            cardComponent={(props) => <NewsCard item={props.item} />}
          />
        )}
      </div>
    );
  }
}

export default NewsList;
