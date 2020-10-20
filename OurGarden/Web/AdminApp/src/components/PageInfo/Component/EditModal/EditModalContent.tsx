import React, { useRef } from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import EditModalFooter from "@src/core/components/EditModalFooter";
import CKEditor from "@core/components/CKEditor";
import MultiplyUploaderForm, {
  useMultiplyUploaderForm,
} from "@src/core/components/MultiplyUploaderForm";

import localeText from "../Text";
import {
  getAddFilesDTO,
  getUpdateFilesDTO,
  getDefaultFileList,
} from "@src/core/utils/photo";

import { IPageInfo, IPageInfoDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import MetaDataForm from "@src/core/components/MetaDataForm";
import DescriptionTooltip from "@src/core/helpers/Description/DescriptionTooltip";

interface IProps extends FormComponentProps {
  item: IPageInfo | null;
  loading: boolean;
  handleCreateSubmit: (data: IPageInfoDTO) => void;
  handleClose: Function;
}

export const EditModalContent = (props: IProps) => {
  const ckEditor: React.RefObject<CKEditor> = useRef(null);
  const multiplyUploaderParams = useMultiplyUploaderForm();

  const { form } = props;
  const { getFieldDecorator } = form;

  const item = props.item || ({} as IPageInfo);
  // prettier-ignore
  const {
    pageInfoId,
    alias,
    photos,
    description,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = item;

  const onSubmit = async (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const alias = form.getFieldValue("alias");

    const description: string = ckEditor.current!.state.editorApi.getData();

    const seoTitle = form.getFieldValue("seoTitle");
    const seoDescription = form.getFieldValue("seoDescription");
    const seoKeywords = form.getFieldValue("seoKeywords");

    props.form.setFieldsValue({
      description,
    });

    const addFilesDTO = await getAddFilesDTO(multiplyUploaderParams.addFiles);
    const updateFilesDTO = await getUpdateFilesDTO(
      multiplyUploaderParams.updateFiles
    );

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          pageInfoId,
          alias: alias.trim(),

          description,

          seoTitle,
          seoDescription,
          seoKeywords,

          addFiles: addFilesDTO,
          removeFiles: multiplyUploaderParams.removeFiles,
          updateFiles: updateFilesDTO,
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
              message: localeText._rule_require_name,
              transform: (val: string) => val && val.trim(),
            },
          ],
        })(
          <Input
            prefix={<Icon type="edit" className="input-prefix-color" />}
            placeholder={localeText._label_name}
          />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("addFiles", {
          rules: [{ required: false, message: localeText._rule_require_photo }],
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
          rules: [
            {
              required: false,
              max: 128,
              message: "Длина не должна превышать 128 символов",
            },
          ],
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
          rules: [
            {
              required: false,
              max: 256,
              message: "Длина не должна превышать 256 символов",
            },
          ],
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
          rules: [
            {
              required: false,
              max: 512,
              message: "Длина не должна превышать 512 символов",
            },
          ],
        })(
          <MetaDataForm
            checkboxText="Указать ключевые слова (через запятую)"
            minRows={2}
            maxRows={4}
          />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("description", {
          rules: [{ required: false }],
        })(
          <CKEditor
            ref={ckEditor}
            tooltip={<DescriptionTooltip />}
            data={description}
          />
        )}
      </FormItem>

      <EditModalFooter onSubmit={onSubmit} onClose={onClose} />
    </Form>
  );
};

export default Form.create<IProps>()(EditModalContent);
