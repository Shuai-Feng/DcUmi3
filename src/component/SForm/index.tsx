import React, { useEffect } from 'react';
import Moment from 'moment';
import {
  Form,
  DatePicker,
  Input,
  Checkbox,
  Select,
  Button,
  Modal,
  message,
} from 'antd';

import { FormComponentProps } from 'antd/es/form';
// 声明一个类型表单类型
declare type FormLayout = 'horizontal' | 'inline' | 'vertical';
const FormItem = Form.Item;
const Option = Select.Option;

export interface SFormItemProps {
  type: 'Select' | 'Input' | 'DateZoom' | 'Checked' | 'SimpleDateZoom';
  label?: string;
  field: string;
  initialValue?: any;
  placeholder?: string;
  width?: number;
  list?: Array<{name: string ,id: string | number}>;
}
interface ISFformProps extends FormComponentProps {
  FormType?: FormLayout;
  FormList: Array<SFormItemProps>;
  handleSubmit?: Function;
}

const SFform: React.FunctionComponent<ISFformProps> = props => {
  let { resetFields, validateFields, getFieldsValue } = props.form;
  let initialForm = () => {
    let { getFieldDecorator } = props.form;
    let FormList = props.FormList;
    const FormItemList: Array<any> = [];
    if (FormList && FormList.length > 0) {
      FormList.forEach((item, index) => {
        //表单项的标题名称
        let label = item.label || '';
        //表单项的字段名
        let field = item.field || '';
        //表单项的哥哥初始值
        let initialValue = item.initialValue || '';
        //表单项的默认提示信息
        let placeholder = item.placeholder;
        //表单向的狂赌
        let width = item.width;
        if (item.type == 'DateZoom') {
          const begin_time = (
            <FormItem label={label} key={field + 'begin'}>
              {getFieldDecorator(`${field}_begin`)(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />,
              )}
            </FormItem>
          );
          FormItemList.push(begin_time);
          const end_time = (
            <FormItem label={'~'} colon={false} key={field + 'end'}>
              {getFieldDecorator(`${field}_end`)(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />,
              )}
            </FormItem>
          );
          FormItemList.push(end_time);
        } else if (item.type == 'Input') {
          const INPUT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator(`${field}`, {
                initialValue,
              })(<Input type="text" placeholder={placeholder} />)}
            </FormItem>
          );
          FormItemList.push(INPUT);
        } else if (item.type == 'Checked') {
          const CHECKBOX = (
            <FormItem label={label} key={field}>
              {getFieldDecorator(`${field}`, {
                valuePropName: 'checked',
                initialValue,
              })(<Checkbox>{label}</Checkbox>)}
            </FormItem>
          );
          FormItemList.push(CHECKBOX);
        } else if (item.type == 'Select') {
          const SELECT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator(`${field}`, {
                initialValue,
              })(
                <Select style={{ width }} placeholder={placeholder}>
                  {item.list?.map(item => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </FormItem>
          );
          FormItemList.push(SELECT);
        } else if (item.type == 'SimpleDateZoom') {
          const SMDate = (
            <FormItem label={label} key={field}>
              {getFieldDecorator(`${field}`, {
                initialValue: initialValue
                  ? Moment(initialValue)
                  : Moment(+new Date()),
              })(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />,
              )}
            </FormItem>
          );
          FormItemList.push(SMDate);
        }
      });
    }
    return FormItemList;
  };
  let handleFormSubmit = () => {
    let formData = getFieldsValue();
    if (props.handleSubmit) {
      props.handleSubmit(formData);
    }
  };
  let handleFormReset = () => {
    resetFields();
  };
  return (
    <div className="SFform">
      <Form layout={props.FormType || 'inline'}>
        {initialForm()}
        <FormItem>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={handleFormSubmit}
          >
            查询
          </Button>
          <Button type="primary" onClick={handleFormReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create<ISFformProps>()(SFform);
