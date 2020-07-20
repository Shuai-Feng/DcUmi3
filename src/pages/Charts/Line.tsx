import * as React from 'react';
import { Card } from 'antd';

import ReactEcharts from 'echarts-for-react';
import { EChartOption } from 'echarts';

//import styleSheet
import '@/styles/common.less';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  getOptions3 = () => {
    let option: EChartOption = {
      title: {
        text: '商品出售情况',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {},
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
        },
      ],
    };
    return option;
  };
  getOptions2 = () => {
    let option: EChartOption = {
      title: {
        text: '商品出售情况',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {},
      legend: {
        data: ['OFO订单量', '摩拜订单量'],
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'OFO订单量',
          type: 'line',
          stack: '总量',
          data: [1200, 3000, 4500, 6000, 8000, 12000, 20000],
        },
        {
          name: '摩拜订单量',
          type: 'line',
          stack: '总量',
          data: [1000, 2000, 5500, 6000, 8000, 10000, 12000],
        },
      ],
    };
    return option;
  };
  getOptions = () => {
    let option: EChartOption = {
      title: {
        text: '商品出售情况',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {},
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
          areaStyle: {},
        },
      ],
    };
    return option;
  };
  public render() {
    return (
      <div>
        <Card className="card-wrap" title="折线图之三">
          <ReactEcharts style={{ height: 500 }} option={this.getOptions3()} />
        </Card>
        <Card className="card-wrap" title="折线图之二">
          <ReactEcharts style={{ height: 500 }} option={this.getOptions2()} />
        </Card>
        <Card className="card-wrap" title="折线图之一">
          <ReactEcharts style={{ height: 500 }} option={this.getOptions()} />
        </Card>
      </div>
    );
  }
}
