import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import axios from 'axios';
const Meta = Card.Meta;

interface IGallaryProps {}

const Gallary: React.FunctionComponent<IGallaryProps> = props => {
  const colForm = {
    lg: 6,
    sm: 24,
  };
  const imgs = [
    ['1.png', '2.png', '3.png', '4.png', '5.png'],
    ['6.png', '7.png', '8.png', '9.png', '10.png'],
    ['11.png', '12.png', '13.png', '14.png', '15.png'],
    ['16.png', '17.png', '18.png', '19.png', '20.png'],
  ];
  useEffect(() => {
    axios.post('/myphp/demo1.php').then(res => {
      console.log(res.data);
    });
  }, []);
  return (
    <div className="GallaryPage">
      <Row>
        {imgs.map(item => {
          return (
            <Col {...colForm}>
              {item.map(pic => {
                return (
                  <Card cover={<img src={'./asset/' + pic} alt="as" />}>
                    <Meta title="home" description="afdasdf" />
                  </Card>
                );
              })}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Gallary;
