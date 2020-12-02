import React from 'react';
import { Card, Form, Button, Input, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
const FormItem = Form.Item;

interface ILoginPageProps extends FormComponentProps {
  text:string
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = props => {
  let { getFieldDecorator } = props.form;
  return (
    <div className="loginPage">
      <Card title="行内表单" style={{ marginBottom: 10 }}>
        <Form layout="inline">
          <FormItem>
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem>
            <Input placeholder="请输入密码" />
          </FormItem>
          <FormItem>
            <Button type="primary" style={{ marginRight: 10 }}>
              登陆
            </Button>
            <Button>注册</Button>
          </FormItem>
        </Form>
      </Card>
      <Card title="用户登陆的行内表单" style={{ width: 300 }}>
        <Form>
          <FormItem label="用户名">
            {getFieldDecorator('useName', {
              rules: [{ required: true }],
            })(<Input />)}
          </FormItem>
          <FormItem label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('agree', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>我已阅读 wbwbwbwbwbw</Checkbox>)}
          </FormItem>
          <FormItem>
            <Button type="primary" style={{ marginRight: 10 }}>
              登陆
            </Button>
            <Button>注册</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(LoginPage);
