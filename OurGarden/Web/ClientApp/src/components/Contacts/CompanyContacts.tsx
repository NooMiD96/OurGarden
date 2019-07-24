import React from "react";

import { Title } from "@src/core/antd/Typography";

import PlaceSvg from "@src/assets/svg/contacts/place.svg";
import PhoneSvg from "@src/assets/svg/contacts/phone.svg";

export const CompanyContacts = () => (
  <div className="company-contacts">
    <Title>Контакты</Title>

    <div>
      <i className="anticon">
        <PlaceSvg />
      </i>
      <span>г. Тула, ул. 9 мая, 36</span>
    </div>
    <div>
      <i className="anticon">
        <PhoneSvg />
      </i>
      <span>8 950 922 39 19</span>
    </div>
    <div>
      <i className="anticon">
        <PhoneSvg />
      </i>
      <span>8 950 922 39 19</span>
    </div>
  </div>
);

export default CompanyContacts;
