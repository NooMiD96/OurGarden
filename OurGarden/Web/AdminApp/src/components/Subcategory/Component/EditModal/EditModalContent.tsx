import React, { useState } from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import Select from "@core/antd/Select";
import Checkbox from "@core/antd/Checkbox";
import MultiplyUploader from "@src/core/components/MultiplyUploader";

import { filterOption } from "@core/utils/select";
import localeText from "../Text";

import { ISubcategory, ISubcategoryDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { ICategoryDictionary } from "@src/components/Category/State";
import { UploadFile } from "@core/antd/Upload";

interface IProps extends FormComponentProps {
  item: ISubcategory | null;
  loading: boolean;
  dropdownData: ICategoryDictionary[];
  handleCreateSubmit: (data: ISubcategoryDTO) => void;
  handleClose: Function;
}

export const EditModalContent = (props: IProps) => {
  const [addFiles, setAddFiles] = useState([] as UploadFile[]);
  const [updateFiles, setUpdateFiles] = useState(
    [] as { uid: string; url: string }[]
  );
  const [removeFiles, setRemoveFiles] = useState([] as string[]);

  const { form, item } = props;
  const { getFieldDecorator } = form;
  const { subcategoryId, categoryId, alias, photos, isVisible }
    = item || ({ isVisible: true } as ISubcategory);

  const onSubmit = async (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const newCategoryId = form.getFieldValue("newCategoryId");

    const alias = form.getFieldValue("alias");
    const isVisible = form.getFieldValue("isVisible");

    const addFilesDTO: File[] = [];
    for (let i = 0; i < addFiles.length; i++) {
      const file = addFiles[i];

      if (file.originFileObj) {
        addFilesDTO.push(file.originFileObj as File);

        const previewFile: any = await fetch(file.preview!).then(res =>
          res.blob()
        );

        previewFile.lastModified = new Date().getTime();
        previewFile.name = file.name;
        addFilesDTO.push(previewFile as File);
      }
    }

    const updateFilesDTO: File[] = [];
    for (let i = 0; i < updateFiles.length; i++) {
      const file = updateFiles[i];

      const previewFile: any = await fetch(file.url).then(res => res.blob());

      previewFile.lastModified = new Date().getTime();
      previewFile.name = file.uid;
      updateFilesDTO.push(previewFile as File);
    }

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          categoryId,
          subcategoryId,

          newCategoryId,

          alias,
          isVisible,
          addFiles: addFilesDTO,
          removeFiles,
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

  const updatePreview = (fileUid: string, fileUrl: string) => {
    const findIndex = updateFiles.findIndex(x => x.uid === fileUid);
    if (findIndex !== -1) {
      setUpdateFiles(
        updateFiles.map((x, index) => {
          if (index === findIndex) {
            return { uid: fileUid, url: fileUrl };
          } else {
            return x;
          }
        })
      );
    } else {
      setUpdateFiles([...updateFiles, { uid: fileUid, url: fileUrl }]);
    }
  };

  const defaultFileList = photos
    ? photos.map(photo => {
        return {
          uid: photo.photoId,
          name: photo.photoId,
          status: "done",
          url: photo.url,
          preview: photo.previewUrl
        } as UploadFile;
      })
    : [];

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
            updatePreview={updatePreview}
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
