import * as React from "react";

import DatePicker from "antd/lib/date-picker";
import locale from "antd/lib/date-picker/locale/ru_RU";

import "antd/lib/date-picker/style/index.css";
import "./Input";
import "./Tag";
import { MonthPickerProps } from "antd/lib/date-picker/interface";

const LocaleDatePicker = (props: MonthPickerProps) => (
  <DatePicker
    {...props}
    locale={locale}
  />
);

export {
  LocaleDatePicker,
  locale,
  DatePicker,
};

export default LocaleDatePicker;
