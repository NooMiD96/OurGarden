import * as React from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import localeText from "../Text";
import { Button } from "@src/core/antd";
import { ImageUploader } from "@src/core/components/AntFileUploader/Index";
import { ICategory } from "../../State";

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

  const onSubmit = () => {
    var alias = form.getFieldValue("alias");
    var imageUrl = form.getFieldValue("image");

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          categoryId: categoryId,
          alias: alias,
          url: photo == imageUrl ? null : imageUrl
        });
      }
    });
  };

  const onClose = () => {
    form.resetFields(["alias", "image"]);
    props.handleClose();
  };

  const onUploadImage = (imageUrl: string | ArrayBuffer) => {
    var value = {
      image: imageUrl
    };
    form.setFieldsValue(value);
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
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("image", {
          initialValue: photo ? photo.url : null,
          rules: [{ required: true, message: localeText._rule_require_photo }]
        })(
          <ImageUploader
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
