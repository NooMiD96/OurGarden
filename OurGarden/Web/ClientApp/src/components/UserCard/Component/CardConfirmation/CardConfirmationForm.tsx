import React from "react";

import Form, { hasErrors } from "@src/core/antd/Form";
import Button from "@src/core/antd/Button";
import TotalPrice from "@src/core/components/TotalPrice";
import CardConfirmationFormFields from "./CardConfirmationFormFields";

import Wrapper from "../style/Form.style";
import ButtonWrapper from "../style/ButtonWrapper.style";

import { ICardConfirmationForm } from "./ICardConfirmation";

const CardConfirmationForm = (props: ICardConfirmationForm) => {
  const { form, totalPrice, cancel, submit } = props;
  const { getFieldsError } = form;

  const onSubmit = () => {
    form.validateFields((err: any, values: any) => {
      if (!err) {
        submit({
          FIO: `${values.secondName} ${values.firstName}${
            values.thirdName ? ` ${values.thirdName}` : ""
          }`,
          phone: values.phone
        });
      }
    });
  };

  return (
    <Wrapper>
      <Form layout="vertical" onSubmit={onSubmit}>
        <CardConfirmationFormFields form={form} onSubmit={onSubmit} />
        <TotalPrice totalPrice={totalPrice} />
        <ButtonWrapper className="order-confirmation-footer">
          <Button onClick={cancel}>Отмена</Button>
          <Button
            type="primary"
            onClick={onSubmit}
            disabled={hasErrors(getFieldsError())}
          >
            Заказать
          </Button>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};

export default Form.create<ICardConfirmationForm>()(CardConfirmationForm);
