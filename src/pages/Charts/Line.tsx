import React, { useEffect } from 'react';
import { Card } from 'antd';

import ReactEcharts from 'echarts-for-react';

import echarts, { EChartOption } from 'echarts/lib/echarts';

//@ts-ignore
import themeLight from './themeLight.js';

import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

interface ILinePageProps {}

const LinePage: React.FunctionComponent<ILinePageProps> = props => {
  let opt1: EChartOption = {
    title: {
      text: '折现表格1',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wem', 'Thr', 'Fir', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    series: [
      {
        name: '摩拜总量',
        type: 'line',
        data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
      },
    ],
  };
  let opt2: EChartOption = {
    title: {
      text: '折现表格2',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wem', 'Thr', 'Fir', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['摩拜总量', 'ofo总量'],
    },
    series: [
      {
        name: '摩拜总量',
        type: 'line',
        data: [1200, 3000, 4500, 6000, 8000, 12000, 20000],
      },
      {
        name: 'ofo总量',
        type: 'line',
        data: [1000, 2000, 5500, 6000, 8000, 10000, 12000],
      },
    ],
  };
  let opt3: EChartOption = {
    title: {
      text: '折现表格1',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wem', 'Thr', 'Fir', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    series: [
      {
        name: '摩拜总量',
        type: 'line',
        data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
        areaStyle: {},
      },
    ],
  };

  useEffect(() => {
    echarts.registerTheme('Imooc', themeLight);
  }, []);

  return (
    <div className="LinePage">
      <Card>
        <ReactEcharts style={{ height: 500 }} theme="Imooc" option={opt3} />
      </Card>
      <Card>
        <ReactEcharts style={{ height: 500 }} theme="Imooc" option={opt1} />
      </Card>
      <Card>
        <ReactEcharts style={{ height: 500 }} theme="Imooc" option={opt2} />
      </Card>
    </div>
  );
};

export default LinePage;
