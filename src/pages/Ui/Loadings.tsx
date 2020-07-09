import * as React from 'react';
import { Card, Spin, Icon, Alert } from 'antd';
export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const icon = <Icon type="loading" style={{ fontSize: 24 }} />;
    return (
      <div>
        <Card title="spin用法" className="card-warp">
          <Spin size="small"></Spin>
          <Spin style={{ margin: '0px 10px' }}></Spin>
          <Spin size="large"></Spin>
          <Spin indicator={icon} style={{ marginLeft: 10 }} spinning={true} />
        </Card>
        <Card title="内容遮罩">
          <Alert
            message="React"
            description="欢迎来到React高级实战课程"
            type="info"
            style={{ marginBottom: 10 }}
          ></Alert>
          <Spin>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程"
              type="warning"
              style={{ marginBottom: 10 }}
            ></Alert>
          </Spin>
          <Spin tip="加载中">
            <Alert
              message="React"
              description="欢迎来到React高级实战课程"
              type="warning"
              style={{ marginBottom: 10 }}
            ></Alert>
          </Spin>
          <Spin indicator={icon}>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程"
              type="warning"
              style={{ marginBottom: 10 }}
            ></Alert>
          </Spin>
        </Card>
      </div>
    );
  }
}
