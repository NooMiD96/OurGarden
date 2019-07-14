import * as React from "react";
import { Location } from "history";

import Menu from "@core/antd/Menu";

import { ICategory } from "../State";
import { getActiveCategory } from "@src/core/helpers/route/getActiveRoute";

const CategoryList = ({
  categoryList,
  location
}: {
  categoryList: ICategory[];
  location: Location<any>;
}) => {
  const activeKey = getActiveCategory(
    categoryList,
    location
  );
  
  return (
    <Menu selectedKeys={[activeKey]} mode="inline">
      {
        categoryList.map(x => (
          <Menu.Item key={x.categoryId}>
            <span>{x.alias}</span>
          </Menu.Item>
        ))
      }
    </Menu>
  )
};

export default CategoryList;
