import * as React from 'react';
import { Carousel, Card } from 'antd';
import './ui.less';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  state = {};

  public render() {
    return (
      <div>
        <Card title="文字背景轮播图" className="slider-wrap">
          <Carousel autoplay effect="fade">
            <div>
              <h3>Ant Motion Banner - React</h3>
            </div>
            <div>
              <h3>Ant Motion Banner - Vue</h3>
            </div>
            <div>
              <h3>Ant Motion Banner - Angular</h3>
            </div>
          </Carousel>
        </Card>
        <Card className="slider-wrap">
          <Carousel autoplay effect="fade">
            <div>
              <img src="/carousel-img/carousel-1.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/carousel-2.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/carousel-3.jpg" alt="" />
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}
