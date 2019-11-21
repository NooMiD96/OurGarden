import React, { useState } from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import EditModalFooter from "@src/core/components/EditModalFooter";
import Checkbox from "@core/antd/Checkbox";
import MultiplyUploader from "@src/core/components/MultiplyUploader";

import localeText from "../Text";
import {
  getAddFilesDTO,
  getUpdateFilesDTO,
  getDefaultFileList,
  updatePreview
} from "@core/utils/photo";

import { ICategory, ICategoryDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { UploadFile } from "@core/antd/Upload";
import { IUpdateFile } from "@src/core/utils/photo/IPhotoUtils";

interface IProps extends FormComponentProps {
  item: ICategory | null;
  loading: boolean;
  handleCreateSubmit: (data: ICategoryDTO) => void;
  handleClose: () => void;
}

export const EditModalContent = (props: IProps) => {
  const [addFiles, setAddFiles] = useState([] as UploadFile[]);
  const [updateFiles, setUpdateFiles] = useState([] as IUpdateFile[]);
  const [removeFiles, setRemoveFiles] = useState([] as string[]);

  const { form } = props;
  const { getFieldDecorator } = form;

  const item = props.item || ({ isVisible: true } as ICategory);
  const { categoryId, alias, photos, isVisible } = item;

  const onSubmit = async (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const alias = form.getFieldValue("alias");
    const isVisible = form.getFieldValue("isVisible");

    const addFilesDTO = await getAddFilesDTO(addFiles);
    const updateFilesDTO = await getUpdateFilesDTO(updateFiles);

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          categoryId,
          alias,
          isVisible,

          addFiles: addFilesDTO,
          removeFiles,
          updateFiles: updateFilesDTO
        });
      }
    });
  };

  const onClose = () => {
    form.resetFields();
    props.handleClose();
  };

  const updatePreviewHandler = (uid: string, url: string) => {
    updatePreview(updateFiles, setUpdateFiles, { uid, url });
  };

  const defaultFileList = getDefaultFileList(photos);

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
        {getFieldDecorator("isVisible", {
          initialValue: isVisible,
          valuePropName: "checked"
        })(<Checkbox>Категория видна пользователю</Checkbox>)}
      </FormItem>

      <FormItem>
        {getFieldDecorator("addFiles", {
          rules: [{ required: false, message: localeText._rule_require_photo }]
        })(
          <MultiplyUploader
            defaultFileList={defaultFileList}
            updateAddedList={files => setAddFiles(files)}
            updateRemovedList={file => setRemoveFiles([...removeFiles, file])}
            removeFile={fileUid =>
              setAddFiles(addFiles.filter(x => x.uid !== fileUid))
            }
            updatePreview={updatePreviewHandler}
          />
        )}
      </FormItem>

      <EditModalFooter onSubmit={onSubmit} onClose={onClose} />
    </Form>
  );
};

export default Form.create<IProps>()(EditModalContent);
