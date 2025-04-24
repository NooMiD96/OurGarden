import * as React from "react";
import { Location } from "history";

import Menu from "@core/antd/Menu";
import GenerateLink from "@src/core/components/GenerateLink";

import { ICategory } from "@src/components/Category/State";

import { getActiveCategory } from "@src/core/helpers/route/getActiveRoute";
import { getLinkToProduct } from "@src/core/helpers/linkGenerator";
import { useLocation } from "react-router-dom";

const CategoryList = ({
  categoryList,
  setCollapse,
}: {
  categoryList: ICategory[];
  setCollapse?: false | ((val: boolean) => void);
}) => {
  const location = useLocation();
  const activeKey = getActiveCategory(categoryList, location);

  return (
    <Menu selectedKeys={[activeKey]} mode="inline">
      {categoryList.map((x) => (
        <Menu.Item title={null} key={x.categoryId}>
          <GenerateLink
            onClick={() => setCollapse && setCollapse(true)}
            link={getLinkToProduct({ categoryId: x.categoryId })}
            title={x.alias}
          />
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default CategoryList;
