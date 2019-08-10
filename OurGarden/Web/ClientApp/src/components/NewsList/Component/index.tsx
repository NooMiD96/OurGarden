import * as React from "react";

import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Card from "@core/antd/Card";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";
import Loading from "@src/core/components/Loading";

import NewsListWrapper from "./style/NewsList.style";

import { TState, TComponentState } from "../TState";
import { Title } from "@src/core/antd/Typography";

export class NewsList extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    page: 1,
    pageSize: 6
  };

  componentDidMount() {
    if (!this.props.newsList.length) {
      this.props.getNewsList();
    }
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

    const dataList = newsList
      .map(x => ({
        ...x,
        link: `/Акции/${x.newsId}`
      }))
      .slice((page - 1) * pageSize, page * pageSize);

    return (
      <NewsListWrapper className="content white-background">
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
              {dataList.slice((page - 1) * pageSize, page * pageSize).map(x => (
                <Col key={x.link} className="card-wrapper">
                  <Card
                    loading={pending}
                    hoverable
                    style={{ width: "100%" }}
                    cover={<img alt={x.title} src={x.photo && x.photo.url} />}
                    onClick={() => {
                      push(x.link);
                    }}
                  >
                    <Card.Meta title={<Title level={2}>{x.title}</Title>} />
                  </Card>
                </Col>
              ))}
            </Row>
          </React.Fragment>
        )}
      </NewsListWrapper>
    );
  }
}

export default NewsList;
