import React from "react";
import { connect } from "react-redux";

import HeaderHelmet from "@src/core/components/Helmet";

import { getSEOMetaData } from "@src/core/utils/seoInformation";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

interface IPayment {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
};

export class Payment extends React.PureComponent<IPayment, {}> {
  constructor(props: IPayment) {
    super(props);

    props.setBreadcrumb([{
      displayName: "Доставка и оплата",
      url: "",
      order: 1,
    }]);
  }

  render() {
    return (
      <>
        <HeaderHelmet
          {...getSEOMetaData("payment")}
        />
        <div>
          Данный раздел находится в разработке, приходите позднее!
        </div>
      </>
    )
  }
}

export default connect(
  null,
  {
    setBreadcrumb: breadcrumbActions.setBreadcrumb
  }
)(Payment);
