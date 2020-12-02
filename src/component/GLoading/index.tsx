import * as React from 'react';
import { Spin } from 'antd';
import './style.less';
interface IGlLoadingProps {}

const GlLoading: React.FunctionComponent<IGlLoadingProps> = props => {
  return (
    <div className="GlLoading">
      <Spin tip={'加载中。。'} />
    </div>
  );
};

export default GlLoading;
