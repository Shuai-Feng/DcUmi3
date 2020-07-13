import * as React from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less';

export interface IAppProps {}

export interface IAppState {
  showModal1: boolean;
  showModal2: boolean;
  showModal3: boolean;
  showModal4: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false,
    };
  }

  handleOpen(type: any) {
    // this.setState({
    //     [type]:true
    // });
  }
  handleConfirm(type: any) {
    Modal[type]({
      title: '确认？',
      content: '你确定你学会了React了吗？',
      onOk() {
        console.log('Ok');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  public render() {
    return (
      <div>
        <Card title="模态框" className="card-warp">
          <Button
            type="primary"
            onClick={() => {
              this.handleOpen('showModal1');
            }}
          >
            Open
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleOpen('showModal2');
            }}
          >
            自定义页脚
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleOpen('showModal3');
            }}
          >
            顶部20px弹框
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleOpen('showModal4');
            }}
          >
            水平垂直居中
          </Button>
        </Card>
        <Card title="信息确认框" className="card-warp">
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm('confirm');
            }}
          >
            Confirn
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm('info');
            }}
          >
            Info
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm('success');
            }}
          >
            顶部20px弹框
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm('warning');
            }}
          >
            水平垂直居中
          </Button>
        </Card>
        <Modal
          title="react"
          visible={this.state.showModal1}
          onCancel={() => {
            this.setState({
              showModal1: false,
            });
          }}
          onOk={() => {
            this.setState({
              showModal1: false,
            });
          }}
        >
          <p>欢迎集美们新推出的React高级课程</p>
        </Modal>
        <Modal
          title="react"
          okText="爷 觉 行"
          cancelText="补 星"
          visible={this.state.showModal2}
          onCancel={() => {
            this.setState({
              showModal2: false,
            });
          }}
          onOk={() => {
            this.setState({
              showModal2: false,
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal
          title="react"
          style={{ top: 20 }}
          visible={this.state.showModal3}
          onCancel={() => {
            this.setState({
              showModal3: false,
            });
          }}
          onOk={() => {
            this.setState({
              showModal3: false,
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal
          title="react"
          visible={this.state.showModal4}
          wrapClassName="vertical-center-modal"
          onCancel={() => {
            this.setState({
              showModal4: false,
            });
          }}
          onOk={() => {
            this.setState({
              showModal4: false,
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
      </div>
    );
  }
}
