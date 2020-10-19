import React from "react";

import Typography from "@core/antd/Typography";
import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { TState, TComponentState } from "../TState";

import { PAYMENT_PAGE_INFO_ID } from "@src/core/constants";
import { WHITE_BLOCK } from "@src/core/constants/style";

export class Payment extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.isDataWasGeted) {
      props.getPageInfo(PAYMENT_PAGE_INFO_ID);

      props.setBreadcrumb({
        breadcrumb: [
          {
            displayName: "Доставка и оплата",
            url: "Payment",
            order: 1,
          },
        ],
        key: "Payment",
      });
    }
  }

  render() {
    const { pageInfo } = this.props;

    // prettier-ignore
    return (
      <Typography className={`content ourgarden-payment ${WHITE_BLOCK}`}>
        <DescriptionWrapper
          description={pageInfo?.description}
          useWysiwygDefaultClassNames={false}
        />
      </Typography>
    );
  }
}

export default Payment;
