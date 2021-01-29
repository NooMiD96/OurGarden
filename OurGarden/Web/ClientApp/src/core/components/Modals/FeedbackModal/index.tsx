import React, { useState } from "react";

import Modal, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@core/materialUI/modal";
import Button from "@src/core/antd/Button";
import FeedbackForm from "./Components/FeedbackForm";
import Form, { hasErrors, useForm } from "@src/core/antd/Form";
import Loading from "@core/components/Loading";

import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";
import { sendFeedback } from "./utils";

import { IFeedbackModal } from "./interfaces/IFeedbackModal";
import { IFeedbackDTO } from "./interfaces/IFeedbackDTO";

export const FeedbackModal = ({
  isModalOpen,
  onCloseModal,
  product,
}: TWithRouter<IFeedbackModal>) => {
  const [form] = useForm();
  const [isLoading, setLoadingState] = useState(false);
  const [errorMessage, setErrorText] = useState("");
  const [successMessage, setSuccessText] = useState("");
  const [messageDefaultValue] = useState(
    product
      ? `Доброго времени! Подскажите, пожалуйста, когда поступит в продажу товар "${product?.alias}?"`
      : ""
  );
  const { getFieldsError } = form;

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    setLoadingState(true);

    const result = await sendFeedback(values as IFeedbackDTO);

    if (result.ok) {
      setSuccessText("Форма была успешно отправлена!");
    } else {
      const resultErrorText = await result.text();
      setErrorText(resultErrorText);
    }
    setLoadingState(false);
  };

  return (
    <Modal open={isModalOpen} onClose={onCloseModal} fullWidth>
      <DialogTitle>Форма обратной связи</DialogTitle>

      <DialogContent dividers>
        {successMessage ? (
          <span>{successMessage}</span>
        ) : (
          <>
            <span>
              {errorMessage
                ? `При отправке формы произошла ошибка: ${errorMessage}. Пожалуйста, свяжитесь с нами и сообщите нам эту ошибку`
                : ""}
            </span>
            <Form
              className={isLoading ? "d-none" : ""}
              layout="vertical"
              form={form}
              onFinish={onSubmitHandler}
            >
              <FeedbackForm
                messageDefaultValue={messageDefaultValue}
                form={form}
                onSubmit={onSubmitHandler}
              />
            </Form>
          </>
        )}

        {isLoading && <Loading />}
      </DialogContent>

      <DialogActions>
        <Button className="custom-styled-btn" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button
          type="primary"
          className="custom-styled-btn"
          onClick={onSubmitHandler}
          disabled={hasErrors(getFieldsError()) || !!successMessage}
        >
          Отправить
        </Button>
      </DialogActions>
    </Modal>
  );
};

// Без WithRouterPush не работает тот рендер,
// который используется в ModalWindowDump
export default WithRouterPush<IFeedbackModal>(FeedbackModal as any);
