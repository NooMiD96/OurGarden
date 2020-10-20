import React from "react";

import Typography from "@core/antd/Typography";
import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { TState, TComponentState } from "../TState";

import { GAZON_PAGE_INFO_ID } from "@src/core/constants/staticPages";
import { WHITE_BLOCK } from "@src/core/constants/style";

export class Gazon extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.isDataWasGeted) {
      props.getPageInfo(GAZON_PAGE_INFO_ID);

      props.setBreadcrumb({
        breadcrumb: [
          {
            displayName: "Ландшафтный дизайн",
            url: "Design",
            order: 1,
          },
          {
            displayName: "Рулонный газон",
            url: "rulonnyj-gazon",
            order: 2,
          },
        ],
        key: "rulonnyj-gazon",
      });
    }
  }

  render() {
    const { pageInfo } = this.props;

    // prettier-ignore
    return (
      <Typography className={`content ourgarden-rulonnyj-gazon ${WHITE_BLOCK}`}>
        <DescriptionWrapper
          description={pageInfo?.description}
          useWysiwygDefaultClassNames={false}
        />
      </Typography>
    );
  }
}

export default Gazon;
