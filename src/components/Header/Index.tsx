import * as React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'umi';

import Utils from '@/utils';
import axios from '@/axios';
import './index.less';

export interface IAppProps {
  menuType?: string;
}

export interface IAppState {
  userName: string;
  routeName: string;
  sysTime: string;
  dayPictureUrl: string;
  weather: string;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      userName: '指挥官',
      routeName: '首页',
      sysTime: '',
      dayPictureUrl: '',
      weather: '',
    };
  }

  UNSAFE_componentWillMount() {
    //设置显示时间的控件
    setInterval(() => {
      let sysTime = Utils.formateData(new Date().getTime());
      this.setState({
        sysTime,
      });
    });
    this.getWeatherDataApi();
  }
  //获取日期的api
  getWeatherDataApi() {
    let city = '北京';
    axios
      .jsonp({
        url:
          'http://api.map.baidu.com/telematics/v3/weather?location=' +
          encodeURIComponent(city) +
          '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
      })
      .then((res: any) => {
        if (res.status === 'success') {
          let data = res.results[0].weather_data[0];
          this.setState({
            dayPictureUrl: data.dayPictureUrl,
            weather: data.weather,
          });
        }
      });
  }

  public render() {
    let { userName, routeName, sysTime } = this.state;
    let { dayPictureUrl, weather } = this.state;
    let { menuType } = this.props;
    return (
      <div className="header">
        <Row className="header-top">
          {menuType ? (
            <Col span={6} className="logo">
              <img src="/assets/logo-ant.svg" alt=""></img>
              <span>IMoc 通用管理系统</span>
            </Col>
          ) : (
            ''
          )}
          <Col span={menuType ? 18 : 24}>
            <span>欢迎您，{userName}</span>
            <Link to="/">退出</Link>
          </Col>
        </Row>
        {menuType ? (
          ''
        ) : (
          <Row className="breadcrumb">
            <Col span={4} className="breadcrumb-title">
              {routeName}
            </Col>
            <Col span={20} className="weather">
              <span>{sysTime}</span>
              <span>
                <img src={dayPictureUrl} alt="" />
              </span>
              <span className="weather">{weather}</span>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
