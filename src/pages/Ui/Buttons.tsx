import * as React from 'react';
import { Card, Button, Switch, Radio } from 'antd';
import './ui.less';

export interface IAppProps {}

export interface IAppState {
  loading: boolean;
  size: any;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      loading: false,
      size: 'large',
    };
  }
  handleChange = (e: any) => {
    this.setState({
      size: e.target.value,
    });
  };

  public render() {
    let { loading } = this.state;
    return (
      <div>
        <Card title="基础按钮" className="card-warp">
          <Button type="primary">BF8</Button>
          <Button>BF8</Button>
          <Button type="danger">BF8</Button>
          <Button type="dashed">BF8</Button>
          <Button type="ghost">BF8</Button>
          <Button type="link">BF8</Button>
        </Card>
        <Card title="图形按钮" className="card-warp">
          <Button icon="plus" type="primary">
            加油！你是最棒的
          </Button>
          <Button icon="edit">加油！你是最棒的</Button>
          <Button icon="delete" type="danger">
            加油！你是最棒的
          </Button>
          <Button icon="search">加油！你是最棒的</Button>
          <Button icon="download">加油！你是最棒的</Button>
          <Button icon="cloud-download">加油！你是最棒的</Button>
        </Card>
        <Card title="loading按钮" className="card-warp">
          <Switch
            defaultChecked
            onChange={checked => {
              this.setState({
                loading: !checked,
              });
            }}
          />
          <Button loading={loading} shape="circle">
            {loading ? '加载中' : ''}
          </Button>
          <Button loading={loading}>{loading ? '加载中' : '可使用'}</Button>
          <Button loading={loading}>{loading ? '加载中' : '可使用'}</Button>
          <Button loading={loading}>{loading ? '加载中' : '可使用'}</Button>
          <Button loading={loading}>{loading ? '加载中' : '可使用'}</Button>
          <Button loading={loading}>{loading ? '加载中' : '可使用'}</Button>
        </Card>
        <Card title="按钮组" className="card-warp">
          <Button.Group>
            <Button icon="left">返回</Button>
            <Button icon="right">前进</Button>
          </Button.Group>
        </Card>
        <Card title="按钮大小" className="card-warp">
          <Radio.Group value={this.state.size} onChange={this.handleChange}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button size={this.state.size}>Imoc</Button>
          <Button size={this.state.size}>Imoc</Button>
          <Button size={this.state.size}>Imoc</Button>
          <Button size={this.state.size}>Imoc</Button>
        </Card>
      </div>
    );
  }
}
