import React from "react";

import HeaderHelmet from "@src/core/components/Helmet";

import CompanyMap from "./CompanyMap";
import CompanyContacts from "./CompanyContacts";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

import "./style/Contacts.style.scss";
import "@src/assets/scss/companyBackground.scss";

export const Contacts = () => (
  <div className="contacts-wrapper content">
    <HeaderHelmet
      {...getSEOMetaData("contacts")}
    />
    <CompanyContacts />
    <CompanyMap />
  </div>
);

export default Contacts;
