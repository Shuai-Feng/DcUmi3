import * as React from 'react';
import { Card } from 'antd';

import ReactEcharts from 'echarts-for-react';
import { EChartOption } from 'echarts';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {};
  }
  getOption3 = () => {
    let option: EChartOption = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/> {b}:{c}({d}%)',
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一',
            },
            {
              value: 1000,
              name: '周二',
            },
            {
              value: 2000,
              name: '周三',
            },
            {
              value: 1500,
              name: '周四',
            },
            {
              value: 3000,
              name: '周五',
            },
            {
              value: 2000,
              name: '周六',
            },
            {
              value: 1200,
              name: '周日',
            },
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx: any) {
            return Math.random() * 400 + 1000 * idx;
          },
        },
      ],
    };
    return option;
  };
  getOption = () => {
    let option: EChartOption = {
      title: {
        text: '用户骑行订单',
        //@ts-ignore
        x: 'center',
      },
      legend: {
        orient: 'vertical',
        left: 10,
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: '70%',
          center: ['80%', '60%'],
          data: [
            {
              value: 1000,
              name: '周一',
            },
            {
              value: 1000,
              name: '周二',
            },
            {
              value: 1000,
              name: '周三',
            },
            {
              value: 1000,
              name: '周四',
            },
            {
              value: 1000,
              name: '周五',
            },
            {
              value: 1000,
              name: '周六',
            },
            {
              value: 1000,
              name: '周日',
            },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          },
        },
      ],
    };
    return option;
  };
  getOption2 = () => {
    let option: EChartOption = {
      title: {
        text: '用户骑行订单',
        //@ts-ignore
        x: 'center',
      },
      legend: {
        orient: 'vertical',
        left: 10,
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'],
          center: ['80%', '60%'],
          data: [
            {
              value: 1000,
              name: '周一',
            },
            {
              value: 1000,
              name: '周二',
            },
            {
              value: 1000,
              name: '周三',
            },
            {
              value: 1000,
              name: '周四',
            },
            {
              value: 1000,
              name: '周五',
            },
            {
              value: 1000,
              name: '周六',
            },
            {
              value: 1000,
              name: '周日',
            },
          ].sort(function(a: any, b: any) {
            return a.value - b.value;
          }),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)',
            },
          },
        },
      ],
    };
    return option;
  };
  public render() {
    return (
      <div>
        <Card title="饼图3">
          <ReactEcharts option={this.getOption3()} />
        </Card>
        <Card title="饼图1">
          <ReactEcharts option={this.getOption()} />
        </Card>
        <Card title="饼图2">
          <ReactEcharts option={this.getOption2()} />
        </Card>
      </div>
    );
  }
}
