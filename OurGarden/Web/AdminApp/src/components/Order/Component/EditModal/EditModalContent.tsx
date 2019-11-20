import React from "react";
import moment from "moment";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Select from "@core/antd/Select";
import Input, { TextArea } from "@core/antd/Input";
import Button from "@core/antd/Button";
import AgGrid from "@core/components/AgGrid";

import { IOrder, IOrderDTO, IOrderStatus } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { ColDef } from "ag-grid-community";

interface IProps extends FormComponentProps {
  item: IOrder;
  statusList: IOrderStatus[];
  loading: boolean;
  handleCreateSubmit: (data: IOrderDTO) => void;
  handleClose: Function;
}

const columns: ColDef[] = [
  {
    headerName: "Категория",
    field: "categoryAlias"
  },
  {
    headerName: "Подкатегория",
    field: "subcategoryAlias"
  },
  {
    headerName: "Продукт",
    field: "productAlias"
  },
  {
    headerName: "Старое наим. продукта",
    field: "oldProductAlias"
  },
  {
    headerName: "Цена за шт.",
    field: "price",
    type: ["number"]
  },
  {
    headerName: "Кол-во",
    field: "number",
    type: ["number"]
  }
];

export const EditModalContent = (props: IProps) => {
  const { form, statusList } = props;
  const { getFieldDecorator } = form;
  const {
    date,
    description,
    email,
    fio,
    orderId,
    orderPositions,
    phone,
    status,
    totalPrice
  } = props.item;

  const onSubmit = (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const statusId = form.getFieldValue("statusId");
    const description = form.getFieldValue("description");

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          orderId: orderId,
          description: description,
          statusId: statusId
        });
      }
    });
  };

  const onClose = () => props.handleClose();

  return (
    <Form layout="vertical" onSubmit={onSubmit}>
      <FormItem label="ФИО">
        {getFieldDecorator("fio", {
          initialValue: fio
        })(<Input disabled />)}
      </FormItem>

      <FormItem label="Номер">
        {getFieldDecorator("phone", {
          initialValue: phone
        })(<Input disabled />)}
      </FormItem>

      <FormItem label="Почта">
        {getFieldDecorator("email", {
          initialValue: email
        })(<Input disabled />)}
      </FormItem>

      <FormItem label="Дата заказа">
        {getFieldDecorator("date", {
          initialValue: moment(date).format("DD.MM.YYYY HH:mm:ss")
        })(<Input disabled />)}
      </FormItem>

      <FormItem label="Сумма заказа">
        {getFieldDecorator("totalPrice", {
          initialValue: totalPrice
        })(<Input disabled />)}
      </FormItem>

      <FormItem label="Статус заказа">
        {getFieldDecorator("statusId", {
          initialValue: status.statusId
        })(
          <Select placeholder="Статус">
            {statusList.map(x => (
              <Select.Option key={x.statusId} value={x.statusId}>
                {x.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </FormItem>

      <FormItem label="Примечание">
        {getFieldDecorator("description", {
          initialValue: description
        })(<TextArea />)}
      </FormItem>

      <div className="grid-wrapper">
        <AgGrid columns={columns} rowData={orderPositions} readOnly />
      </div>

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
