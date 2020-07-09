import * as React from 'react';
import { Card, Row, Col, Modal } from 'antd';
export interface IAppProps {}

export interface IAppState {
  visible: boolean;
  currentImg: string;
}

export default class App extends React.Component<IAppProps, IAppState> {
  state = {
    visible: false,
    currentImg: '',
  };
  openGallay(imgSrc: string) {
    this.setState({
      visible: true,
      currentImg: '/gallery/' + imgSrc,
    });
  }
  public render() {
    const imgs: Array<any> = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png'],
    ];
    const imgList = imgs.map((list: Array<any>) =>
      list.map((item: string) => (
        <Card
          key={item + 'asdf'}
          style={{ marginBottom: 10 }}
          cover={
            <img
              key={item + 'asdf'}
              src={'/gallery/' + item}
              onClick={() => this.openGallay(item)}
            />
          }
        >
          <Card.Meta
            key={item + 'asdf'}
            title="React Admin"
            description="I Love Imooc"
          />
        </Card>
      )),
    );
    return (
      <div>
        <Row gutter={10}>
          <Col md={5}>{imgList[0]}</Col>
          <Col md={5}>{imgList[1]}</Col>
          <Col md={5}>{imgList[2]}</Col>
          <Col md={5}>{imgList[3]}</Col>
          <Col md={4}>{imgList[4]}</Col>
        </Row>
        <Modal
          width={300}
          visible={this.state.visible}
          title="图片画廊"
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
          footer={null}
        >
          <img
            src={this.state.currentImg}
            alt="sdsf"
            style={{ width: '100%' }}
          />
        </Modal>
      </div>
    );
  }
}
