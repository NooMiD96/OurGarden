import React from "react";

import HeaderHelmet from "@src/core/components/Helmet";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

export const Videogalery = () => (
  <div className="content white-background">
    <HeaderHelmet
      {...getSEOMetaData("videogalery")}
    />
    Данный раздел находится в разработке, приходите позднее!
  </div>
);

export default Videogalery;
