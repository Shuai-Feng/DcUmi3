import * as React from 'react';
import BaseForm from '@/components/BaseForm';
import { Card, Button, Table, message, Modal, Form } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';

import axios from '@/axios';
import FormItem from 'antd/lib/form/FormItem';
// declare type TableRowSelection = any;

export interface IAppProps {}

export interface IAppState {
  list: Array<any>;
  selectedRowKeys: Array<any>;
  selectedItem?: any;
  orderConfirmVisble: boolean;
  orderInfo?: any;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      list: [],
      selectedRowKeys: [],
      selectedItem: '',
      orderConfirmVisble: false,
      orderInfo: {},
    };
  }

  params = {
    page: 1,
  };
  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '1',
      width: 80,
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '北京' },
        { id: '2', name: '天津' },
        { id: '3', name: '上海' },
      ],
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: '1',
      width: 80,
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '进行中' },
        { id: '2', name: '结束行程' },
      ],
    },
    {
      type: 'TIME',
    },
  ];
  onRowClick = (record: any, index: number) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record,
    });
  };
  openOrderDetial = () => {
    let item: any = this.state.selectedItem;
    if (!item) {
      message.warning('请选择一条记录');
      return;
    }
    window.open(`/#/detail/${item.id}`, '_blank');
  };
  handleConfirm = () => {
    let item: any = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束',
      });
      return;
    }
    axios
      .ajax({
        url: '/order/bike_info',
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res: any) => {
        console.log(res);
        if (res.code == 0) {
          this.setState({
            orderInfo: res.result,
            orderConfirmVisble: true,
          });
        }
      });
  };
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios
      .ajax({
        url: '/order/finish_order',
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res: any) => {
        if (res.code == 0) {
          message.success('订单结束成功');
          this.setState({
            orderConfirmVisble: false,
          });
          this.requestList();
        }
      });
  };
  requestList = () => {
    axios
      .ajax({
        url: '/orderlist',
        data: {
          params: this.params,
        },
      })
      .then((res: any) => {
        let list = res.result.item_list.map((item: any, index: number) => {
          item.key = index;
          return item;
        });
        this.setState({
          list,
        });
      });
  };
  componentDidMount() {
    this.requestList();
  }
  public render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn',
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn',
      },
      {
        title: '用户名',
        dataIndex: 'user_name',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance: number) {
          return distance / 1000 + 'Km';
        },
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee',
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay',
      },
    ];
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection: TableRowSelection<any> = {
      type: 'radio',
      selectedRowKeys,
    };
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} showButton layout="inline" />
        </Card>
        <Card>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.openOrderDetial}
          >
            订单详情
          </Button>
          <Button type="primary" onClick={this.handleConfirm}>
            结束订单
          </Button>
        </Card>
        <div className="content-wrap">
          <Table
            columns={columns}
            dataSource={this.state.list}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                },
              };
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
            this.setState({
              orderConfirmVisble: false,
            });
          }}
          onOk={this.handleFinishOrder}
        >
          <Form>
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
