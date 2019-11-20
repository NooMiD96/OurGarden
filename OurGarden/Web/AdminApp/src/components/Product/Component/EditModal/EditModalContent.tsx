import React, { useState, useRef } from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import Select from "@core/antd/Select";
import CKEditor from "@core/components/CKEditor";
import InputNumber from "@core/antd/InputNumber";
import Checkbox from "@core/antd/Checkbox";
import MultiplyUploader from "@src/core/components/MultiplyUploader";

import localeText from "../Text";
import { filterOption } from "@core/utils/select";

import { IProduct, IProductDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { ICategoryDictionary } from "@components/Category/State";
import { UploadFile } from "@core/antd/Upload";

interface IProps extends FormComponentProps {
  item: IProduct | null;
  categoryList: ICategoryDictionary[];
  loading: boolean;
  handleCreateSubmit: (data: IProductDTO) => void;
  handleClose: () => void;
}

const getSubcategoryList = (
  selectedCategoryId: string,
  categoryList: ICategoryDictionary[]
) => {
  const category = categoryList.find(x => x.categoryId === selectedCategoryId);
  if (!category) {
    return [];
  }

  return category.subcategories || [];
};

export const EditModalContent = (props: IProps) => {
  const ckEditor: React.RefObject<CKEditor> = useRef(null);
  const [addFiles, setAddFiles] = useState([] as UploadFile[]);
  const [updateFiles, setUpdateFiles] = useState(
    [] as { uid: string; url: string }[]
  );
  const [removeFiles, setRemoveFiles] = useState([] as string[]);

  const { form, item, categoryList } = props;
  const { getFieldDecorator } = form;
  const { categoryId, alias, price, description, photos, isVisible }
    = item || ({ isVisible: true } as IProduct);
  let { subcategoryId } = item || ({} as IProduct);

  const selectedCategoryId = form.isFieldTouched("newCategoryId")
    ? form.getFieldValue("newCategoryId")
    : categoryId;
  subcategoryId = form.isFieldTouched("newCategoryId")
    ? form.getFieldValue("newSubcategoryId")
    : subcategoryId;

  const subcategoryList = getSubcategoryList(selectedCategoryId, categoryList);

  const onSubmit = async (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const { form, item } = props;

    const newCategoryId = form.getFieldValue("newCategoryId");
    const newSubcategoryId = form.getFieldValue("newSubcategoryId");

    const description: string = ckEditor.current!.state.editor.getData();

    const alias = form.getFieldValue("alias");
    const isVisible = form.getFieldValue("isVisible");
    const price = form.getFieldValue("price");

    props.form.setFieldsValue({
      description
    });

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
          categoryId: item ? item.categoryId : "",
          subcategoryId: item ? item.subcategoryId : "",
          productId: item ? item.productId : "",

          newCategoryId,
          newSubcategoryId,

          alias,
          isVisible,
          price,
          description,

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
            {
              required: true,
              message: localeText._rule_require_select_category
            }
          ]
        })(
          <Select
            showSearch
            placeholder={localeText._label_category}
            onChange={() => {
              form.setFieldsValue({
                newSubcategoryId: undefined
              });
            }}
            filterOption={filterOption}
          >
            {categoryList.map(x => (
              <Select.Option key={x.categoryId} value={x.categoryId}>
                {x.alias}
              </Select.Option>
            ))}
          </Select>
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("newSubcategoryId", {
          initialValue: subcategoryId,
          rules: [
            {
              required: true,
              message: localeText._rule_require_select_subcategory
            }
          ]
        })(
          <Select
            showSearch
            placeholder={localeText._label_subcategory}
            filterOption={filterOption}
          >
            {subcategoryList.map(x => (
              <Select.Option key={x.subcategoryId} value={x.subcategoryId}>
                {x.alias}
              </Select.Option>
            ))}
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
        {getFieldDecorator("price", {
          initialValue: price,
          rules: [{ required: true, message: localeText._rule_require_price }]
        })(
          <InputNumber
            placeholder={localeText._label_price}
            onPressEnter={onSubmit}
            min={0}
          />
        )}
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

      <FormItem>
        {getFieldDecorator("description", {
          rules: [
            { required: true, message: localeText._rule_require_description }
          ]
        })(<CKEditor ref={ckEditor} data={description} />)}
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
