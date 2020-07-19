import * as React from 'react';
//新版本的ReactEcharts 在安装了 echarts 和 echarts-for-react库后可以直接使用
import ReactEcharts from 'echarts-for-react';
import { EChartOption } from 'echarts';
import { Card } from 'antd';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {};
  }
  getOption() {
    //在这里 如果你导入 EChartOption的接口的话，就不用担心写错啦
    let option: EChartOption = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
        },
      ],
    };
    return option;
  }
  getOption2() {
    let option: EChartOption = {
      title: {
        text: '用户骑行订单',
      },
      //legend 是指图表的图例
      legend: {
        data: ['ofo', '摩拜', '小黄车'],
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data: [2000, 3000, 5500, 7000, 8000, 12000, 20000],
        },
      ],
    };
    return option;
  }
  public render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts
            option={this.getOption()}
            theme="Imooc"
            notMerge={true}
            lazyUpdate={true}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="柱形图表之二">
          <ReactEcharts option={this.getOption2()} />
        </Card>
      </div>
    );
  }
}
