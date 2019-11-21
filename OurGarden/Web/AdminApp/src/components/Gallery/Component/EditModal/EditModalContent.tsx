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
  updatePreview,
  getDefaultFileList
} from "@src/core/utils/photo";

import { IGallery, IGalleryDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { UploadFile } from "@core/antd/Upload";
import { IUpdateFile } from "@src/core/utils/photo/IPhotoUtils";

interface IProps extends FormComponentProps {
  item: IGallery | null;
  loading: boolean;
  handleCreateSubmit: (data: IGalleryDTO) => void;
  handleClose: Function;
}

export const EditModalContent = (props: IProps) => {
  const [addFiles, setAddFiles] = useState([] as UploadFile[]);
  const [updateFiles, setUpdateFiles] = useState([] as IUpdateFile[]);
  const [removeFiles, setRemoveFiles] = useState([] as string[]);

  const { form } = props;
  const { getFieldDecorator } = form;

  const item = props.item || ({ isVisible: true } as IGallery);
  const { galleryId, name, photos, isVisible } = item;

  const onSubmit = async (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const name = form.getFieldValue("name");
    const isVisible = form.getFieldValue("name");

    const addFilesDTO = await getAddFilesDTO(addFiles);
    const updateFilesDTO = await getUpdateFilesDTO(updateFiles);

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          galleryId,
          name,
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
        {getFieldDecorator("name", {
          initialValue: name,
          rules: [{ required: true, message: localeText._rule_require_name }]
        })(
          <Input
            prefix={<Icon type="edit" className="input-prefix-color" />}
            placeholder={localeText._label_name}
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
