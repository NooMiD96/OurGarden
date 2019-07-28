import * as React from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import { Button } from "@src/core/antd";
import { ImageUploader } from "@src/core/components/AntFileUploader/Index";
import localeText from "../Text";
// import ModalControlButtons from "../ModalControlButtons";

// import { TAuthenticationModel } from "../../TModel";

// import localeText from "../Text";

interface IProps extends FormComponentProps {
  url: string;
  name: string;
  loading: boolean;
  handleSubmit: Function;
  handleClose: Function;
}

export const EditModalContent = (props: IProps) => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const onSubmit = () => {
    var alias = form.getFieldValue("alias");
    var imageUrl = form.getFieldValue("image");

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleSubmit({
          alias: alias,
          url: props.url == imageUrl ? null : imageUrl
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
          rules: [{ required: true, message: localeText._rule_require_photo }]
        })(<ImageUploader onUpload={onUploadImage} oldImageUrl={props.url} />)}
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
