import * as React from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import Select from "@core/antd/Select";
import localeText from "../Text";

import { ImageUploader } from "@src/core/components/AntFileUploader/Index";

import { ISubcategory, ISubcategoryDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { ICategory } from "@src/components/Category/State";

interface IProps extends FormComponentProps {
  item: ISubcategory | null;
  loading: boolean;
  dropdownData: ICategory[];
  handleCreateSubmit: (data: ISubcategoryDTO) => void;
  handleClose: Function;
}

export const EditModalContent = (props: IProps) => {
  const { form } = props;
  const { Option } = Select;
  const { getFieldDecorator } = form;

  const subcategoryId = props.item ? props.item.subcategoryId : null;
  const categoryId = props.item ? props.item.categoryId : null;
  const alias = props.item ? props.item.alias : null;
  const photo = props.item ? props.item.photo : null;

  const onSubmit = (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();
    const alias = form.getFieldValue("alias");
    const imageUrl = form.getFieldValue("image");
    const newCategoryId = form.getFieldValue("newCategoryId");

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          subcategoryId: subcategoryId,
          categoryId: categoryId,
          newCategoryId: newCategoryId,
          alias: alias,
          url: photo == imageUrl ? null : imageUrl
        });
      }
    });
  };

  const options = props.dropdownData.map(item => (
    <Option key={item.categoryId} value={item.categoryId}>
      {item.alias}
    </Option>
  ));

  const onClose = () => {
    form.resetFields(["alias", "image", "categoryId"]);
    props.handleClose();
  };

  const onUploadImage = (imageUrl: string | ArrayBuffer) => {
    form.setFieldsValue({
      image: imageUrl
    });
  };

  const onSelectChange = (value: string) => {
    form.setFieldsValue({
      categoryId: value
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
        {getFieldDecorator("newCategoryId", {
          initialValue: categoryId,
          rules: [
            { required: true, message: localeText._rule_require_catedory }
          ]
        })(
          <Select
            showSearch
            placeholder="Выберете категорию"
            optionFilterProp="children"
            onChange={onSelectChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {options}
          </Select>
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
