import React from 'react';
import './style.less';

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = props => {
  return <div className="homepage">欢迎进入单车后台管理系统</div>;
};

export default Home;
