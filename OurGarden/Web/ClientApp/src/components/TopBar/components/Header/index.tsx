import React from "react";

import Row from "@src/core/antd/Row";
import Col from "@src/core/antd/Col";

import SearchProduct from "@components/TopBar/components/SearchProduct";

import CompanyInfo from "./CompanyInfo";
import Card from "./Card";
import HeaderWrapper from "./style/header.style";

export const Header = () => (
  <HeaderWrapper>
    <Row type="flex" className="header-wrapper">
      <Col>
        <SearchProduct />

        <CompanyInfo />

        <Card />
      </Col>
    </Row>
  </HeaderWrapper>
);

export default Header;
