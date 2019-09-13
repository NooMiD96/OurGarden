import React from "react";

import HeaderHelmet from "@src/core/components/Helmet";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

export const Payment = () => (
  <>
    <HeaderHelmet
      {...getSEOMetaData("payment")}
    />
    <div>
      Данный раздел находится в разработке, приходите позднее!
    </div>
  </>
);

export default Payment;
