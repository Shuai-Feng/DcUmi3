import * as React from 'react';
import { IRouteComponentProps } from 'umi';

import AjaxLoding from '@/component/AjaxLoding';
import NavBar from '@/component/NavBar';
import NavHeader from '@/component/NavHeader';

import { Layout } from 'antd';
const { Sider, Content } = Layout;

import './glLayout.less';

import '@/common/reset.css';

const glLayout = (props: IRouteComponentProps) => {
  if (props.location.pathname.includes(`/detail`)) {
    return (
      <div>
        <AjaxLoding />
        {props.children}
      </div>
    );
  }
  return (
    <Layout className="gllayout">
      <AjaxLoding />
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        className="sidebar"
        width={200}
        style={{ minHeight: '100vh' }}
      >
        <NavBar />
      </Sider>
      <Layout>
        <Content
          className="main"
          style={
            document.documentElement.clientWidth < 500
              ? { maxHeight: '100vh', minWidth: '100vw', overflowY: 'auto' }
              : { maxHeight: '100vh', overflowY: 'auto' }
          }
        >
          <NavHeader />
          <div className="mainwrapper">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default glLayout;
