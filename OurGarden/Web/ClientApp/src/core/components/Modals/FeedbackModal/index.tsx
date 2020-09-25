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
import { formItemLayout, sendFeedback } from "./utils";

import { IFeedbackModal } from "./interfaces/IFeedbackModal";
import { IFeedbackDTO } from "./interfaces/IFeedbackDTO";

export const FeedbackModal = ({
  isModalOpen,
  onCloseModal,
}: TWithRouter<IFeedbackModal>) => {
  const [form] = useForm();
  const [isLoading, setLoadingState] = useState(false);
  const { getFieldsError } = form;

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    setLoadingState(true);
    await sendFeedback(values as IFeedbackDTO);
    setLoadingState(false);
  };

  return (
    <Modal open={isModalOpen} onClose={onCloseModal}>
      <DialogTitle>Форма обратной связи</DialogTitle>

      <DialogContent dividers>
        <Form
          {...formItemLayout}
          className={isLoading ? "d-none" : ""}
          layout="vertical"
          form={form}
          onFinish={onSubmitHandler}
        >
          <FeedbackForm form={form} onSubmit={onSubmitHandler} />
        </Form>

        {isLoading && <Loading />}
      </DialogContent>

      <DialogActions>
        <div className="button-wrapper order-confirmation-footer">
          <Button className="custom-styled-btn" onClick={onCloseModal}>
            Отмена
          </Button>
          <Button
            type="primary"
            className="custom-styled-btn"
            onClick={onSubmitHandler}
            disabled={hasErrors(getFieldsError())}
          >
            Отправить
          </Button>
        </div>
      </DialogActions>
    </Modal>
  );
};

// Без WithRouterPush не работает тот рендер,
// который используется в ModalWindowDump
export default WithRouterPush<IFeedbackModal>(FeedbackModal as any);
