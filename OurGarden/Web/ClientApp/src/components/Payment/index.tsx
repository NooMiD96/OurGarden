import React from "react";
import { connect } from "react-redux";

import HeaderHelmet from "@src/core/components/Helmet";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

interface IPayment {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
}

export class Payment extends React.PureComponent<IPayment, {}> {
  constructor(props: IPayment) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [
        {
          displayName: "Доставка и оплата",
          url: "Payment",
          order: 1
        }
      ],
      key: "Payment"
    });
  }

  render() {
    return (
      <div className="content white-background grey-border p25">
        <HeaderHelmet seoSectionName="payment" />
        Данный раздел находится в разработке, приходите позднее!
      </div>
    );
  }
}

export default connect(null, {
  setBreadcrumb: breadcrumbActions.setBreadcrumb
})(Payment);
