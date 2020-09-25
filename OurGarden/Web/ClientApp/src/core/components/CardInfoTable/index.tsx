import React from "react";

import Table from "@core/antd/Table";

import * as consts from "@core/constants/cardInfoTable";
import * as utils from "./utils";
import { getColumns } from "./Columns";

import { ICardInfoTable } from "./Model/ICardInfoTable";
import { IRecord } from "./Model/ITableRecord";

import "./style/Table.style.scss";

const CardInfoTable = <T extends IRecord>(props: ICardInfoTable<T>) => {
  const columns = getColumns(
    props.changeCountOfProduct,
    props.removeProductFromCard
  );

  const { dataSource } = props;

  const additionalClassName = utils.getAdditionalClassName(dataSource);

  return (
    <div className={`card-info-table ${additionalClassName}`}>
      <Table
        dataSource={props.dataSource}
        columns={columns}
        rowKey={utils.getRowKey}
        pagination={consts.TABLE_PAGINATION}
        scroll={consts.TABLE_SCROLL}
      />
    </div>
  );
};

export default CardInfoTable;
