import React, { useRef } from 'react';
import { Table, Card } from 'antd';
import SFaxios from '@/utils/axios';
import myUtils from '@/utils/utils';

export interface IBasePageState {
  tableSource1: Array<any>;
}

export default class BasePage extends React.Component<{}, IBasePageState> {
  state = {
    tableSource1: [],
  };

  handleRequest = async () => {
    // let result = await SFaxios.ajax({url:"/orderlist"}).then((res:any)=>{
    //   let listData = res.result.item_list || [];
    //   listData.forEach((item:any,index:number)=>{
    //     item.key = index;
    //   })
    //   this.setState({
    //     tableSource1:res.result.item_list
    //   })
    // })
    let result: any = await SFaxios.ajax({ url: '/orderlist' });
    let listData = result.result.item_list || [];
    listData.forEach((item: any, index: number) => {
      item.key = index;
    });
    this.setState({
      tableSource1: listData,
    });
  };
  public render() {
    const columns1 = [
      {
        title: '用户Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '订单编号',
        dataIndex: 'order_sn',
        key: 'order_sn',
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn',
        key: 'bike_sn',
      },
      {
        title: '用户编号',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '距离',
        dataIndex: 'distance',
        key: 'distance',
      },
      {
        title: '总计时间',
        dataIndex: 'total_time',
        key: 'total_time',
      },
      {
        title: '早起时间',
        dataIndex: 'start_time',
        key: 'start_time',
      },
    ];
    return (
      <div className="BaseTablePage">
        <Card title="动态mocK表格" style={{ marginBottom: 10 }}>
          <Table columns={columns1} dataSource={this.state.tableSource1} />
        </Card>
        <Card title="带单选按钮的控件" style={{ marginBottom: 10 }}>
          <Table
            rowSelection={{
              type: 'radio',
            }}
            columns={columns1}
            dataSource={this.state.tableSource1}
          />
        </Card>
        <Card title="带多选按钮的控件" style={{ marginBottom: 10 }}>
          <Table
            rowSelection={{
              type: 'checkbox',
            }}
            columns={columns1}
            dataSource={this.state.tableSource1}
          />
        </Card>
      </div>
    );
  }
  componentDidMount() {
    function enbounce(callback: Function, delay: number) {
      let timer: any = null;
      return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(callback, delay);
      };
    }
  }
}
