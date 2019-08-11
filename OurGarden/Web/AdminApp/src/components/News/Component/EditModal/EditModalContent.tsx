import React, { useRef } from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import CKEditor from "@core/components/CKEditor";
import localeText from "../Text";

import { FileUploader } from "@src/core/components/Uploader/File";

import { INews, INewsDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";

interface IProps extends FormComponentProps {
  item: INews | null;
  loading: boolean;
  handleCreateSubmit: (data: INewsDTO) => void;
  handleClose: () => void;
}

const onSubmitHandler = (
  props: IProps,
  ckEditor: React.RefObject<CKEditor>,
  e?: IPressEnterEvent | React.FormEvent
) => {
  e && e.preventDefault();

  const { form } = props;

  const description: string = ckEditor.current!.state.editor.getData();

  const alias = form.getFieldValue("alias");
  const image = form.getFieldValue("image");

  props.form.setFieldsValue({
    description
  });

  props.form.validateFields((err: any, _values: any) => {
    if (!err) {
      props.handleCreateSubmit({
        title: alias, // TODO:
        description,
        file: image
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
  const { alias, description, photo } = item || ({} as INews);

  const onUploadImage = (image?: File) => {
    form.setFieldsValue({
      image
    });
  };

  const onSubmit = (e?: IPressEnterEvent | React.FormEvent) =>
    onSubmitHandler(props, ckEditor, e);

  return (
    <Form layout="vertical" onSubmit={onSubmit}>
      <FormItem>
        {getFieldDecorator("alias", {
          initialValue: alias,
          rules: [{ required: true, message: localeText._rule_require_alias }]
        })(
          <Input
            prefix={<Icon type="edit" className="input-prefix-color" />}
            placeholder={localeText._label_alias}
            onPressEnter={onSubmit}
          />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("image", {
          initialValue: photo && photo.url,
          rules: [{ required: true, message: localeText._rule_require_photo }]
        })(
          <FileUploader
            onUpload={onUploadImage}
            oldImageUrl={photo && photo.url}
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

      <div className="ant-modal-footer">
        <Button type="primary" onClick={onSubmit}>
          Сохранить
        </Button>
        <Button type="danger" onClick={e => onClose(props, e)}>
          Отмена
        </Button>
      </div>
    </Form>
  );
};

export default Form.create<IProps>()(EditModalContent);
