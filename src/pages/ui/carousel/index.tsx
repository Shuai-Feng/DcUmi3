import React, { useEffect, useState } from 'react';
import { Button, Carousel } from 'antd';
import './style.less';

interface ICarouselProps {}

const CarouselPage: React.FunctionComponent<ICarouselProps> = props => {
  const [dotPosition, setDotPosition] = useState('');
  useEffect(() => {
    //如何改变网页的标题呢？
    document.title = 'Giao';
  }, []);
  return (
    <div className="Carousel">
      <Carousel style={{ marginBottom: 10 }}>
        <div>
          <h3>火</h3>
        </div>
        <div>
          <h3>风</h3>
        </div>
        <div>
          <h3>水</h3>
        </div>
      </Carousel>

      <Carousel style={{ marginBottom: 10 }} autoplay effect="fade">
        <div>
          <h3>火</h3>
        </div>
        <div>
          <h3>风</h3>
        </div>
        <div>
          <h3>水</h3>
        </div>
      </Carousel>

      <Button.Group>
        <Button
          onClick={() => {
            setDotPosition('top');
          }}
        >
          top
        </Button>
        <Button
          onClick={() => {
            setDotPosition('right');
          }}
        >
          right
        </Button>
        <Button
          onClick={() => {
            setDotPosition('left');
          }}
        >
          left
        </Button>
        <Button
          onClick={() => {
            setDotPosition('bottom');
          }}
        >
          bottom
        </Button>
      </Button.Group>

      <Carousel
        style={{ marginBottom: 10 }}
        //@ts-ignore
        dotPosition={dotPosition}
        autoplay
        effect="fade"
      >
        <div>
          <h3>火</h3>
        </div>
        <div>
          <h3>风</h3>
        </div>
        <div>
          <h3>水</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselPage;
