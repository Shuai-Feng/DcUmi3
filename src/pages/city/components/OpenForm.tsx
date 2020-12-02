import React, { useEffect } from 'react';
import { Form, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import SFevent from '@/utils/SFevent';

const Option = Select.Option;
const FormItem = Form.Item;

interface IOpenFormProps extends FormComponentProps {}

const OpenForm: React.FunctionComponent<IOpenFormProps> = props => {
  let { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };

  useEffect(() => {
    //把 这个容器给父组件传过去
    SFevent.ee_emit('getOpenCity', props.form);
  }, []);

  return (
    <div className="OpenForm">
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="选择城市">
          {getFieldDecorator('open_city', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请选择开通城市',
              },
            ],
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="beijing">北京市</Option>
              <Option value="tianjin">天津市</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="运营模式">
          {getFieldDecorator('open_mode', {
            initialValue: 1,
          })(
            <Select>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="用车模式">
          {getFieldDecorator('open_useMode', {
            initialValue: '1',
          })(
            <Select>
              <Option value="1">指定区域停车</Option>
              <Option value="2">禁停区</Option>
            </Select>,
          )}
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create()(OpenForm);
