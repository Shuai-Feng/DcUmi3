import * as React from 'react';
import { Card, Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

export interface IAppProps {
  //用户进行 表单双向数据传递
  form: any;
}

export interface IAppState {}

class Login extends React.Component<IAppProps, IAppState> {
  state = {};
  handleSubmit = () => {
    let userInfo: any = this.props.form.getFieldsValue();
    this.props.form.validateFields((err: any, value: any) => {
      if (!err) {
        message.success(
          `${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`,
        );
      }
    });
  };
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登陆用行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Button type="primary">登陆</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登陆行内表单">
          <Form style={{ width: 300 }}>
            <FormItem>
              {getFieldDecorator('userName', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空',
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('userPass', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空',
                  },
                ],
              })(<Input placeholder="请输入密码" />)}
            </FormItem>
            <FormItem style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                style={{ marginRight: 10 }}
              >
                注册
              </Button>
              <Button type="primary" onClick={this.handleSubmit}>
                登录
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Login);
