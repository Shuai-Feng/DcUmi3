import React from 'react';
import { Menu,Layout} from 'antd';
import { Link } from 'umi';
const MenuItem = Menu.Item;
const { Content,Footer,Sider } = Layout;
export default () => {
  return (
    <div>
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
            <MenuItem>
              <div className="haha">Nav2</div>
            </MenuItem>
            <MenuItem>Nav3</MenuItem>
          </Menu>
        </Sider>

        <Layout>
          <Content  style={{ margin: '24px 16px 0' }}>
              <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div> 
          </Content>

          <Footer style={{textAlign:'center'}}>
              created by shuaifeng
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
