import * as React from 'react';
import { Card, Table, Modal } from 'antd';
import Utils from '@/utils';

//用于防止Table组件报错
import { RowSelectionType } from 'antd/lib/table/interface';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
import Axios from '@/axios';

export interface IAppProps {}

export interface IAppState {
  dataSource: Array<any>;
  dataSource2: Array<any>;
  selectedRowKeys: Array<any>;
  selectedRows: null;
  selectedItem?: any;
  pagination?: PaginationProps;
}

export default class App extends React.Component<IAppProps, IAppState> {
  params = {
    page: 1,
  };
  state = {
    dataSource: [],
    dataSource2: [],
    selectedRowKeys: [],
    selectedRows: null,
    selectedItem: null,
    pagination: {},
  };
  onRowClick = (record: any, index: any) => {
    let selectKey: any = [index];
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName},用户爱好：${record.interest}`,
    });
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record,
    });
  };
  request = () => {
    let _this: any = this;
    Axios.ajax({
      url: '/table/list',
      data: {
        isLoading: true,
        params: {
          page: this.params.page,
        },
      },
    }).then((res: any) => {
      res.result.list.map((item: any, index: number) => {
        item.key = index;
      });
      this.setState({
        dataSource2: res.result.list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination: Utils.pagination(res, (current: any) => {
          _this.params.page = current;
          this.request();
        }),
      });
    });
  };
  componentDidMount() {
    const data = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00',
      },
      {
        id: '1',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00',
      },
      {
        id: '2',
        userName: 'Lily',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00',
      },
    ];
    data.map((item: any, index: number) => {
      item.key = index;
    });
    this.setState({
      dataSource: data,
    });
    this.request();
  }
  public render() {
    const columns = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        key: 'userName',
        dataIndex: 'userName',
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        render(sex: any) {
          return sex == 1 ? '男' : '女';
        },
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        //suppressImplicitAnyIndexErrors
        render(state: string) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        },
      },
      {
        title: '爱好',
        key: 'interest',
        dataIndex: 'interest',
        render(abc: string) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸',
          };
          return config[abc];
        },
      },
      {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        key: 'address',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        key: 'time',
        dataIndex: 'time',
      },
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection: {
      type: RowSelectionType;
      selectedRowKeys: number[];
    } = {
      type: 'radio',
      selectedRowKeys,
    };
    const rowCheckSelection: {
      type: RowSelectionType;
      selectedRowKeys: number[];
      onChange: any;
    } = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        this.setState({
          selectedRowKeys,
          selectedRows,
        });
      },
    };
    return (
      <div>
        <Card title="带分页的表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
        <Card title="mock 多选">
          <Table
            bordered
            rowSelection={rowCheckSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                },
              };
            }}
          />
        </Card>
        <Card title="mock - 单选">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                },
              };
            }}
          ></Table>
        </Card>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
          ></Table>
        </Card>
        <Card title="动态数据渲染">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
          ></Table>
        </Card>
      </div>
    );
  }
}
