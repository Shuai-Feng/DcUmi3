import * as React from 'react';
import {Layout} from 'antd';
//引入左侧导航栏
import NavLeft from '@/components/NavLeft';
//header组件
import NavHeader from '@/components/Header';

import '@/styles/common.less';
const { Content,Sider } = Layout;

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <Layout>
      
    <Sider
      breakpoint="lg"
      collapsedWidth={0}
      width={260}
    >
        {/* 这里放menu组件 */}
        <NavLeft className="navLeft"></NavLeft>
    </Sider>

    <Layout className='main'>
      <div className='header'>
          <NavHeader/>
      </div>
      <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ background: '#fff', minHeight: 500 }}>
            {props.children}
          </div> 
      </Content>
      <div className="footer">
          created by shuaifeng（推荐使用谷歌浏览器，可以获得更佳操作页面体验）
      </div>
    </Layout>
  </Layout>
  );
};

export default App;