import React from "react";

import Loading from "@core/components/Loading";
import CatalogCardList from "@src/core/components/CatalogCardList";
import HeaderHelmet from "@src/core/components/Helmet";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

import { TState, TComponentState } from "../TState";

export class Subcategory extends React.PureComponent<TState, TComponentState> {
  cardStyle = {
    // xs <576px
    xs: { span: 24 },
    // sm ≥576px
    sm: { span: 24 },
    // md ≥768px
    // md: { span: 24 },
    // lg ≥992px
    lg: { span: 12 },
    // xl ≥1200px
    xl: { span: 8 }
    // xxl ≥1600px
    // xxl: { span: 8 }
  };

  constructor(props: TState) {
    super(props);

    const {
      match: { params },
      subcategoryList
    } = props;

    if (
      !subcategoryList.length
      || params.categoryId !== subcategoryList[0].categoryId
    ) {
      props.getSubcategoryList(params.categoryId);
    }

    props.getBreadcrumb({ categoryId: params.categoryId });
  }

  componentDidUpdate(prevProps: TState) {
    const {
      match: { params }
    } = this.props;

    if (prevProps.match.params !== params) {
      this.props.getSubcategoryList(params.categoryId);

      this.props.getBreadcrumb({ categoryId: params.categoryId });
    }
  }

  render() {
    const { subcategoryList, push, pending } = this.props;

    const seoSection = getSEOMetaData("subcategory");

    return (
      <React.Fragment>
        {pending ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {this.props.category && (
              <HeaderHelmet
                title={
                  seoSection.title
                  && seoSection.title.replace(
                    "{{value}}",
                    this.props.category.alias
                  )
                }
                metaDescription={seoSection.meta}
              />
            )}
            <CatalogCardList dataList={subcategoryList} push={push} />
          </>
        )}
      </React.Fragment>
    );
  }
}

export default Subcategory;
