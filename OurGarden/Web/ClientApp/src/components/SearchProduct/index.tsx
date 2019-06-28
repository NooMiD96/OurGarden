import React, { useState } from "react";

import Search from "@core/antd/Search";
import debounce from "lodash.debounce";
import AutoComplete from "@core/antd/AutoComplete";
import Loading from "@src/core/icons/Loading";

import Product from "./Product";

import SearchProductWrapper from "./style/searchProduct.style";

const { Option } = AutoComplete;


const loadingComponent = () => (
  <Option
    key="loading-auto-select"
    className="loading-auto-select"
    disabled
    style={{display: 'flex'}}
  >
    <Loading />
  </Option>
);

const SearchProduct = () => {
  const [pending, setLoading] = useState(false);
  const [producdList, setProductList] = useState([] as any[]);

  const onSearch = async (_value: string) => {
    try {
      setLoading(true);

      const data = await fetch("https://randomuser.me/api/?results=5").then(res => res.json());
      const producdList = data.results.map((x: any) => ({
        key: x.id.value + `${x.name.title}. ${x.name.first} ${x.name.last}`,
        title: `${x.name.title}. ${x.name.first} ${x.name.last}`,
        imgSrc: x.picture.medium
      }));

      setProductList(producdList)
    } catch (err) {
      console.warn(err);
    } finally {
      // setLoading(false);
    }
  }

  const debounceOnSearch = debounce(onSearch, 350);

  return (
    <SearchProductWrapper>
      <AutoComplete
        enterButton="Найти"
        placeholder="Поиск..."
        dataSource={(
          pending
            ? [loadingComponent()]
            : producdList.map(Product)
        )}
        onSearch={debounceOnSearch}
        getPopupContainer={() => document.getElementById('product-popup-container')!}
        optionLabelProp="title"
      >
        <Search
          enterButton="Найти"
          onSearch={onSearch}
        />
      </AutoComplete>

      <div id="product-popup-container" />
    </SearchProductWrapper>
  )
}

export default SearchProduct;
