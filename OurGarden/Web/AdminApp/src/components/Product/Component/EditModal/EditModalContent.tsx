import React, {useRef} from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import Select from "@core/antd/Select";
import CKEditor from "@core/components/CKEditor";
import InputNumber from "@core/antd/InputNumber";
import localeText from "../Text";

import { FileUploader } from "@src/core/components/Uploader/File";

import { ICategoryDictionary, IProduct, IProductDTO } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";

interface IProps extends FormComponentProps {
  item: IProduct | null;
  categoryList: ICategoryDictionary[];
  loading: boolean;
  handleCreateSubmit: (data: IProductDTO) => void;
  handleClose: () => void;
}

const onSubmitHandler = (
  props: IProps,
  ckEditor: React.RefObject<CKEditor>,
  e?: IPressEnterEvent | React.FormEvent
) => {
  e && e.preventDefault();

  const { form, item } = props;

  const newCategoryId = form.getFieldValue("newCategoryId");
  const newSubcategoryId = form.getFieldValue("newSubcategoryId");

  const description: string = ckEditor.current!.state.editor.getData();

  const alias = form.getFieldValue("alias");
  const price = form.getFieldValue("price");
  const image = form.getFieldValue("image");

  props.form.setFieldsValue({
    description,
  });

  props.form.validateFields((err: any, _values: any) => {
    if (!err) {
      props.handleCreateSubmit({
        categoryId: item ? item.categoryId : "",
        subcategoryId: item ? item.subcategoryId : "",
        productId: item ? item.productId : "",

        newCategoryId,
        newSubcategoryId,

        alias,
        price,
        description,
        file: image,
      });
    }
  });
};

const onClose = (props: IProps, e?: IPressEnterEvent | React.FormEvent) => {
  e && e.preventDefault();

  props.handleClose();
};

const getSubcategoryList = (
  selectedCategoryId: string,
  categoryList: ICategoryDictionary[]
) => {
  const category = categoryList.find(x => x.categoryId === selectedCategoryId);
  if (!category) {
    return [];
  }

  return category.subcategories || [];
}

export const EditModalContent = (props: IProps) => {
  const ckEditor: React.RefObject<CKEditor> = useRef(null);

  const { form, item, categoryList } = props;
  const { getFieldDecorator } = form;
  const { categoryId, alias, price, description, photos} = item || {} as IProduct;
  let { subcategoryId } = item || {} as IProduct;

  const onUploadImage = (image?: File) => {
    form.setFieldsValue({
      image
    });
  };

  const selectedCategoryId = form.isFieldTouched("newCategoryId") ? form.getFieldValue("newCategoryId") : categoryId;
  subcategoryId = form.isFieldTouched("newCategoryId") ? form.getFieldValue("newSubcategoryId") : subcategoryId;

  const subcategoryList = getSubcategoryList(selectedCategoryId, categoryList);

  const onSubmit = (e?: IPressEnterEvent | React.FormEvent) => onSubmitHandler(props, ckEditor, e);

  const photo = photos && photos[0];

  return (
    <Form layout="vertical" onSubmit={onSubmit}>
      <FormItem>
        {getFieldDecorator("newCategoryId", {
          initialValue: categoryId,
          rules: [{ required: true, message: localeText._rule_require_select_category }]
        })(
          <Select
            placeholder={localeText._label_category}
            onChange={() => {
              form.setFieldsValue({
                newSubcategoryId: undefined
              })
            }}
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
          rules: [{ required: true, message: localeText._rule_require_select_subcategory }]
        })(
          <Select
            placeholder={localeText._label_subcategory}
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
        {getFieldDecorator("image", {
          initialValue: photo ? photo.url : null,
          rules: [{ required: true, message: localeText._rule_require_photo }]
        })(
          <FileUploader
            onUpload={onUploadImage}
            oldImageUrl={photo ? photo.url : null}
          />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("description", {
          rules: [{ required: true, message: localeText._rule_require_description }]
        })(
          <CKEditor ref={ckEditor} data={description} />
        )}
      </FormItem>

      <div className="ant-modal-footer">
        <Button type="primary" onClick={onSubmit}>
          Сохранить
        </Button>
        <Button type="danger" onClick={(e) => onClose(props, e)}>
          Отмена
        </Button>
      </div>
    </Form>
  );
};

export default Form.create<IProps>()(EditModalContent);
