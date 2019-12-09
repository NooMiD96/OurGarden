import React from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import EditModalFooter from "@src/core/components/EditModalFooter";
import Select from "@core/antd/Select";
import Checkbox from "@core/antd/Checkbox";
import MultiplyUploaderForm, {
  useMultiplyUploaderForm
} from "@src/core/components/MultiplyUploaderForm";

import localeText from "../Text";
import { filterOption } from "@core/utils/select";
import {
  getAddFilesDTO,
  getUpdateFilesDTO,
  getDefaultFileList
} from "@src/core/utils/photo";

import { ISubcategory, ISubcategoryDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { ICategoryDictionary } from "@src/components/Category/State";

interface IProps extends FormComponentProps {
  item: ISubcategory | null;
  loading: boolean;
  dropdownData: ICategoryDictionary[];
  handleCreateSubmit: (data: ISubcategoryDTO) => void;
  handleClose: () => void;
}

export const EditModalContent = (props: IProps) => {
  const multiplyUploaderParams = useMultiplyUploaderForm();

  const { form } = props;
  const { getFieldDecorator } = form;

  const item = props.item || ({ isVisible: true } as ISubcategory);
  const { subcategoryId, categoryId, alias, photos, isVisible } = item;

  const onSubmit = async (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const newCategoryId = form.getFieldValue("newCategoryId");

    const alias = form.getFieldValue("alias");
    const isVisible = form.getFieldValue("isVisible");

    const addFilesDTO = await getAddFilesDTO(multiplyUploaderParams.addFiles);
    const updateFilesDTO = await getUpdateFilesDTO(
      multiplyUploaderParams.updateFiles
    );

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          categoryId,
          subcategoryId,

          newCategoryId,

          alias: alias.trim(),
          isVisible,
          addFiles: addFilesDTO,
          removeFiles: multiplyUploaderParams.removeFiles,
          updateFiles: updateFilesDTO
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
    form.resetFields();
    props.handleClose();
  };

  const defaultFileList = getDefaultFileList(photos);

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
          rules: [
            {
              required: true,
              message: localeText._rule_require_alias,
              transform: (val: string) => val && val.trim()
            }
          ]
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
        })(<Checkbox>Подкатегория видна пользователю</Checkbox>)}
      </FormItem>

      <FormItem>
        {getFieldDecorator("addFiles", {
          rules: [{ required: false, message: localeText._rule_require_photo }]
        })(
          <MultiplyUploaderForm
            defaultFileList={defaultFileList}
            {...multiplyUploaderParams}
          />
        )}
      </FormItem>

      <EditModalFooter onSubmit={onSubmit} onClose={onClose} />
    </Form>
  );
};

export default Form.create<IProps>()(EditModalContent);
