import * as React from "react";
import { Location } from "history";

import Menu from "@core/antd/Menu";

import { ICategory } from "@src/components/Category/State";

import { getActiveCategory } from "@src/core/helpers/route/getActiveRoute";
import GenerateLink from "@src/core/components/GenerateLink";

const CategoryList = ({
  categoryList,
  location
}: {
  categoryList: ICategory[];
  location: Location<any>;
}) => {
  const activeKey = getActiveCategory(categoryList, location);

  return (
    <Menu selectedKeys={[activeKey]} mode="inline">
      {categoryList.map(x => (
        <Menu.Item key={x.categoryId}>
          <GenerateLink link={`Каталог/${x.categoryId}`} title={x.alias} />
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default CategoryList;
