import * as React from "react";

import DatePicker from "antd/es/date-picker";
import locale from "antd/es/date-picker/locale/ru_RU";

import "antd/es/date-picker/style/index.css";
import "./Input";
import "./Tag";
import { MonthPickerProps } from "antd/es/date-picker/interface";

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
