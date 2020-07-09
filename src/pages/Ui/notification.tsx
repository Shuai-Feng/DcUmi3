import * as React from 'react';
import { Card, notification, Button } from 'antd';

//嘿 看来这个很不哦
declare type NotificationPlacement =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

interface IAppProps {}
let openNotification = (type: string, direction?: NotificationPlacement) => {
  if (direction) {
    notification.config({
      placement: direction,
    });
  }
  //不知道这个bug该怎么改一改
  // notification[type]({
  //   message:'发工资了',
  //   description:'上个月考勤30天，迟到0天，实发工资20000，请笑纳'
  // });
};
const App: React.FunctionComponent<IAppProps> = props => {
  return (
    <div>
      <Card title="通知栏提醒框" className="card-warp">
        <Button
          onClick={() => {
            openNotification('success', 'topLeft');
          }}
        >
          Success
        </Button>
        <Button
          onClick={() => {
            openNotification('info', 'topRight');
          }}
        >
          Info
        </Button>
        <Button
          onClick={() => {
            openNotification('warning', 'bottomLeft');
          }}
        >
          Warning
        </Button>
        <Button
          onClick={() => {
            openNotification('error', 'bottomRight');
          }}
        >
          Error
        </Button>
      </Card>
      <Card title="通知栏提醒框" className="card-warp">
        <Button
          onClick={() => {
            openNotification('success');
          }}
        >
          Success
        </Button>
        <Button
          onClick={() => {
            openNotification('info');
          }}
        >
          Info
        </Button>
        <Button
          onClick={() => {
            openNotification('warning');
          }}
        >
          Warning
        </Button>
        <Button
          onClick={() => {
            openNotification('error');
          }}
        >
          Error
        </Button>
      </Card>
    </div>
  );
};

export default App;
