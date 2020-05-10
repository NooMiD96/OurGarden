import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import Search from "@core/antd/Search";
import AutoComplete from "@core/antd/AutoComplete";
import LottieWebIcon from "@core/components/LottieWebIcon";
import { LoadOption, EmptyOption, ProductOption } from "./SelectOption";

import { IProduct } from "@src/components/Product/State";

import debounce from "lodash.debounce";

const fetchProducts = async (search: string) => {
  const result = await fetch(`/api/Search?search=${search}`, {
    credentials: "same-origin",
    method: "GET"
  }).then((res: Response) => res.json());

  return result;
};

let debounceOnSearch: any;

const SearchProduct = (props: { push: (val: string) => void }) => {
  const [pending, setLoading] = useState(false as boolean);
  const [productList, setProductList] = useState([] as IProduct[]);
  const [searchIsActive, setSearchActive] = useState(false as boolean);
  const [searchValue, setSearchValue] = useState("" as string);

  const onSearch = async (value: string) => {
    const formatedValue = value ? value.trim() : null;
    try {
      setSearchActive(!!formatedValue);
      if (!formatedValue) {
        setProductList([]);
        return;
      }

      setLoading(true);
      const { data }: { data: IProduct[] } = await fetchProducts(formatedValue);
      setProductList(data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const resetSearchValue = async () => {
    setSearchValue("");
    debounceOnSearch("");
    await onSearch("");
  };

  const onSelect = (val: any) => {
    props.push(val);
  };

  useEffect(() => {
    debounceOnSearch = debounce(onSearch, 350);
  }, []);

  let dataSource: any[] = [];

  if (pending) {
    dataSource.push(LoadOption());
  } else if (!productList.length && searchIsActive) {
    dataSource.push(EmptyOption());
  } else if (productList.length) {
    dataSource = productList.map(ProductOption);
  }

  return (
    <React.Fragment>
      <AutoComplete
        listHeight={512}
        options={dataSource}
        onSearch={(val) => {
          setSearchValue(val);
          debounceOnSearch(val);
        }}
        // prettier-ignore
        getPopupContainer={() => document.getElementById("product-popup-container")!}
        defaultActiveFirstOption={false}
        onSelect={onSelect}
        value={searchValue}
      >
        <Search
          placeholder="Поиск..."
          // prettier-ignore
          prefix={(
            <LottieWebIcon
              type="search"
              isActive={searchIsActive}
              onClick={resetSearchValue}
            />
          )}
          enterButton="Найти"
          onSearch={onSearch}
          value={searchValue}
        />
      </AutoComplete>
      <span id="product-popup-container" />
    </React.Fragment>
  );
};

export default connect(null, {
  push
})(SearchProduct);
