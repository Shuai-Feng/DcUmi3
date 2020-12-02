import React, { useEffect } from 'react';
import { Form, Select, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import SFevent from '@/utils/SFevent';
const Option = Select.Option;
const FormItem = Form.Item;

interface IFilterFormProps extends FormComponentProps {}

const FilterForm: React.FunctionComponent<IFilterFormProps> = props => {
  let { getFieldDecorator } = props.form;
  useEffect(() => {
    SFevent.ee_emit('getMyFilter', props.form);
  }, []);
  return (
    <div className="FilterForm">
      <Form layout="inline">
        <FormItem label="城市选择">
          {getFieldDecorator('city_id', {
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select placeholder="请选择城市" style={{ width: 80 }}>
              <Option value="1">北京</Option>
              <Option value="2">石家庄</Option>
              <Option value="3">河北</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="停车模式">
          {getFieldDecorator('modal', {
            rules: [{ required: true }],
          })(
            <Select placeholder="请选择停车模式" style={{ width: 120 }}>
              <Option value="">全部</Option>
              <Option value="1">指定点停车模式</Option>
              <Option value="2">禁停区模式</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="加盟商授权状态">
          {getFieldDecorator('op_mode', {
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select placeholder="加盟商状态" style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">已授权</Option>
              <Option value="2">未授权</Option>
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

export default Form.create()(FilterForm);
