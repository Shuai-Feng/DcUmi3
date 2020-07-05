import * as React from 'react';
import { Menu,Layout} from 'antd';
import { Link } from 'umi';
const MenuItem = Menu.Item;
const { Content,Footer,Sider } = Layout;

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth={0}
    >
      <Menu
        theme='dark'
        mode='vertical'
        style={{ lineHeight: '64px',minHeight:'100vh'}}
      >
        
        <MenuItem><Link to='/Contact'>Contact</Link></MenuItem>
        <MenuItem><Link to='/Contact/Info'>Info</Link></MenuItem>
      </Menu>
    </Sider>

    <Layout>
      <Content  style={{ margin: '24px 16px 0' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            {props.children}
          </div> 
      </Content>

      <Footer style={{textAlign:'center'}}>
          created by shuaifeng
      </Footer>
    </Layout>
  </Layout>
  );
};

export default App;
