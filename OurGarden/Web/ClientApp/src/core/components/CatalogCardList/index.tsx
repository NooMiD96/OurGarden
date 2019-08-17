import React from "react";

import Row from "@src/core/antd/Row";
import Col from "@src/core/antd/Col";
import Card from "@core/antd/Card";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";

import { ICatalogProps, ICatalogState, IDisplayItem } from "./ICatalogCard";
import { ISubcategory } from "@src/components/Subcategory/State";
import { ICategory } from "@src/components/Category/State";

import "./style/CatalogCard.style.scss";

export class Catalog extends React.PureComponent<ICatalogProps, ICatalogState> {
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

  constructor(props: ICatalogProps) {
    super(props);

    let displayList: IDisplayItem[] = [];
    if (props.dataList.length) {
      const item = props.dataList[0];

      displayList = (item as ISubcategory).subcategoryId
        ? (props.dataList as ISubcategory[]).map<IDisplayItem>(x => ({
            link: `/Каталог/${x.categoryId}/${x.subcategoryId}`,
            alias: x.alias,
            photoUrl: x.photo ? x.photo.url : ""
          }))
        : (props.dataList as ICategory[]).map<IDisplayItem>(x => ({
            link: `/Каталог/${x.categoryId}`,
            alias: x.alias,
            photoUrl: x.photo ? x.photo.url : ""
          }));
    }

    this.state = {
      page: 1,
      pageSize: 6,
      displayList
    };
  }

  onChange = (page: number, pageSize: number = this.state.pageSize) => {
    this.setState({
      page: page,
      pageSize: pageSize
    });
  };

  render() {
    const { page, pageSize, displayList } = this.state;

    return (
      <div className="catalog-card-list content">
        <Pagination
          current={page}
          itemRender={PaginationItemRenderer}
          defaultCurrent={page}
          defaultPageSize={pageSize}
          // showTitle={false}
          hideOnSinglePage
          total={displayList.length}
          onChange={this.onChange}
        />
        <Row type="flex" gutter={16}>
          {displayList.slice((page - 1) * pageSize, page * pageSize).map(x => (
            <Col {...this.cardStyle} key={x.link} className="card-wrapper">
              <Card
                hoverable
                cover={<img alt={x.alias} src={x.photoUrl} />}
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
      </div>
    );
  }
}

export default Catalog;
