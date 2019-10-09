import * as React from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import Select from "@core/antd/Select";
import Checkbox from "@core/antd/Checkbox";
import localeText from "../Text";

import { FileUploader } from "@src/core/components/Uploader/File";
import { filterOption } from "@core/utils/select";

import { ISubcategory, ISubcategoryDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { ICategoryDictionary } from "@src/components/Category/State";

interface IProps extends FormComponentProps {
  item: ISubcategory | null;
  loading: boolean;
  dropdownData: ICategoryDictionary[];
  handleCreateSubmit: (data: ISubcategoryDTO) => void;
  handleClose: Function;
}

export const EditModalContent = (props: IProps) => {
  const { form, item } = props;
  const { getFieldDecorator } = form;
  const { subcategoryId, categoryId, alias, photo, isVisible }
    = item || ({ isVisible: true } as ISubcategory);

  const onSubmit = (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const newCategoryId = form.getFieldValue("newCategoryId");

    const alias = form.getFieldValue("alias");
    const isVisible = form.getFieldValue("isVisible");

    const image = form.getFieldValue("image");

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          categoryId,
          subcategoryId,

          newCategoryId,

          alias,
          isVisible,
          file: image
        });
      }
    });
  };

  const options = props.dropdownData.map(item => (
    <Select.Option key={item.categoryId} value={item.categoryId}>
      {item.alias}
    </Select.Option>
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

  return (
    <Form layout="vertical" onSubmit={onSubmit}>
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
            filterOption={filterOption}
          >
            {options}
          </Select>
        )}
      </FormItem>

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
        {getFieldDecorator("isVisible", {
          initialValue: isVisible,
          valuePropName: "checked"
        })(<Checkbox>Категория видна пользователю</Checkbox>)}
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
