import React from "react";

import { Title } from "@src/core/antd/Typography";

import Svg from "@core/components/Svg";

import {
  MAIN_MOBILE,
  HELP_EMAIL,
  ADDRESS,
  MAIN_MOBILE_FORMATTED
} from "@src/core/constants";

export interface ICompanyContacts {
  ymId: number;
}

export const CompanyContacts = ({ ymId }: ICompanyContacts) => (
  <div className="company-contacts">
    <Title>Контакты</Title>

    <div>
      <i className="anticon">
        <Svg type="place-contacts" />
      </i>
      <span>{ADDRESS}</span>
    </div>
    <div>
      <a
        className="number-wrapper"
        href={`tel:${MAIN_MOBILE_FORMATTED}`}
        onClick={() => window.ym(ymId, "reachGoal", "PHONE_CLICK")}
      >
        <i className="anticon">
          <Svg type="phone-contacts" />
        </i>
        <span>{MAIN_MOBILE}</span>
      </a>
    </div>
    <div>
      <i className="anticon">
        <Svg type="mail-contacts" />
      </i>
      <span>{HELP_EMAIL}</span>
    </div>
  </div>
);

export default CompanyContacts;
