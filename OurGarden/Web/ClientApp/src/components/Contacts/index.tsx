import React from "react";

import CompanyMap from "./CompanyMap";
import CompanyContacts from "./CompanyContacts";

import "./style/Contacts.style.scss";
import "@src/assets/scss/companyBackground.scss";

export const Contacts = () => (
  <div className="contacts-wrapper content">
    <CompanyContacts />
    <CompanyMap />
  </div>
);

export default Contacts;
