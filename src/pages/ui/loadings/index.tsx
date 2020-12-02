import * as React from 'react';
import { Spin, Card, Icon, Alert } from 'antd';

interface ILoadingPagesProps {}

const LoadingPages: React.FunctionComponent<ILoadingPagesProps> = props => {
  const Circle = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  return (
    <div className="LoadingPage">
      <Card title="Spin用法" style={{ marginBottom: 20 }}>
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
        <Spin indicator={Circle} />
      </Card>
      <Card title="内容遮罩">
        <Spin>
          <Alert
            type="info"
            message="Alert message title"
            description="Further details about the context of this alert."
          />
        </Spin>
        <Spin>
          <Alert
            type="success"
            message="Alert message title"
            description="Further details about the context of this alert."
          />
        </Spin>
        <Spin>
          <Alert
            type="error"
            message="Alert message title"
            description="Further details about the context of this alert."
          />
        </Spin>
        <Spin tip="少女折寿中">
          <Alert
            type="warning"
            message="Alert message title"
            description="Further details about the context of this alert."
          />
        </Spin>
      </Card>
    </div>
  );
};

export default LoadingPages;
