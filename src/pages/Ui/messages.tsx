import * as React from 'react';
import { message, Card, Button } from 'antd';
import './ui.less';
interface IAppProps {}

let showMessage = (type: string) => {
  message[type]('恭喜你，React课程晋级成功');
};
const App: React.FunctionComponent<IAppProps> = props => {
  return (
    <div>
      <Card className="card-warp">
        <Button
          type="primary"
          onClick={() => {
            showMessage('success');
          }}
        >
          Success
        </Button>
        <Button
          type="primary"
          onClick={() => {
            showMessage('info');
          }}
        >
          info
        </Button>
        <Button
          type="primary"
          onClick={() => {
            showMessage('warning');
          }}
        >
          Warning
        </Button>
        <Button
          type="primary"
          onClick={() => {
            showMessage('error');
          }}
        >
          Error
        </Button>
        <Button
          type="primary"
          onClick={() => {
            showMessage('loading');
          }}
        >
          Loading
        </Button>
      </Card>
    </div>
  );
};

export default App;
