import React from 'react';
import { Menu } from 'antd';
import menuConfig from './menuConfig.ts';
import logo from '@/common/asset/logo-ant.svg';
import './style.less';
import { NavLink } from 'umi';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface INavBarProps {}

const NavBar: React.FunctionComponent<INavBarProps> = props => {
  //渲染侧边栏
  let renderMenu = (data: Array<any>) => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }

      return (
        <MenuItem title={item.title} key={item.key}>
          <NavLink to={item.key}> {item.title}</NavLink>
        </MenuItem>
      );
    });
  };

  return (
    <div className="navleft">
      <div className="logo">
        <img src={logo} alt="没出来？" />
        <h1>布里特安防公司</h1>
      </div>
      <Menu theme="dark">{renderMenu(menuConfig)}</Menu>
    </div>
  );
};

export default NavBar;
