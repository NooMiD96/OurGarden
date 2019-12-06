import React from "react";

import Row from "@src/core/antd/Row";
import Col from "@src/core/antd/Col";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";
import ItemCard from "./Cards/ItemCard";

import { PAGING_DEFAULT_PARAMS, CARD_GRID_STYLE } from "@core/utils/CardList";

import {
  ICatalogProps,
  ICatalogState,
  TDataItem,
  ICardComponent
} from "./ICatalogCard";

import "./style/CatalogCard.style.scss";

export class Catalog<T> extends React.PureComponent<
  ICatalogProps<T>,
  ICatalogState<T>
> {
  constructor(props: ICatalogProps<T>) {
    super(props);

    this.state = {
      ...(props.paginationParams || PAGING_DEFAULT_PARAMS)
    };
  }

  onPageChange = (page: number, pageSize: number = this.state.pageSize) => {
    this.setState({
      page,
      pageSize
    });
  };

  getItemToDisplay = (item: TDataItem<T>) => {
    const {
      push,
      useCardGrid = true,
      colClassName,
      cardComponent = (props: ICardComponent<T>) => (
        <ItemCard
          item={props.item}
          push={props.push}
          onCardClick={props.onCardClick}
        />
      )
    } = this.props;

    const cardGrid = useCardGrid ? CARD_GRID_STYLE : {};

    return (
      <Col
        key={item.link}
        className={`card-wrapper ${colClassName || ""}`}
        title={item.alias}
        {...cardGrid}
      >
        {cardComponent({
          item,
          push,
          onCardClick: () => this.onPageChange(1)
        })}
      </Col>
    );
  };

  render() {
    const { dataList, rowGutter = 16 } = this.props;
    const { page, pageSize } = this.state;

    const itemsToDisplay = dataList
      .slice((page - 1) * pageSize, page * pageSize)
      .map(this.getItemToDisplay);

    return (
      <div className="catalog-card-list content">
        <Pagination
          current={page}
          itemRender={PaginationItemRenderer}
          defaultCurrent={page}
          defaultPageSize={pageSize}
          hideOnSinglePage
          total={dataList.length}
          onChange={this.onPageChange}
          showLessItems
        />
        <Row type="flex" gutter={rowGutter}>
          {itemsToDisplay}
        </Row>
      </div>
    );
  }
}

export default Catalog;
