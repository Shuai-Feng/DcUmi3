import * as React from 'react';
import './style.less';
interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
  return <div className="welcome">欢迎来到布里特安防公司</div>;
};

export default App;
