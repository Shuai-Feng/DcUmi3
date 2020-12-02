import * as React from 'react';
import { Spin } from 'antd';
interface IAjaxLoadingProps {}

const AjaxLoading: React.FunctionComponent<IAjaxLoadingProps> = props => {
  return (
    <div className="ajaxLoading">
      <div id="LoadingHover" style={{ display: 'none' }}>
        <div className="overlay">
          <div className="loadringWapper">
            <Spin style={{ margin: '6px 8px 0px 0px' }} />
            加载中请稍后
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjaxLoading;
