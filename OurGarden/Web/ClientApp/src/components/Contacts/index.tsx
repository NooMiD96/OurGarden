import React from "react";
import { connect } from "react-redux";

import HeaderHelmet from "@src/core/components/Helmet";

import CompanyMap from "./CompanyMap";
import CompanyContacts from "./CompanyContacts";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

import { IApplicationState } from "@src/Store";

import "./style/Contacts.style.scss";
import "@src/assets/scss/companyBackground.scss";

interface IContacts {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
  ymId: number;
}

export class Contacts extends React.PureComponent<IContacts, {}> {
  constructor(props: IContacts) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [
        {
          displayName: "Контакты",
          url: "Contacts",
          order: 1
        }
      ],
      key: "Contacts"
    });
  }

  componentDidMount() {
    const { ymId } = this.props;

    window.ym(ymId, "reachGoal", "CONTACTS_VIEW");
  }

  render() {
    const { ymId } = this.props;

    return (
      <div className="contacts-wrapper content">
        <HeaderHelmet seoSectionName="Contacts" />
        <CompanyContacts ymId={ymId} />
        <CompanyMap />
      </div>
    );
  }
}

export default connect(
  (state: IApplicationState) => ({
    ymId: state.app.ymId
  }),
  {
    setBreadcrumb: breadcrumbActions.setBreadcrumb
  }
)(Contacts);
