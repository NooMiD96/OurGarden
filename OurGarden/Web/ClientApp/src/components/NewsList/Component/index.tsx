import * as React from "react";

import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";
import Loading from "@src/core/components/Loading";
import HeaderHelmet from "@src/core/components/Helmet";
import { NewsCard } from "./NewsCard";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

import { TState, TComponentState } from "../TState";
import { INew } from "@src/components/News/State";

import "./style/NewsList.style.scss";

export class NewsList extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.newsList.length) {
      props.getNewsList();
    }

    this.state = {
      page: 1,
      pageSize: 4
    };

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

  onChange = (page: number, pageSize: number = this.state.pageSize) => {
    this.setState({
      page,
      pageSize
    });
  };

  render() {
    const { newsList, pending, push } = this.props;
    const { page, pageSize } = this.state;

    const dataList = newsList.map((news: INew) => ({
      ...news,
      link: `/News/${news.alias}`
    }));

    return (
      <div className="content news-list-wrapper">
        <HeaderHelmet {...getSEOMetaData("newsList")} />
        {dataList.length === 0 && (
          <div className="content white-background grey-border p25">
            На данный момент никаких активных акций нет.
          </div>
        )}
        {pending ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Pagination
              current={page}
              itemRender={PaginationItemRenderer}
              defaultCurrent={page}
              defaultPageSize={pageSize}
              showTitle={false}
              hideOnSinglePage
              total={dataList.length}
              onChange={this.onChange}
            />
            <Row type="flex">
              {dataList
                .slice((page - 1) * pageSize, page * pageSize)
                .map((item: INew & { link: string }) => (
                  <Col key={item.link} className="card-wrapper grey-border">
                    <NewsCard item={item} push={push} pending={pending} />
                  </Col>
                ))}
            </Row>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default NewsList;
