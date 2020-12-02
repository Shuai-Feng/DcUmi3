import * as React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Button, DatePicker, Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

interface IOrderFromProps extends FormComponentProps {}

const OrderFrom: React.FunctionComponent<IOrderFromProps> = props => {
  let { getFieldDecorator } = props.form;
  return (
    <div className="OrderForm">
      <Form layout="inline">
        <FormItem label="城市名称">
          {getFieldDecorator('order_city', {
            initialValue: '',
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="beijign">北京</Option>
              <Option value="tianjin">天津</Option>
              <Option value="shanghai">上海</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="订单时间">
          {getFieldDecorator('start_time')(
            <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </FormItem>
        <FormItem label="~" colon={false}>
          {getFieldDecorator('end_time')(
            <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </FormItem>
        <FormItem label="订单状态">
          {getFieldDecorator('order_status', {
            initialValue: '1',
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="1">进行中</Option>
              <Option value="2">结束行程</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ marginRight: 10 }}>
            查询
          </Button>
          <Button type="primary">重置</Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create()(OrderFrom);
