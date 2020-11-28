import React from "react";

import { FormItem } from "@src/core/antd/Form";
import Input, { TextArea } from "@src/core/antd/Input";
import PhoneNumberInput, {
  CISPhoneNumberRegExp,
} from "@src/core/components/PhoneNumberInput";

import UserOutlinedIcon from "@icons/UserOutlined";
import PhoneOutlinedIcon from "@icons/PhoneOutlined";
import MailOutlinedIcon from "@icons/MailOutlined";

import { IFeedbackForm } from "./interfaces/IFeedbackForm";

export const FeedbackForm = ({ onSubmit }: IFeedbackForm) => (
  <React.Fragment>
    <FormItem
      name="firstName"
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите ваше имя",
        },
      ]}
    >
      <Input
        prefix={<UserOutlinedIcon />}
        placeholder="Имя"
        onPressEnter={onSubmit}
      />
    </FormItem>

    <FormItem name="secondName">
      <Input
        prefix={<UserOutlinedIcon />}
        placeholder="Фамилия"
        onPressEnter={onSubmit}
      />
    </FormItem>

    <FormItem
      name="email"
      rules={[
        {
          type: "email",
          message: "Почта имеет неверный формат",
        },
        {
          required: true,
          message: "Пожалуйста, введите вашу почту",
        },
      ]}
    >
      <Input
        placeholder="Почта"
        prefix={<MailOutlinedIcon className="input-icon" />}
        onPressEnter={onSubmit}
      />
    </FormItem>

    <FormItem
      name="phone"
      rules={[
        {
          required: false,
          message: "Пожалуйста, введите ваш контактный телефон",
          pattern: CISPhoneNumberRegExp,
        },
      ]}
    >
      <PhoneNumberInput
        placeholder="Телефон"
        prefix={<PhoneOutlinedIcon className="input-icon" />}
        onPressEnter={onSubmit}
      />
    </FormItem>

    <FormItem
      name="message"
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите сообщение",
        },
      ]}
    >
      <TextArea
        placeholder="Текст сообщения"
        // @ts-ignore
        prefix={<PhoneOutlinedIcon className="input-icon" />}
        autoSize={{ minRows: 4, maxRows: 12 }}
      />
    </FormItem>
  </React.Fragment>
);

export default FeedbackForm;
