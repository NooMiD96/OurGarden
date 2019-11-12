import React from "react";

import Row from "@src/core/antd/Row";
import Col from "@src/core/antd/Col";
import Card from "@core/antd/Card";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";
import LazyImage from "@core/components/LazyImage";

import { cardStyle } from "./CardStyle";

import { ICatalogProps, ICatalogState, IDisplayItem } from "./ICatalogCard";
import { ISubcategory } from "@src/components/Subcategory/State";
import { ICategory } from "@src/components/Category/State";

import "./style/CatalogCard.style.scss";

export class Catalog extends React.PureComponent<ICatalogProps, ICatalogState> {
  constructor(props: ICatalogProps) {
    super(props);

    let displayList: IDisplayItem[] = [];
    if (props.dataList.length) {
      const item = props.dataList[0];

      if ((item as ISubcategory).subcategoryId) {
        displayList = (props.dataList as ISubcategory[]).map<IDisplayItem>(
          (x: ISubcategory) => ({
            link: `/Catalog/${x.categoryId}/${x.subcategoryId}`,
            alias: x.alias,
            photoUrl: x.photo ? x.photo.url : ""
          })
        );
      } else {
        displayList = (props.dataList as ICategory[]).map<IDisplayItem>(
          (x: ICategory) => ({
            link: `/Catalog/${x.categoryId}`,
            alias: x.alias,
            photoUrl: x.photo ? x.photo.url : ""
          })
        );
      }
    }

    this.state = {
      page: 1,
      pageSize: 6,
      displayList
    };
  }

  onChange = (page: number, pageSize: number = this.state.pageSize) => {
    this.setState({
      page,
      pageSize
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
          hideOnSinglePage
          total={displayList.length}
          onChange={this.onChange}
          showLessItems
        />
        <Row type="flex" gutter={16}>
          {displayList
            .slice((page - 1) * pageSize, page * pageSize)
            .map((x: IDisplayItem) => (
              <Col {...cardStyle} key={x.link} className="card-wrapper">
                <Card
                  hoverable
                  cover={<LazyImage alt={x.alias} src={x.photoUrl} />}
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
