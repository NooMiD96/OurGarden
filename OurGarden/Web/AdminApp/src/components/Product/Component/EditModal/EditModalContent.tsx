import React, { useState, useRef } from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import EditModalFooter from "@src/core/components/EditModalFooter";
import Select from "@core/antd/Select";
import CKEditor from "@core/components/CKEditor";
import InputNumber from "@core/antd/InputNumber";
import Checkbox from "@core/antd/Checkbox";
import MultiplyUploader from "@src/core/components/MultiplyUploader";

import localeText from "../Text";
import { filterOption } from "@core/utils/select";
import {
  getAddFilesDTO,
  getUpdateFilesDTO,
  getDefaultFileList,
  updatePreview
} from "@src/core/utils/photo";

import { IProduct, IProductDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { ICategoryDictionary } from "@components/Category/State";
import { UploadFile } from "@core/antd/Upload";
import { IUpdateFile } from "@src/core/utils/photo/IPhotoUtils";

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
  const [updateFiles, setUpdateFiles] = useState([] as IUpdateFile[]);
  const [removeFiles, setRemoveFiles] = useState([] as string[]);

  const { form, categoryList } = props;
  const { getFieldDecorator } = form;

  const item = props.item || ({ isVisible: true } as IProduct);
  const { categoryId, alias, price, description, photos, isVisible } = item;
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

    const addFilesDTO = await getAddFilesDTO(addFiles);
    const updateFilesDTO = await getUpdateFilesDTO(updateFiles);

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

  const updatePreviewHandler = (uid: string, url: string) => {
    updatePreview(updateFiles, setUpdateFiles, { uid, url });
  };

  const defaultFileList = getDefaultFileList(photos);

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
        })(<Checkbox>Продукт виден пользователю</Checkbox>)}
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
            updatePreview={updatePreviewHandler}
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

export default Form.create<IProps>()(EditModalContent);
