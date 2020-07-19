import * as React from 'react';
import { Card, Button, Form, Input } from 'antd';
const FormItem = Form.Item;

export interface IUserProps {}

export interface IUserState {}

export default class User extends React.Component<IUserProps, IUserState> {
  constructor(props: IUserProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        <Card>
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登 录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card>
          <Button icon="plus" type="primary">
            创建员工
          </Button>
          <Button icon="edit">编辑员工</Button>
          <Button>员工详情</Button>
          <Button icon="delete" type="danger">
            删除员工
          </Button>
        </Card>
      </div>
    );
  }
}
