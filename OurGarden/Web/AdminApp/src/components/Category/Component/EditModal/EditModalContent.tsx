import * as React from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import localeText from "../Text";

import { FileUploader } from "@src/core/components/Uploader/File";

import { ICategory } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";

interface IProps extends FormComponentProps {
  item: ICategory | null;
  loading: boolean;
  handleCreateSubmit: Function;
  handleClose: Function;
}

export const EditModalContent = (props: IProps) => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const categoryId = props.item ? props.item.categoryId : null;
  const alias = props.item ? props.item.alias : null;
  const photo = props.item ? props.item.photo : null;

  const onSubmit = (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const alias = form.getFieldValue("alias");
    const image = form.getFieldValue("image");

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          categoryId: categoryId,
          alias: alias,
          file: image,
        });
      }
    });
  };

  const onClose = () => {
    form.resetFields(["alias", "image"]);
    props.handleClose();
  };

  const onUploadImage = (imageUrl: string | ArrayBuffer) => {
    form.setFieldsValue({
      image: imageUrl
    });
  };

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
          initialValue: photo ? photo.url : null,
          rules: [{ required: true, message: localeText._rule_require_photo }]
        })(
          <FileUploader
            onUpload={onUploadImage}
            oldImageUrl={photo ? photo.url : null}
          />
        )}
      </FormItem>
      <div className="ant-modal-footer">
        <Button type="primary" onClick={onSubmit}>
          Сохранить
        </Button>
        <Button type="danger" onClick={onClose}>
          Отмена
        </Button>
      </div>
    </Form>
  );
};

export default Form.create<IProps>()(EditModalContent);
