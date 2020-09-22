import React from "react";

import LottieWebIcon from "@core/components/LottieWebIcon";

const LoadOption = () => ({
  disabled: true,
  label: (
    <div key="loading-auto-select" className="loading-auto-select">
      <LottieWebIcon type="loading" />
    </div>
  ),
});

export default LoadOption;
