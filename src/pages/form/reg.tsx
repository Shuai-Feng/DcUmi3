import * as React from 'react';
import { Form, Button, Card, Input, Modal } from 'antd';
import './style.less';
const FormItem = Form.Item;

export interface IAppProps {
  form: any;
}

export interface IAppState {}

class RegForm extends React.Component<IAppProps, IAppState> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4,
      },
      wrapperCol: {
        xs: 24,
        sm: 12,
      },
    };

    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('userName', {
                initalValue: '',
                rules: [
                  {
                    require: true,
                    message: '用户名不能为空',
                  },
                ],
              })(<Input placeholder="请输入用户名"></Input>)}
            </FormItem>
            <FormItem></FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(RegForm);
