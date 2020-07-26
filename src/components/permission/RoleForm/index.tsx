import * as React from 'react';
import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';

const FormItem = Form.Item;
const Option = Select.Option;

export interface IRoleFromProps extends FormComponentProps {}

export interface IRoleFromState {}

class RoleFrom extends React.Component<IRoleFromProps, IRoleFromState> {
  constructor(props: IRoleFromProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    const formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    return (
      <Form>
        <FormItem {...formLayout} label="角色名称">
          {getFieldDecorator('role_name', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '必须输入用户名噢',
              },
            ],
          })(<Input type="text" placeholder="请输入角色名称" />)}
        </FormItem>
        <FormItem {...formLayout} label="权限状态">
          {getFieldDecorator('state', {
            initialValue: '请选择状态',
          })(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>,
          )}
        </FormItem>
      </Form>
    );
  }
}
export default Form.create<IRoleFromProps>({})(RoleFrom);
