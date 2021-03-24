import React from "react";

import Row from "@core/antd/Row";
import Col from "@core/antd/Col";

import SearchProduct from "@components/Main/TopBar/components/SearchProduct";

import CompanyLogo from "./CompanyLogo";
import CompanyInfo from "./CompanyInfo";
import Card from "./Card";

export const Header = () => (
  <React.Fragment>
    <CompanyLogo />
    <Row className="header-wrapper">
      <Col>
        <SearchProduct />

        <CompanyInfo />

        <Card />
      </Col>
    </Row>
  </React.Fragment>
);

export default Header;
