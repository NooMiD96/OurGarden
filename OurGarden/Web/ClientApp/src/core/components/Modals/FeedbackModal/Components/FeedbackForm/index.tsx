import React from "react";

import { FormItem } from "@src/core/antd/Form";
import Input, { TextArea } from "@src/core/antd/Input";
import PhoneNumberInput, {
  CISPhoneNumberRegExp,
} from "@src/core/components/PhoneNumberInput";
import Svg from "@src/core/components/Svg";

import { IFeedbackForm } from "./interfaces/IFeedbackForm";

export const FeedbackForm = ({
  onSubmit,
  messageDefaultValue,
}: IFeedbackForm) => (
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
        prefix={<Svg type="form-user" />}
        placeholder="Имя"
        onPressEnter={onSubmit}
      />
    </FormItem>

    <FormItem name="secondName">
      <Input
        prefix={<Svg type="form-user" />}
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
        prefix={<Svg type="form-mail" className="input-icon" />}
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
        prefix={<Svg type="form-phone" className="input-icon" />}
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
      initialValue={messageDefaultValue}
    >
      <TextArea
        placeholder="Текст сообщения"
        // @ts-ignore
        autoSize={{ minRows: 4, maxRows: 12 }}
      />
    </FormItem>
  </React.Fragment>
);

export default FeedbackForm;
