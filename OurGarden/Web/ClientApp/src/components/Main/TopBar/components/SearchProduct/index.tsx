import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import Search from "@core/antd/Search";
import AutoComplete from "@core/antd/AutoComplete";
import SearchIcon from "@src/core/icons/Search";
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
    dataSource.push(LoadOption());
  } else if (!productList.length && searchIsActive) {
    dataSource.push(EmptyOption());
  } else if (productList.length) {
    dataSource = productList.map(ProductOption);
  }

  return (
    <React.Fragment>
      <AutoComplete
        ref={autoCompleteEl}
        enterButton="Найти"
        placeholder="Поиск..."
        dataSource={dataSource}
        onSearch={debounceOnSearch}
        // prettier-ignore
        getPopupContainer={() => document.getElementById("product-popup-container")!}
        optionLabelProp="title"
        defaultActiveFirstOption={false}
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

export default connect(null, {
  push
})(SearchProduct);
