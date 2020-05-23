import React, { useRef } from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import CKEditor from "@core/components/CKEditor";
import localeText from "../Text";

import { IVideo, IVideoDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";

interface IProps extends FormComponentProps {
  item: IVideo | null;
  loading: boolean;
  handleCreateSubmit: (data: IVideoDTO) => void;
  handleClose: Function;
}

const onSubmitHandler = (
  props: IProps,
  ckEditor: React.RefObject<CKEditor>,
  e?: IPressEnterEvent | React.FormEvent
) => {
  e && e.preventDefault();

  const { form, item } = props;

  const videoId = item ? item.videoId : 0;
  const description: string = ckEditor.current!.state.editorApi.getData();
  const title = form.getFieldValue("title");
  const url = form.getFieldValue("url");

  props.form.setFieldsValue({
    description
  });

  props.form.validateFields((err: any, _values: any) => {
    if (!err) {
      props.handleCreateSubmit({
        videoId,
        title,
        description,
        url
      });
    }
  });
};

const onClose = (props: IProps, e?: IPressEnterEvent | React.FormEvent) => {
  e && e.preventDefault();

  props.handleClose();
};

export const EditModalContent = (props: IProps) => {
  const ckEditor: React.RefObject<CKEditor> = useRef(null);

  const { form, item } = props;
  const { getFieldDecorator } = form;

  const { title, description, url } = item || ({} as IVideo);

  const onSubmit = (e?: IPressEnterEvent | React.FormEvent) => onSubmitHandler(props, ckEditor, e);

  return (
    <Form layout="vertical" onSubmit={onSubmit}>
      <FormItem>
        {getFieldDecorator("title", {
          initialValue: title,
          rules: [{ required: true, message: localeText._rule_require_title }]
        })(
          <Input
            prefix={<Icon type="edit" className="input-prefix-color" />}
            placeholder={localeText._label_title}
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("description", {
          rules: [
            { required: true, message: localeText._rule_require_description }
          ]
        })(<CKEditor ref={ckEditor} data={description} />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("url", {
          initialValue: url,
          rules: [{ required: true, message: localeText._rule_require_url }]
        })(
          <Input
            prefix={<Icon type="edit" className="input-prefix-color" />}
            placeholder={localeText._label_url}
          />
        )}
      </FormItem>
      <div className="ant-modal-footer">
        <Button type="primary" onClick={onSubmit}>
          Сохранить
        </Button>
        <Button type="danger" onClick={(e) => onClose(props, e)}>
          Отмена
        </Button>
      </div>
    </Form>
  );
};

export default Form.create<IProps>()(EditModalContent);
