import React from "react";

import Form, { hasErrors, useForm } from "@src/core/antd/Form";
import Button from "@src/core/antd/Button";
import TotalPrice from "@src/core/components/TotalPrice";
import CardConfirmationFormFields from "./CardConfirmationFormFields";

import { ICardConfirmationForm } from "./ICardConfirmation";

import "../style/Form.style.scss";
import "../style/ButtonWrapper.style.scss";

// prettier-ignore
const CardConfirmationForm = (props: ICardConfirmationForm) => {
  const [form] = useForm();
  const {
    totalPrice, cancel, submit, ymId
  } = props;
  const { getFieldsError } = form;

  const onSubmit = () => {
    form.validateFields().then((values: any) => {
      window.ym(ymId, "reachGoal", "TO_ORDER_2");
      submit({
        FIO: `${values.secondName.trim()} ${values.firstName.trim()}${
          values.thirdName ? ` ${values.thirdName.trim()}` : ""
        }`,
        phone: values.phone,
        email: values.email.trim()
      });
    });
  };

  return (
    <div className="card-confirmation-form">
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <CardConfirmationFormFields form={form} onSubmit={onSubmit} />
        <TotalPrice totalPrice={totalPrice} />
        <div className="button-wrapper order-confirmation-footer">
          <Button onClick={cancel}>Отмена</Button>
          <Button
            type="primary"
            onClick={onSubmit}
            disabled={hasErrors(getFieldsError())}
          >
            Заказать
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CardConfirmationForm;
