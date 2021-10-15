/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useRef } from "react";

import LottieWebIcon from "@core/components/LottieWebIcon";
import { LoadOption, EmptyOption, ProductOption } from "./SelectOption";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";

import debounce from "lodash.debounce";
import { fetchProducts } from "./utils";

import { IProduct } from "@src/components/Product/State";

let debounceOnSearch: any;

const SearchProduct = (props: TWithRouter<any>) => {
  const autoCompleteElement: React.RefObject<any> = useRef(null);

  const [AutoCompleteComponent, setAutoCompleteComponent] = useState(
    null as any
  );
  const [SearchComponent, setSearchComponent] = useState(null as any);
  const [LazyImageComponent, setLazyImageComponent] = useState(null as any);
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

    Promise.all([
      import(/* webpackChunkName: "Search" */ "@core/antd/Search"),
      import(/* webpackChunkName: "AutoComplete" */ "@core/antd/AutoComplete"),
      import(/* webpackChunkName: "LazyImage" */ "@core/components/LazyImage"),
    ]).then(([search, autoComplete, lazyImage]: any[]) => {
      setSearchComponent(search);
      setAutoCompleteComponent(autoComplete);
      setLazyImageComponent(lazyImage);
    });
  }, []);

  let dataSource: any[] = [];

  if (pending) {
    dataSource.push(LoadOption());
  } else if (!productList.length && searchIsActive) {
    dataSource.push(EmptyOption());
  } else if (productList.length) {
    // prettier-ignore
    dataSource = productList.map((product) => ProductOption(product, LazyImageComponent));
  }

  if (AutoCompleteComponent && SearchComponent) {
    return (
      <React.Fragment>
        <AutoCompleteComponent.default
          ref={autoCompleteElement}
          listHeight={512}
          listItemHeight={115}
          options={dataSource}
          onSearch={(val: React.SetStateAction<string>) => {
            setSearchValue(val);
            debounceOnSearch(val);
          }}
          // prettier-ignore
          getPopupContainer={() => document.getElementById("product-popup-container")!}
          defaultActiveFirstOption={false}
          onSelect={onSelect}
          value={searchValue}
        >
          <SearchComponent.default
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
            aria-label="Поиск товара"
          />
        </AutoCompleteComponent.default>
        <span id="product-popup-container" />
      </React.Fragment>
    );
  }

  return <div />;
};

export default WithRouterPush<any>(SearchProduct as any);
