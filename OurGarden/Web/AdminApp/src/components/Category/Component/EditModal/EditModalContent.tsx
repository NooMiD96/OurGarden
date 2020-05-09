import React from "react";

import Form, { FormItem } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import EditModalFooter from "@src/core/components/EditModalFooter";
import Checkbox from "@core/antd/Checkbox";
import MultiplyUploaderForm, {
  useMultiplyUploaderForm
} from "@src/core/components/MultiplyUploaderForm";

import localeText from "../Text";
import {
  getAddFilesDTO,
  getUpdateFilesDTO,
  getDefaultFileList
} from "@core/utils/photo";

import { ICategory } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { IEditModalContentProps } from "./IEditModal";
import MetaDataForm from "@src/core/components/MetaDataForm";

export const EditModalContent = (props: IEditModalContentProps) => {
  const multiplyUploaderParams = useMultiplyUploaderForm();

  const { form } = props;
  const { getFieldDecorator } = form;

  const item = props.item || ({ isVisible: true } as ICategory);
  // prettier-ignore
  const {
    categoryId,
    alias,
    photos,
    isVisible,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = item;

  const onSubmit = async (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const alias = form.getFieldValue("alias");
    const isVisible = form.getFieldValue("isVisible");

    const seoTitle = form.getFieldValue("seoTitle");
    const seoDescription = form.getFieldValue("seoDescription");
    const seoKeywords = form.getFieldValue("seoKeywords");

    const addFilesDTO = await getAddFilesDTO(multiplyUploaderParams.addFiles);
    const updateFilesDTO = await getUpdateFilesDTO(
      multiplyUploaderParams.updateFiles
    );

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          categoryId,
          alias: alias.trim(),
          isVisible,

          seoTitle,
          seoDescription,
          seoKeywords,

          addFiles: addFilesDTO,
          removeFiles: multiplyUploaderParams.removeFiles,
          updateFiles: updateFilesDTO
        });
      }
    });
  };

  const onClose = () => {
    form.resetFields();
    props.handleClose();
  };

  const defaultFileList = getDefaultFileList(photos);

  return (
    <Form layout="vertical" onSubmit={onSubmit}>
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
        })(<Checkbox>Категория видна пользователю</Checkbox>)}
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

      <FormItem>
        {getFieldDecorator("seoTitle", {
          initialValue: seoTitle,
          rules: [{ required: false, max: 70, message: "Длина не должна превышать 70 символов" }]
        })(
          <MetaDataForm
            checkboxText="Указать заголовок"
            minRows={1}
            maxRows={1}
          />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("seoDescription", {
          initialValue: seoDescription,
          rules: [{ required: false, max: 150, message: "Длина не должна превышать 150 символов" }]
        })(
          <MetaDataForm
            checkboxText="Указать описание"
            minRows={2}
            maxRows={3}
          />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("seoKeywords", {
          initialValue: seoKeywords,
          rules: [{ required: false, max: 512, message: "Длина не должна превышать 150 символов" }]
        })(
          <MetaDataForm
            checkboxText="Указать ключевые слова (через запятую)"
            minRows={2}
            maxRows={4}
          />
        )}
      </FormItem>

      <EditModalFooter onSubmit={onSubmit} onClose={onClose} />
    </Form>
  );
};

export default Form.create<IEditModalContentProps>()(EditModalContent);
