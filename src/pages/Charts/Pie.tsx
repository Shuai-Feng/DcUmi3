import * as React from 'react';
import { Card } from 'antd';

import { EChartOption } from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';

import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

interface IPiePageProps {}

const PiePage: React.FunctionComponent<IPiePageProps> = props => {
  let opt1: EChartOption = {
    title: {
      text: '饼图统计单车的行程',
      // @ts-ignore
      x: 'center',
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
    },
    series: [
      {
        name: '订单量',
        type: 'pie',
        radius: '80%',
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
        ].sort((a, b) => {
          return a.value - b.value;
        }),
        roseType: 'radius',
        animationType: 'scale',
        animationDelay: function(idx: any) {
          return Math.random() * 200;
        },
      },
    ],
  };
  let opt2: EChartOption = {
    title: {
      text: '饼图统计单车的形成2',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/> {b}: {c}  ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
    },
    series: [
      {
        name: '订单量',
        type: 'pie',
        radius: '80%',
        center: ['50%', '60%'],
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
  return (
    <div className="PiePage">
      <Card title="饼图之一">
        <ReactEcharts style={{ height: 500 }} option={opt1} />
      </Card>
      <Card title="饼图之二">
        <ReactEcharts style={{ height: 600 }} option={opt2} />
      </Card>
    </div>
  );
};

export default PiePage;
