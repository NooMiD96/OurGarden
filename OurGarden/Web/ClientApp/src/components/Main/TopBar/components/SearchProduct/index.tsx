import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import Search from "@core/antd/Search";
import AutoComplete from "@core/antd/AutoComplete";
import LoadingIcon from "@src/core/icons/Loading";
import SearchIcon from "@src/core/icons/Search";
import Product from "./Product";

import debounce from "lodash.debounce";
import { IProduct } from "@src/components/Product/State";

const { Option } = AutoComplete;

const loadingComponent = () => (
  <Option
    key="loading-auto-select"
    className="loading-auto-select"
    disabled
    style={{ display: "flex" }}
  >
    <LoadingIcon />
  </Option>
);

const searchListIsEmpty = () => (
  <Option
    key="search-list-is-empty"
    className="search-list-is-empty"
    disabled
    style={{ display: "flex" }}
  >
    По вашему запросу ничего не найдено...
  </Option>
);

const fetchProducts = async (search: string) => {
  return await fetch(`/api/Product/SearchProduct?search=${search}`, {
    credentials: "same-origin",
    method: "GET"
  }).then(res => res.json());
};

const SearchProduct = (props: { push: (val: string) => void }) => {
  const autoCompleteEl: React.RefObject<AutoComplete> = useRef(null);

  const [pending, setLoading] = useState(false as boolean);
  const [productList, setProductList] = useState([] as IProduct[]);
  const [searchIsActive, setSearchActive] = useState(false as boolean);

  const onSearch = async (value: string) => {
    try {
      setSearchActive(!!value);
      setLoading(true);
      if (!value) {
        setProductList([]);
        return;
      }

      const { data }: { data: IProduct[] } = await fetchProducts(value);
      setProductList(data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const resetSearchValue = async () => {
    autoCompleteEl.current!.select.rcSelect.setInputValue("");
    await onSearch("");
  };

  const onSelect = (val: any) => {
    props.push(val);

    return "";
  };

  const debounceOnSearch = debounce(onSearch, 350);

  let dataSource: any[] = [];

  if (pending) {
    dataSource.push(loadingComponent());
  } else if (!productList.length && searchIsActive) {
    dataSource.push(searchListIsEmpty());
  } else if (productList.length) {
    dataSource = productList.map(Product);
  }

  return (
    <React.Fragment>
      <AutoComplete
        ref={autoCompleteEl}
        enterButton="Найти"
        placeholder="Поиск..."
        dataSource={dataSource}
        onSearch={debounceOnSearch}
        getPopupContainer={() =>
          document.getElementById("product-popup-container")!
        }
        optionLabelProp="title"
        onSelect={onSelect}
      >
        <Search
          prefix={
            <SearchIcon isActive={searchIsActive} onClick={resetSearchValue} />
          }
          enterButton="Найти"
          onSearch={onSearch}
        />
      </AutoComplete>
      <span id="product-popup-container" />
    </React.Fragment>
  );
};

export default connect(
  null,
  {
    push: push
  }
)(SearchProduct);
