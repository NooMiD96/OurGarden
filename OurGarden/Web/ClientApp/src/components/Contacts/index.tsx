import React from "react";
import { connect } from "react-redux";

import HeaderHelmet from "@src/core/components/Helmet";

import CompanyMap from "./CompanyMap";
import CompanyContacts from "./CompanyContacts";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

import "./style/Contacts.style.scss";
import "@src/assets/scss/companyBackground.scss";

interface IContacts {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
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

  render() {
    return (
      <div className="contacts-wrapper content">
        <HeaderHelmet seoSectionName="contacts" />
        <CompanyContacts />
        <CompanyMap />
      </div>
    );
  }
}

export default connect(null, {
  setBreadcrumb: breadcrumbActions.setBreadcrumb
})(Contacts);
