import * as React from "react";

import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";
import Loading from "@src/core/components/Loading";
import { NewsCard } from "@src/core/components/NewsCard";

import { TState, TComponentState } from "../TState";

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
  }

  onChange = (page: number, pageSize: number = this.state.pageSize) => {
    this.setState({
      page: page,
      pageSize: pageSize
    });
  };

  render() {
    const { newsList, pending, push } = this.props;
    const { page, pageSize } = this.state;

    const dataList = newsList.map(x => ({
      ...x,
      link: `/Акции/${x.alias}`
    }));

    return (
      <div className="content news-list-wrapper">
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
            <Row type="flex" className="white-background">
              {dataList
                .slice((page - 1) * pageSize, page * pageSize)
                .map(item => (
                  <Col key={item.link} className="card-wrapper">
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
