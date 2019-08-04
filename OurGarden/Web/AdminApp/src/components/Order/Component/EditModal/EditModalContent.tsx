import React, { createRef } from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";

import { IOrder, IOrderDTO, IOrderPosition } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import AgGrid from "@src/core/components/AgGrid";

interface IProps extends FormComponentProps {
  item: IOrder;
  loading: boolean;
  handleCreateSubmit: (data: IOrderDTO) => void;
  handleClose: Function;
}

export const EditModalContent = (props: IProps) => {
  const { form } = props;
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
    totalprice
  } = props.item;

  const gridRef = createRef<AgGrid<IOrderPosition>>();
  const columns = [
    {
      headerName: "ФИО",
      field: "fio"
    },
    {
      headerName: "Телефон",
      field: "phone"
    },
    {
      headerName: "E-mail",
      field: "email"
    },
    {
      headerName: "Дата",
      field: "date"
    },
    {
      headerName: "Стоимость",
      field: "totalprice"
    },
    {
      headerName: "Статус",
      field: "status"
    }
  ];

  const doubleClickHandler = () => null;
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
      <FormItem>
        {getFieldDecorator("fio", {
          initialValue: fio
        })(<Input disabled />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("email", {
          initialValue: email
        })(<Input disabled />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("phone", {
          initialValue: phone
        })(<Input disabled />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("date", {
          initialValue: date
        })(<Input disabled />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("totalprice", {
          initialValue: totalprice
        })(<Input disabled />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("statusId", {
          initialValue: status.statusId && null
        })(
          <Input prefix={<Icon type="edit" className="input-prefix-color" />} />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("description", {
          initialValue: description
        })(
          <Input prefix={<Icon type="edit" className="input-prefix-color" />} />
        )}
      </FormItem>
      <AgGrid
        ref={gridRef}
        columns={columns}
        rowData={orderPositions}
        onDoubleClickHandler={doubleClickHandler}
      />

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
