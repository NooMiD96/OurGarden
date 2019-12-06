import * as React from "react";

import HeaderHelmet from "@core/components/Helmet";
import CatalogCardList from "@core/components/CatalogCardList";
import { NewsCard } from "@core/components/CatalogCardList/Cards/NewsCard";

import { getSEOMetaData } from "@core/utils/seoInformation";

import { TState } from "../TState";
import { INew } from "@components/News/State";

import "./style/NewsList.style.scss";

export class NewsList extends React.PureComponent<TState, {}> {
  constructor(props: TState) {
    super(props);

    if (!props.newsList.length) {
      props.getNewsList();
    }

    props.setBreadcrumb({
      breadcrumb: [
        {
          displayName: "Акции",
          url: "News",
          order: 1
        }
      ],
      key: "News"
    });
  }

  render() {
    const { newsList, push } = this.props;

    const dataList = newsList.map((news: INew) => ({
      ...news,
      link: `/News/${news.alias}`,
      photoUrl: news.photo && news.photo.url
    }));

    return (
      <div className="news-list-wrapper content">
        <HeaderHelmet {...getSEOMetaData("newsList")} />
        {dataList.length === 0 ? (
          <div className="content white-background grey-border p25">
            На данный момент никаких активных акций нет.
          </div>
        ) : (
          <CatalogCardList
            dataList={dataList}
            push={push}
            colClassName="grey-border"
            useCardGrid={false}
            paginationParams={{ page: 1, pageSize: 4 }}
            rowGutter={0}
            cardComponent={(props) => (
              <NewsCard
                item={props.item}
                push={props.push}
                onCardClick={props.onCardClick}
              />
            )}
          />
        )}
      </div>
    );
  }
}

export default NewsList;
