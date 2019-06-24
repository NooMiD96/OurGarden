import * as React from "react";

import Header from "./Header";
import NavMenu from "./NavMenu";

import TopbarWrapper from "./style/topbar.style";

const TopBar = () => {
  return (
    <TopbarWrapper>
      <Header />
      <NavMenu />
    </TopbarWrapper>
  )
}

export default TopBar;
