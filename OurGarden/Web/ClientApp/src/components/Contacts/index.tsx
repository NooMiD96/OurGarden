import React from "react";

import CompanyMap from "./CompanyMap";
import CompanyContacts from "./CompanyContacts";

import ContactsWrapper from "./style/Contacts.style";

export const Contacts = () => (
  <ContactsWrapper className="content">
    <CompanyContacts />
    <CompanyMap />
  </ContactsWrapper>
);

export default Contacts;
