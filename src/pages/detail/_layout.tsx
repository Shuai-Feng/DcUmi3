import * as React from 'react';
import NavHeader from '@/component/NavHeader';
interface IDetialLayoutProps {}

const DetialLayout: React.FunctionComponent<IDetialLayoutProps> = props => {
  return (
    <div className="detial_layout">
      <NavHeader menuType="second" />
      {props.children}
    </div>
  );
};

export default DetialLayout;
