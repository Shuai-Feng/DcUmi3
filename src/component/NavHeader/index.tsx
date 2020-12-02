import React, { useEffect } from 'react';
import { NavLink } from 'umi';
import { Row, Col } from 'antd';
import logo from '@/common/asset/logo-ant.svg';
import './style.less';

interface INavHeaderProps {
  menuType?: 'second' | undefined;
}

const NavHeader: React.FunctionComponent<INavHeaderProps> = props => {
  let { menuType } = props;
  //模拟 ComponentDidMount
  return (
    <div className={`navheader`}>
      <Row className={`navtop ${menuType ? 'blue' : ''}`}>
        {menuType ? (
          <Col span={6} className="logo">
            <img src={logo} alt="" />
            <span>IMooc 通用管理系统</span>
          </Col>
        ) : (
          ''
        )}
        <Col span={menuType ? 16 : 24} className="userbar">
          <span className="userName">欢迎您,帅锋</span>
          <NavLink to="/login">离开</NavLink>
        </Col>
      </Row>
      {menuType ? (
        ''
      ) : (
        <div className="navbottom">
          <div className="breadcum">首页</div>
        </div>
      )}
    </div>
  );
};

export default NavHeader;
