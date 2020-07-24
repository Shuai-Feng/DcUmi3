import React from 'react';
import { Form, Input, Radio, Select, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import Utils from '@/utils/index';
import Moment from 'moment';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

interface IUserFormProps extends FormComponentProps {
  userInfo: any;
  type: any;
}
interface IUserFormState {}

class UserForm extends React.Component<IUserFormProps> {
  public render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    const userInfo = this.props.userInfo || {};
    const type = this.props.type;
    console.log(userInfo, type);
    let { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
          <FormItem label="用户名" {...formItemLayout}>
            {userInfo && type == 'detail'
              ? userInfo.userName
              : getFieldDecorator('user_name', {
                  initialValue: userInfo.userName,
                })(<Input type="text" placeholder="请输入姓名" />)}
          </FormItem>
          <FormItem label="性别" {...formItemLayout}>
            {userInfo && type == 'detail'
              ? userInfo.sex == 1
                ? '男'
                : '女'
              : getFieldDecorator('sex', {
                  initialValue: userInfo.sex,
                })(
                  <RadioGroup>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                  </RadioGroup>,
                )}
          </FormItem>
          <FormItem label="状态" {...formItemLayout}>
            {userInfo && type == 'detail'
              ? userInfo.state
              : getFieldDecorator('status', {
                  initialValue: userInfo.state,
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
          <FormItem label="生日" {...formItemLayout}>
            {userInfo && type == 'detail'
              ? userInfo.birthday
              : getFieldDecorator('birthday', {
                  initialValue: Moment(userInfo.birthday),
                })(<DatePicker />)}
          </FormItem>
          <FormItem label="联系地址" {...formItemLayout}>
            {userInfo && type == 'detail'
              ? userInfo.address
              : getFieldDecorator('address', {
                  initialValue: userInfo.address,
                })(<Input.TextArea rows={3} placeholder="请输入联系地址" />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create<IUserFormProps>({})(UserForm);
