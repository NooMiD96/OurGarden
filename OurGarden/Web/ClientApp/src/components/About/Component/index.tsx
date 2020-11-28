import React from "react";

import Typography from "@core/antd/Typography";
import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { TState, TComponentState } from "../TState";

import { ABOUT_PAGE_ID } from "@src/core/constants/staticPages";
import { WHITE_BLOCK } from "@src/core/constants/style";

export class About extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.isDataWasGeted) {
      props.getPageInfo(ABOUT_PAGE_ID);

      props.setBreadcrumb({
        breadcrumb: [
          {
            displayName: "О нас",
            url: "About",
            order: 1,
          },
        ],
        key: "About",
      });
    }
  }

  render() {
    const { pageInfo } = this.props;

    // prettier-ignore
    return (
      <Typography className={`content ourgarden-about ${WHITE_BLOCK}`}>
        <DescriptionWrapper
          description={pageInfo?.description}
          useWysiwygDefaultClassNames={false}
        />
      </Typography>
    );
  }
}

export default About;
