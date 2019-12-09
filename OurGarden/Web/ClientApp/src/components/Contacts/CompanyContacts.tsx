import React from "react";

import { Title } from "@src/core/antd/Typography";

import PlaceSvg from "@src/assets/svg/contacts/place.svg";
import PhoneSvg from "@src/assets/svg/contacts/phone.svg";
import MailSvg from "@src/assets/svg/contacts/mail.svg";

import { MAIN_MOBILE, HELP_EMAIL, ADDRESS } from "@src/core/constants";

export const CompanyContacts = () => (
  <div className="company-contacts">
    <Title>Контакты</Title>

    <div>
      <i className="anticon">
        <PlaceSvg />
      </i>
      <span>{ADDRESS}</span>
    </div>
    <div>
      <i className="anticon">
        <PhoneSvg />
      </i>
      <span>{MAIN_MOBILE}</span>
    </div>
    <div>
      <i className="anticon">
        <MailSvg />
      </i>
      <span>{HELP_EMAIL}</span>
    </div>
  </div>
);

export default CompanyContacts;
