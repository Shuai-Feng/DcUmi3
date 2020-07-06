import * as React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'umi';
import menuConfig from './menuConfig';

import './style.less';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export interface IAppProps {
  className?:string
}

export interface IAppState {
  menuTree:any,
  word:any
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      menuTree:<div></div>,
      word:''
    }
  }
  UNSAFE_componentWillMount(){
    const menuTree = this.renderMenu(menuConfig);
    this.setState({
      menuTree,
      word:"123"
    })
  }
  //用户用户显示侧边的导航栏
  renderMenu(data?:any){ 
      return data.map((item:any)=>{
          if(item.children){
              return <SubMenu title={item.title} key={item.key}>
                    { this.renderMenu(item.children)}
              </SubMenu> 
          }
          return <MenuItem title={item.title} key={item.key}>
            <NavLink to={item.key}>{item.title}</NavLink>
          </MenuItem>
          // return <SubMenu title={item.title} key={item.key}></SubMenu>
      })
  }
  public render() {  
    return (
      <div className={this.props.className}>
        <div className="logo">
              <img src="/assets/logo-ant.svg" alt=""/>
              <h1>布里特安防公司</h1>
        </div>
        <Menu theme='dark' >
          {this.state.menuTree}
        </Menu>
      </div>
    );
  }
}
