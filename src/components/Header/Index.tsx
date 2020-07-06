import * as React from 'react';
import { Row,Col } from 'antd';
import { Link } from 'umi';
export interface IAppProps {
}

export interface IAppState {
    userName:string,
    routeName:string
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
        userName:'指挥官',
        routeName:'首页'
    }
  }

  public render() {
      let {userName,routeName} = this.state;
    return (
      <div>
          <Row className='header-top'>
            <span>欢迎您，{userName}</span>
            <Link to='/'>退出</Link>
          </Row>
          <Row className='breadcrumb'>
            <Col span={4} className='breadcrumb-title'>
                {routeName}
            </Col>
            <Col span={20} className='weather'>
                
            </Col>
          </Row>
      </div>
    );
  }
}
