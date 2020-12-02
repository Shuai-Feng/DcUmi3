import React from 'react';
import { Button, Card, notification } from 'antd';
declare type messageType = 'success' | 'error' | 'warning' | 'info';
declare type messageDirect =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';
interface INofityPageProps {}

const NofityPage: React.FunctionComponent<INofityPageProps> = props => {
  let handleOpen = (type: 'success' | 'error' | 'warning' | 'info') => {
    notification[type]({
      message: 'notifycation Title',
      description: 'This is the content you',
    });
  };

  let handleAngleOpen = (type: messageType, position: messageDirect) => {
    notification[type]({
      message: 'notifycation Title',
      description: 'This is the content you',
      placement: position,
    });
  };

  return (
    <div className="NoftifyPage">
      <Card title="消息框">
        <Button
          type="primary"
          style={{ margin: '0px 10px 10px 0px' }}
          onClick={() => {
            handleOpen('success');
          }}
        >
          Success
        </Button>
        <Button
          type="primary"
          style={{ margin: '0px 10px 10px 0px' }}
          onClick={() => {
            handleOpen('error');
          }}
        >
          Error
        </Button>
        <Button
          type="primary"
          style={{ margin: '0px 10px 10px 0px' }}
          onClick={() => {
            handleOpen('warning');
          }}
        >
          Warning
        </Button>
        <Button
          type="primary"
          style={{ margin: '0px 10px 10px 0px' }}
          onClick={() => {
            handleOpen('info');
          }}
        >
          Info
        </Button>
      </Card>
      <Card title="通知提醒框 不同角度">
        <Button
          type="primary"
          style={{ margin: '0px 10px 10px 0px' }}
          onClick={() => {
            handleAngleOpen('success', 'topLeft');
          }}
        >
          Success
        </Button>
        <Button
          type="primary"
          style={{ margin: '0px 10px 10px 0px' }}
          onClick={() => {
            handleAngleOpen('error', 'topRight');
          }}
        >
          Info
        </Button>
        <Button
          type="primary"
          style={{ margin: '0px 10px 10px 0px' }}
          onClick={() => {
            handleAngleOpen('warning', 'bottomLeft');
          }}
        >
          Error
        </Button>
        <Button
          type="primary"
          style={{ margin: '0px 10px 10px 0px' }}
          onClick={() => {
            handleAngleOpen('info', 'bottomRight');
          }}
        >
          Warning
        </Button>
      </Card>
    </div>
  );
};

export default NofityPage;
