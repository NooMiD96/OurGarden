import React from "react";
import PhoneInput from "react-phone-input-2";

export const CISPhoneNumberRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

const inputStyle = {
  paddingLeft: 30,
  paddingRight: 11
};

class PhoneNumberInput extends React.PureComponent<any, any> {
  render() {
    const { prefix, placeholder, ...props } = this.props;
    return (
      <span className="ant-input-affix-wrapper">
        <span className="ant-input-prefix">
          {prefix || null}
        </span>

        <PhoneInput
          inputClass="ant-input"
          buttonClass="d-none"
          defaultCountry="ru"
          placeholder={placeholder || "Телефон"}
          disableSearchIcon
          disableDropdown
          masks={{ ru: "+. (...) ...-..-.." }}
          inputStyle={inputStyle}
          {...props}
        />
      </span>
    );
  }
}

export default PhoneNumberInput;
