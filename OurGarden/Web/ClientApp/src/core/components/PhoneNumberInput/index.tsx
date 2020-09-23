import React from "react";
import PhoneInput from "react-phone-input-2";

import "./style/PhoneNumberInput.style.scss";

export const CISPhoneNumberRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

class PhoneNumberInput extends React.PureComponent<any, any> {
  render() {
    const { prefix, placeholder, ...props } = this.props;

    return (
      <span className="ant-input-affix-wrapper">
        <span className="ant-input-prefix">{prefix || null}</span>

        <PhoneInput
          inputClass="ant-input"
          buttonClass="d-none"
          // @ts-ignore
          defaultCountry="ru"
          country="ru"
          placeholder={placeholder || "Телефон"}
          specialLabel=""
          disableSearchIcon
          disableDropdown
          autocompleteSearch
          enableAreaCodes
          countryCodeEditable={false}
          jumpCursorToEnd={false}
          {...props}
        />
      </span>
    );
  }
}

export default PhoneNumberInput;
