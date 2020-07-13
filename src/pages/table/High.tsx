import * as React from 'react';
import { Table, Card, Badge, Button, Modal, message } from 'antd';
import axios from '@/axios';

export interface IAppProps {}

export interface IAppState {
  dataSource: Array<any>;
  sortOrder: any;
}

export default class App extends React.Component<IAppProps, IAppState> {
  state = {
    dataSource: [],
    sortOrder: false,
  };
  params = {
    page: 1,
  };
  request = () => {
    axios
      .ajax({
        url: '/table/high/list',
        data: {
          params: {
            page: this.params.page,
          },
        },
      })
      .then((res: any) => {
        if (res.code == 0) {
          res.result.list.map((item: any, index: number) => {
            item.key = index;
          });
          this.setState({
            dataSource: res.result.list,
          });
        }
      });
  };
  handleDelete = (item: any) => {
    let id = item.id;
    Modal.confirm({
      title: '确认',
      content: '确认删除吗？',
      onOk: () => {
        message.success('删除成功');
        this.request();
      },
    });
  };
  handleChange = (pagination: any, filters: any, sorter: any) => {
    this.setState({
      sortOrder: sorter.order,
    });
  };
  componentDidMount() {
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
        //suppressImplicitAnyIndexErrors  不提示对象索引隐式 any 的错误
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
    const columns2 = [
      {
        title: 'id',
        key: 'id',
        width: 80,
        fixed: 'left',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        key: 'userName',
        width: 80,
        fixed: 'left',
        dataIndex: 'userName',
      },
      {
        title: '性别',
        key: 'sex',
        width: 80,
        dataIndex: 'sex',
        render(sex: any) {
          return sex == 1 ? '男' : '女';
        },
      },
      {
        title: '状态',
        key: 'state',
        width: 80,
        dataIndex: 'state',
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
        width: 80,
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
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        key: 'address',
        width: 120,
        fixed: 'right',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        key: 'time',
        width: 80,
        fixed: 'right',
        dataIndex: 'time',
      },
    ];
    const columns3 = [
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
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
        sorter: (a: any, b: any) => {
          return a.age - b.age;
        },
        sortOrder: this.state.sortOrder,
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        render(state: any) {
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
        render(abc: any) {
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
    const columns4 = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex: any) {
          return sex == 1 ? '男' : '女';
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state: any) {
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
        dataIndex: 'interest',
        render(abc: any) {
          let config = {
            '1': <Badge status="success" text="成功" />,
            '2': <Badge status="error" text="报错" />,
            '3': <Badge status="default" text="正常" />,
            '4': <Badge status="processing" text="进行中" />,
            '5': <Badge status="warning" text="警告" />,
          };
          return config[abc];
        },
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '操作',
        render: (text: any, item: any) => {
          return (
            <Button
              size="small"
              onClick={item => {
                this.handleDelete(item);
              }}
            >
              删除
            </Button>
          );
        },
      },
    ];
    return (
      <div>
        <Card title="操作按钮">
          <Table
            columns={columns4}
            dataSource={this.state.dataSource}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="表格排序">
          <Table
            columns={columns3}
            dataSource={this.state.dataSource}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="侧边固定">
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            scroll={{ x: 2650 }}
          />
        </Card>
        <Card title="表头固定">
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            scroll={{ y: 240 }}
          />
        </Card>
      </div>
    );
  }
}
