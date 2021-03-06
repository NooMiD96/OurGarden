import React, { useRef } from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import EditModalFooter from "@src/core/components/EditModalFooter";
import Select from "@core/antd/Select";
import CKEditor from "@core/components/CKEditor";
import InputNumber from "@core/antd/InputNumber";
import Checkbox from "@core/antd/Checkbox";
import MultiplyUploaderForm, {
  useMultiplyUploaderForm,
} from "@src/core/components/MultiplyUploaderForm";
import MetaDataForm from "@src/core/components/MetaDataForm";
import DescriptionTooltip from "@src/core/helpers/Description/DescriptionTooltip";

import localeText from "../Text";
import { filterOption } from "@core/utils/select";
import {
  getAddFilesDTO,
  getUpdateFilesDTO,
  getDefaultFileList,
} from "@src/core/utils/photo";

import { IProduct, IProductDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { IItemDictionary } from "@components/Category/State";

interface IProps extends FormComponentProps {
  item: IProduct | null;
  categoryList: IItemDictionary[];
  loading: boolean;
  handleCreateSubmit: (data: IProductDTO) => void;
  handleClose: () => void;
}

const getSubcategoryList = (
  selectedCategoryId: string,
  categoryList: IItemDictionary[]
) => {
  const category = categoryList.find((x) => x.itemId === selectedCategoryId);
  if (!category) {
    return [];
  }

  return category.subDictionary || [];
};

export const EditModalContent = (props: IProps) => {
  const ckEditor: React.RefObject<CKEditor> = useRef(null);
  const multiplyUploaderParams = useMultiplyUploaderForm();

  const { form, categoryList } = props;
  const { getFieldDecorator } = form;

  const item = props.item || ({ isVisible: true } as IProduct);
  const {
    categoryId,
    alias,
    price,
    description,
    photos,
    isVisible,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = item;
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

    const description: string = ckEditor.current!.state.editorApi.getData();

    const alias = form.getFieldValue("alias");
    const isVisible = form.getFieldValue("isVisible");
    const price = form.getFieldValue("price");

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
          categoryId: item ? item.categoryId : "",
          subcategoryId: item ? item.subcategoryId : "",
          productId: item ? item.productId : "",

          newCategoryId,
          newSubcategoryId,

          alias: alias.trim(),
          isVisible,
          price,
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
        {getFieldDecorator("newCategoryId", {
          initialValue: categoryId,
          rules: [
            {
              required: true,
              message: localeText._rule_require_select_category,
            },
          ],
        })(
          <Select
            showSearch
            placeholder={localeText._label_category}
            onChange={() => {
              form.setFieldsValue({
                newSubcategoryId: undefined,
              });
            }}
            filterOption={filterOption}
          >
            {categoryList.map((x) => (
              <Select.Option key={x.itemId} value={x.itemId}>
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
              message: localeText._rule_require_select_subcategory,
            },
          ],
        })(
          <Select
            showSearch
            placeholder={localeText._label_subcategory}
            filterOption={filterOption}
          >
            {subcategoryList.map((x) => (
              <Select.Option key={x.itemId} value={x.itemId}>
                {x.alias}
              </Select.Option>
            ))}
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
              transform: (val: string) => val && val.trim(),
            },
          ],
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
          valuePropName: "checked",
        })(<Checkbox>Продукт виден пользователю</Checkbox>)}
      </FormItem>

      <FormItem>
        {getFieldDecorator("price", {
          initialValue: price,
          rules: [{ required: true, message: localeText._rule_require_price }],
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
          rules: [
            { required: true, message: localeText._rule_require_description },
          ],
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
