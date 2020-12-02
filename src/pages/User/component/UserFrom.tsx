import React, { useEffect } from 'react';
import { DatePicker, Form, Input, Radio, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import Moment from 'moment';
import SFevent from '@/utils/SFevent';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

interface IUserFormProps extends FormComponentProps {
  //单个员工信息
  userInfo: any;
  type?: any;
}

const UserForm: React.FunctionComponent<IUserFormProps> = props => {
  //使用接口方法获取双向不能单关联接口
  const { userInfo, type } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  let getUserState = (state: string) => {
    let config = {
      '1': '咸鱼一条',
      '2': '风华浪子',
      '3': '北大才子一枚',
      '4': '百度FE',
      '5': '创业者',
    };
    return config[state];
  };

  useEffect(() => {
    //触发模块用户创建 同时传递
    SFevent.ee_emit('userForm_create', props.form);
  }, []);

  return (
    <div className="UserForm">
      <Form layout="horizontal">
        <FormItem label="姓名" {...formLayout}>
          {userInfo && type == 'detail'
            ? userInfo.username
            : getFieldDecorator('user_name', {
                initialValue: userInfo?.username,
              })(<Input />)}
        </FormItem>
        <FormItem label="性别" {...formLayout}>
          {userInfo && type == 'detail'
            ? userInfo.sex == 1
              ? '男'
              : '女'
            : getFieldDecorator('user_sex', {
                initialValue: userInfo?.sex,
              })(
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>,
              )}
        </FormItem>
        <FormItem label={'状态'} {...formLayout}>
          {userInfo && type == 'detail'
            ? getUserState(userInfo.state)
            : getFieldDecorator('state', {
                initialValue: userInfo?.state,
              })(
                <Select>
                  <Option value={1}>咸鱼一条</Option>
                  <Option value={2}>风华浪子</Option>
                  <Option value={3}>北大才子一枚</Option>
                  <Option value={4}>百度FE</Option>
                  <Option value={5}>创业者</Option>
                </Select>,
              )}
        </FormItem>

        <FormItem label={'生日'} {...formLayout}>
          {userInfo && type == 'detail'
            ? userInfo.birthday
            : getFieldDecorator('birthday', {
                initialValue: Moment(userInfo?.birthday),
              })(<DatePicker />)}
        </FormItem>
        <FormItem label="联系地址" {...formLayout}>
          {userInfo && type == 'detail'
            ? userInfo.address
            : getFieldDecorator('address', {
                initialValue: userInfo?.address,
              })(<TextArea rows={3} placeholder="请输入联系地址" />)}
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create<IUserFormProps>()(UserForm);
