import React from "react";

import Title from "@core/antd/Typography/Title";

import Svg from "@core/components/Svg";
import MainMobileLink from "@core/components/MainMobileLink";
import MainEmailLink from "@core/components/MainEmailLink";
import MainAddressLink from "@core/components/MainAddressLink";

export interface ICompanyContacts {
  ymId: number;
}

export const CompanyContacts = ({ ymId }: ICompanyContacts) => (
  <div className="company-contacts">
    <Title>Контакты</Title>

    <div>
      <MainAddressLink
        showFullAddress
        prefixIcon={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <i className="anticon">
            <Svg type="place-contacts" />
          </i>
        }
      />
    </div>
    <div>
      <MainMobileLink
        ymId={ymId}
        prefixIcon={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <i className="anticon">
            <Svg type="phone-contacts" />
          </i>
        }
      />
    </div>
    <div>
      <MainEmailLink
        prefixIcon={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <i className="anticon">
            <Svg type="mail-contacts" />
          </i>
        }
      />
    </div>
  </div>
);

export default CompanyContacts;
