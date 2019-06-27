import * as React from "react";

import { Row, Col } from "@src/core/antd";
import SearchProduct from "@components/TopBar/SearchProduct";
import { Text } from "@src/core/antd/Typography";

import Archive from "@core/icons/Archive";
import Phone from "@src/assets/svg/phone.svg";
import MapPin from "@src/assets/svg/map-pin.svg";

export const Header = () => (
  <Row type="flex" className="header-wrapper">
    <Col>
      <SearchProduct />

      <Text>
        <div className="company-info place">
          <i className="anticon">
            <MapPin />
          </i>
          <span className="info">ул. 9 мая, 96</span>
        </div>

        <div className="company-info number">
          <i className="anticon">
            <Phone />
          </i>
          <span className="info">8 800 520 55 66</span>
        </div>

        <Archive />
      </Text>
    </Col>
  </Row>
);

export default Header;
