import React from "react";

import { RUSSIAN_CURRENCY } from "@src/core/constants";

export const RussianCurrency = () => (
  <span className="price" style={{ fontFamily: "Gilroy" }}>
    {RUSSIAN_CURRENCY}
  </span>
);

export default RussianCurrency;
