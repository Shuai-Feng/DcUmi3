import * as React from 'react';
import BaseForm from '@/components/BaseForm';
import { Card, Button, Table, Modal, message } from 'antd';
import Utils from '@/utils';
import Axios from '@/axios';

export interface IAppProps {}

export interface IAppState {
  isShowOpenCity: boolean;
  list: Array<any>;
}

class City extends React.Component<IAppProps, IAppState> {
  state = {
    isShowOpenCity: false,
    list: [],
  };
  params = {
    page: 1,
  };
  //用户存放city
  cityForm: any;

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '',
      width: 80,
      list: [
        { id: '', name: '全部' },
        { id: '1', name: '北京' },
        { id: '2', name: '天津' },
        { id: '3', name: '上海' },
      ],
    },
    {
      type: 'SELECT',
      label: '用车模式',
      field: 'mode',
      placeholder: '全部',
      initialValue: '',
      width: 120,
      list: [
        { id: '', name: '全部' },
        { id: '1', name: '指定停车点模式' },
        { id: '2', name: '禁停区模式' },
      ],
    },
    {
      type: 'SELECT',
      label: '营运模式',
      field: 'op_mode',
      placeholder: '全部',
      initialValue: '',
      width: 80,
      list: [
        { id: '', name: '全部' },
        { id: '1', name: '自营' },
        { id: '2', name: '加盟' },
      ],
    },
    {
      type: 'SELECT',
      label: '加盟商授权状态',
      field: 'auth_status',
      placeholder: '全部',
      initialValue: '',
      width: 80,
      list: [
        { id: '', name: '全部' },
        { id: '1', name: '已授权' },
        { id: '2', name: '未授权' },
      ],
    },
  ];
  requestList = () => {
    Axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page,
        },
      },
    }).then((res: any) => {
      let list = res.result.item_list.map((item: any, index: number) => {
        item.key = index;
        return item;
      });
      this.setState({
        list,
      });
    });
  };
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true,
    });
  };
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    Axios.ajax({
      url: '/city/open',
      data: {
        params: cityInfo,
      },
    }).then((res: any) => {
      if (res.code == '0') {
        message.success('开通成功');
        this.setState({
          isShowOpenCity: false,
        });
        this.requestList();
      }
    });
  };
  componentDidMount() {
    this.requestList();
  }
  public render() {
    let formList: any = this.formList;
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id',
      },
      {
        title: '城市名称',
        dataIndex: 'name',
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode: any) {
          return mode == 1 ? '停车点' : '禁停区';
        },
      },
      {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(op_mode: any) {
          return op_mode == 1 ? '自营' : '加盟';
        },
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name',
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr: any) {
          return arr
            .map((item: any) => {
              return item.user_name;
            })
            .join(',');
        },
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time',
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formateData,
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name',
      },
    ];
    return (
      <div>
        <Card>
          <BaseForm formList={formList} layout="inline" />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleOpenCity}>
            开通城市
          </Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
          ></Table>
        </div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false,
            });
          }}
          onOk={this.handleSubmit}
        >
          <BaseForm
            formList={formList}
            wrappedComponentRef={(inst: any) => {
              this.cityForm = inst;
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default City;
