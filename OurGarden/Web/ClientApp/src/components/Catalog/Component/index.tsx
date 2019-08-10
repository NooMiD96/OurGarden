import React from "react";

import Row from "@src/core/antd/Row";
import Col from "@src/core/antd/Col";
import Card from "@core/antd/Card";
import Loading from "@core/components/Loading";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";

import Wrapper from "./style/Catalog.style";

import { TState, TComponentState } from "../TState";

export class Catalog extends React.PureComponent<TState, TComponentState> {
  cardStyle = {
    // xs	<576px
    xs: { span: 24 },
    // sm	≥576px
    sm: { span: 24 },
    // md	≥768px
    // md: { span: 24 },
    // lg	≥992px
    lg: { span: 12 },
    // xl	≥1200px
    xl: { span: 8 }
    // xxl	≥1600px
    // xxl: { span: 8 }
  };

  state: TComponentState = {
    page: 1,
    pageSize: 6
  };

  componentDidMount() {
    const {
      match: { params },
      getSubcategoryList,
      cleanSubcategoryList
    } = this.props;

    if (params.categoty) {
      getSubcategoryList(params.categoty);
    } else {
      cleanSubcategoryList();
    }
  }

  componentDidUpdate(prevProps: TState) {
    const {
      match: {
        params: { categoty: currentCategory }
      },
      subcategoryList,
      getSubcategoryList,
      cleanSubcategoryList
    } = this.props;

    if (!currentCategory && subcategoryList.length) {
      cleanSubcategoryList();
    } else if (prevProps.match.params.categoty !== currentCategory) {
      getSubcategoryList(currentCategory);
    }
  }

  componentWillUnmount() {
    this.props.cleanSubcategoryList();
  }

  onChange = (page: number, pageSize: number = this.state.pageSize) => {
    this.setState({
      page: page,
      pageSize: pageSize
    });
  };

  render() {
    const { categoryList, subcategoryList, pending } = this.props;
    const { page, pageSize } = this.state;

    const dataList = subcategoryList.length
      ? subcategoryList.map(x => ({
          ...x,
          link: `/Каталог/${x.categoryId}/${x.subcategoryId}`
        }))
      : categoryList.map(x => ({
          ...x,
          link: `/Каталог/${x.categoryId}`
        }));

    return (
      <Wrapper className="content">
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
            <Row type="flex" gutter={16}>
              {dataList.slice((page - 1) * pageSize, page * pageSize).map(x => (
                <Col {...this.cardStyle} key={x.link} className="card-wrapper">
                  <Card
                    hoverable
                    cover={<img alt={x.alias} src={x.photo && x.photo.url} />}
                    onClick={() => {
                      this.setState({
                        page: 1
                      });
                      this.props.push(x.link);
                    }}
                  >
                    <Card.Meta title={x.alias} />
                  </Card>
                </Col>
              ))}
            </Row>
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

export default Catalog;
