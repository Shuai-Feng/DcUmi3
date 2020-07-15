import React from 'react';
import { Button, Select } from 'antd';
const Option = Select.Option;
export default {
  formateData(time: number): string {
    if (!time) return '';
    let date: Date = new Date(time);
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDay() +
      ' ' +
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
      ':' +
      (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    );
  },
  pagination(data: any, callback: any) {
    return {
      onChange: (current: any) => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共有${data.result.total_count}条`;
      },
      showQuickJumper: true,
    };
  },
  getOptionList(data: Array<any>) {
    if (!data) {
      return [];
    }
    let options: Array<any> = []; //[<Option value="0" key="all_key">全部</Option>];
    data.map((item: any) => {
      options.push(
        <Option value={item.id} key={item.id}>
          {item.name}
        </Option>,
      );
    });
    return options;
    //我想在数组中加入一个antd 的Option 但是不知道怎么的.ts文件识别不了
  },
};
