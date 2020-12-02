import React from 'react';
import { message, Card, Button } from 'antd';
interface IMessagePageProps {}

const MessagePage: React.FunctionComponent<IMessagePageProps> = props => {
  let handleMessageOpen = (type: string) => {
    switch (type) {
      case 'success':
        message.success('成功提示框');
        break;
      case 'warning':
        message.warning('警告框');
        break;
      case 'info':
        message.info('信息显示框');
        break;
      case 'error':
        message.error('出错框');
        break;
    }
  };
  return (
    <div className="MessagePage">
      <Card title="模态框弹出">
        <Button
          style={{ marginRight: 10 }}
          onClick={() => {
            handleMessageOpen('success');
          }}
        >
          成功信息框
        </Button>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => {
            handleMessageOpen('warning');
          }}
        >
          警告框
        </Button>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => {
            handleMessageOpen('info');
          }}
        >
          信息提示框
        </Button>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => {
            handleMessageOpen('error');
          }}
        >
          出错框
        </Button>
      </Card>
    </div>
  );
};

export default MessagePage;
