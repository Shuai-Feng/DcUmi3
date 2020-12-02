import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';

interface IModalPageProps {}

interface littleModal {}

const ModalPage: React.FunctionComponent<IModalPageProps> = props => {
  const [modalVisible, setVisible] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
  });

  //打开对应模态窗口
  let hanldeOpen = (modal: string) => {
    //深拷贝更改内容地址，不然state不会更新
    let a1 = Object.assign({}, modalVisible);
    a1[modal] = true;
    setVisible(a1);
  };

  let handleInfoOpen = (type: 'info' | 'warning' | 'success' | 'error') => {
    switch (type) {
      case 'info':
        Modal.info({ title: '信息提示框' });
        break;
      case 'warning':
        Modal.warning({ title: '警告框' });
        break;
      case 'success':
        Modal.success({ title: '信息框' });
        break;
      case 'error':
        Modal.error({ title: '出错框' });
        break;
    }
  };
  let handleClose = () => {
    setVisible({
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
    });
  };
  return (
    <div className="ModalPage">
      <Card title="模态框">
        <Button
          onClick={() => {
            hanldeOpen('modal1');
          }}
          style={{ marginRight: 10 }}
        >
          打开第一个
        </Button>
        <Button
          onClick={() => {
            hanldeOpen('modal2');
          }}
          style={{ marginRight: 10 }}
        >
          没有页脚的模态框
        </Button>
        <Button
          onClick={() => {
            hanldeOpen('modal3');
          }}
          style={{ marginRight: 10 }}
        >
          自定义页脚
        </Button>
        <Button
          onClick={() => {
            hanldeOpen('modal4');
          }}
          style={{ marginRight: 10 }}
        >
          顶部弹框
        </Button>
      </Card>

      <Card title="模态框 弹出式">
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={() => {
            handleInfoOpen('info');
          }}
        >
          信息提示框 info{' '}
        </Button>
        <Button
          style={{ marginRight: 10, background: '#52C41A', color: '#fff' }}
          onClick={() => {
            handleInfoOpen('success');
          }}
        >
          成功提示框 success
        </Button>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => {
            handleInfoOpen('warning');
          }}
        >
          警告提示框 warrning
        </Button>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => {
            handleInfoOpen('error');
          }}
        >
          报错信息框 error{' '}
        </Button>
      </Card>
      <Modal onCancel={handleClose} visible={modalVisible['modal1']}>
        一号模态窗口
      </Modal>
      <Modal
        onCancel={handleClose}
        visible={modalVisible['modal2']}
        footer={null}
      >
        二号模态窗口
      </Modal>
      <Modal
        onCancel={handleClose}
        visible={modalVisible['modal3']}
        okText={'完成'}
        cancelText={'👴觉得不行'}
      >
        三号模态窗口
      </Modal>
      <Modal
        wrapClassName={'vertical-center-modal'}
        onCancel={handleClose}
        visible={modalVisible['modal4']}
      >
        四号模态窗口
      </Modal>
    </div>
  );
};

export default ModalPage;
