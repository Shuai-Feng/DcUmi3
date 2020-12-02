import React from 'react';
import { Card } from 'antd';

import { EChartOption } from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';

import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
interface IBarPageProps {}

const BarPage: React.FunctionComponent<IBarPageProps> = props => {
  let obj1: any = {
    title: {
      text: '用户骑行订单',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)',
        },
      },
    ],
  };

  let obj2: EChartOption = {
    title: {
      text: '用户骑行订单',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    legend: {
      data: ['OFO', '摩拜', '小蓝'],
    },
    series: [
      {
        name: 'OFO',
        type: 'bar',
        data: [2000, 3000, 5500, 7000, 8000, 12000, 20000],
      },
      {
        name: '摩拜',
        type: 'bar',
        data: [1500, 3000, 4500, 6000, 8000, 10000, 15000],
      },
      {
        name: '小蓝',
        type: 'bar',
        data: [1000, 2000, 2500, 4000, 6000, 7000, 8000],
      },
    ],
  };

  return (
    <div className="BarPage">
      <Card title={'折线图'} style={{ marginBottom: 10 }}>
        <ReactEcharts style={{ height: 500 }} option={obj1} />
      </Card>
      <Card>
        <ReactEcharts style={{ height: 500 }} option={obj2} />
      </Card>
    </div>
  );
};

export default BarPage;
