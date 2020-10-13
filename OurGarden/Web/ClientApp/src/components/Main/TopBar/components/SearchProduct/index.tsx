import React, { useState, useEffect, useRef } from "react";
import { fetch } from "domain-task";

import Search from "@core/antd/Search";
import AutoComplete from "@core/antd/AutoComplete";
import LottieWebIcon from "@core/components/LottieWebIcon";
import { LoadOption, EmptyOption, ProductOption } from "./SelectOption";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";

import debounce from "lodash.debounce";

import { IProduct } from "@src/components/Product/State";

const fetchProducts = async (search: string) => {
  const encodedSearch = encodeURIComponent(search);

  const result = await fetch(`/api/Search?search=${encodedSearch}`, {
    credentials: "same-origin",
    method: "GET",
  }).then((res: Response) => res.json());

  return result;
};

let debounceOnSearch: any;

const SearchProduct = (props: TWithRouter<any>) => {
  const autoCompleteElement: React.RefObject<any> = useRef(null);

  const [pending, setLoading] = useState(false as boolean);
  const [productList, setProductList] = useState([] as IProduct[]);
  const [searchIsActive, setSearchActive] = useState(false as boolean);
  const [searchValue, setSearchValue] = useState("" as string);

  const onSearch = async (value: string) => {
    const formattedValue = value ? value.trim() : null;
    try {
      setSearchActive(!!formattedValue);
      if (!formattedValue) {
        setProductList([]);
        return;
      }

      setLoading(true);
      const { data }: { data: IProduct[] } = await fetchProducts(
        formattedValue
      );
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
    process.nextTick(() => {
      if (autoCompleteElement?.current?.blur) {
        autoCompleteElement.current.blur();
      }
    });
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
        ref={autoCompleteElement}
        listHeight={512}
        listItemHeight={115}
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

export default WithRouterPush<any>(SearchProduct as any);
