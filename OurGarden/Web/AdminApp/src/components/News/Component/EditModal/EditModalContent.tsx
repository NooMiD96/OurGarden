import React, { useRef } from "react";

import Form, { FormItem } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import EditModalFooter from "@src/core/components/EditModalFooter";
import CKEditor from "@core/components/CKEditor";
import MultiplyUploaderForm, {
  useMultiplyUploaderForm
} from "@core/components/MultiplyUploaderForm";

import localeText from "../Text";
import {
  getAddFilesDTO,
  getUpdateFilesDTO,
  getDefaultFileList
} from "@src/core/utils/photo";

import { INews } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { IEditModalContentProps } from "./IEditModal";

export const EditModalContent = (props: IEditModalContentProps) => {
  const ckEditor: React.RefObject<CKEditor> = useRef(null);
  const multiplyUploaderParams = useMultiplyUploaderForm();

  const { form } = props;
  const { getFieldDecorator } = form;

  const item = props.item || ({} as INews);
  // prettier-ignore
  const {
    newsId,
    title,
    description,
    photos
  } = item;

  const onSubmit = async (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const description: string = ckEditor.current!.state.editor.getData();
    const title = form.getFieldValue("title");

    props.form.setFieldsValue({
      description
    });

    const addFilesDTO = await getAddFilesDTO(multiplyUploaderParams.addFiles);
    const updateFilesDTO = await getUpdateFilesDTO(
      multiplyUploaderParams.updateFiles
    );

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          newsId,
          title: title.trim(),
          description,

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
        {getFieldDecorator("title", {
          initialValue: title,
          rules: [
            {
              required: true,
              message: localeText._rule_require_title,
              transform: (val: string) => val && val.trim()
            }
          ]
        })(
          <Input
            prefix={<Icon type="edit" className="input-prefix-color" />}
            placeholder={localeText._label_title}
            onPressEnter={onSubmit}
          />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("addFiles", {
          rules: [{ required: false, message: localeText._rule_require_photo }]
        })(
          <MultiplyUploaderForm
            defaultFileList={defaultFileList}
            {...multiplyUploaderParams}
            minWidth={800}
            minHeight={450}
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

      <EditModalFooter onSubmit={onSubmit} onClose={onClose} />
    </Form>
  );
};

export default Form.create<IEditModalContentProps>()(EditModalContent);
