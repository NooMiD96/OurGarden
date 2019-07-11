import React from "react";

import Row from "@src/core/antd/Row";
import Col from "@src/core/antd/Col";

import SearchProduct from "@components/Main/TopBar/components/SearchProduct";

import CompanyInfo from "./CompanyInfo";
import Card from "./Card";

export const Header = () => (
  <>
    <Row type="flex" className="header-wrapper">
      <Col>
        <SearchProduct />

        <CompanyInfo />

        <Card />
      </Col>
    </Row>
  </>
);

export default Header;
