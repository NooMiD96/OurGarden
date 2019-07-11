import React, { useState, useRef } from "react";

import Search from "@core/antd/Search";
import AutoComplete from "@core/antd/AutoComplete";
import LoadingIcon from "@src/core/icons/Loading";
import SearchIcon from "@src/core/icons/Search";
import Product from "./Product";

import debounce from "lodash.debounce";

const { Option } = AutoComplete;

const loadingComponent = () => (
  <Option
    key="loading-auto-select"
    className="loading-auto-select"
    disabled
    style={{display: "flex"}}
  >
    <LoadingIcon />
  </Option>
);

const SearchProduct = () => {
  const autoCompleteEl: React.RefObject<AutoComplete> = useRef(null);

  const [pending, setLoading] = useState(false);
  const [producdList, setProductList] = useState([] as any[]);
  const [searchIsActive, setSearchActive] = useState(false as boolean);

  const onSearch = async (value: string) => {
    try {
      setSearchActive(!!value);
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
    <>
      <AutoComplete
        ref={autoCompleteEl}
        enterButton="Найти"
        placeholder="Поиск..."
        dataSource={(
          pending
            ? [loadingComponent()]
            : producdList.map(Product)
        )}
        onSearch={debounceOnSearch}
        getPopupContainer={() => document.getElementById("product-popup-container")!}
        optionLabelProp="title"
      >
        <Search
          prefix={(
            <SearchIcon
              isActive={searchIsActive}
              onClick={() => {
                autoCompleteEl.current!.select.rcSelect.setInputValue("");
              }}
            />
          )}
          enterButton="Найти"
          onSearch={onSearch}
        />
      </AutoComplete>
      <span id="product-popup-container" />
    </>
  )
}

export default SearchProduct;
