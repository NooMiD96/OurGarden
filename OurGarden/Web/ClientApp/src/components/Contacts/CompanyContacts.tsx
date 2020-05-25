import React from "react";

import { Title } from "@src/core/antd/Typography";

import Svg from "@core/components/Svg";
import MainMobileLink from "@src/core/components/MainMobileLink";
import MainEmailLink from "@src/core/components/MainEmailLink";
import MainAddressLink from "@src/core/components/MainAddressLink";

export interface ICompanyContacts {
  ymId: number;
}

export const CompanyContacts = ({ ymId }: ICompanyContacts) => (
  <div className="company-contacts">
    <Title>Контакты</Title>

    <div>
      <MainAddressLink
        showFullAddress
        prefixIcon={(
          <i className="anticon">
            <Svg type="place-contacts" />
          </i>
        )}
      />
    </div>
    <div>
      <MainMobileLink
        ymId={ymId}
        prefixIcon={(
          <i className="anticon">
            <Svg type="phone-contacts" />
          </i>
        )}
      />
    </div>
    <div>
      <MainEmailLink
        prefixIcon={(
          <i className="anticon">
            <Svg type="mail-contacts" />
          </i>
        )}
      />
    </div>
  </div>
);

export default CompanyContacts;
