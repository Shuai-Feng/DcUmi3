import * as React from 'react';

import { Card, Button, Modal } from 'antd';
import Utils from '@/utils';
import ETable from '@/components/ETable';
//引入关于permission的自定义组件
import RoleForm from '@/components/permission/RoleForm';
import PermEditForm from '@/components/permission/PermEditForm';
import Axios from '@/axios';

export interface IPermissionProps {}

export interface IPermissionState {
  dataSource: any;
  selectedRowKeys?: any;
  selectedIds?: Array<any>;
  selectedItem?: any;

  isUserVisible: boolean;
  isPermVisible: boolean;
}

export default class Permission extends React.Component<
  IPermissionProps,
  IPermissionState
> {
  constructor(props: IPermissionProps) {
    super(props);
    this.state = {
      dataSource: [],
      isUserVisible: false,
      isPermVisible: false,
    };
  }
  //角色表单实例
  roleForm: any;
  requestList = () => {
    Axios.ajax({
      url: '/role/list',
      data: {
        params: {},
      },
    }).then((res: any) => {
      if (res.code == 0) {
        let dataSource = res.result.item_list.map((item: any, i: number) => {
          item.key = i;
          return item;
        });
        this.setState({
          dataSource,
        });
      }
    });
  };
  componentDidMount() {
    this.requestList();
  }
  handleRoleCrate = () => {
    this.setState({
      isUserVisible: true,
    });
  };
  handlePermSet = () => {
    let item: any = this.state.selectedItem;
    if (!item) {
      Modal.info({
        content: '请选择一条记录',
      });
      return;
    }
    this.setState({
      isPermVisible: true,
    });
  };
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    Axios.ajax({
      url: '/role/create',
      data: {
        pramas: data,
      },
    }).then((res: any) => {
      if (res.code == 0) {
        this.setState({
          isUserVisible: false,
        });
        this.requestList();
      }
    });
    this.setState({
      isUserVisible: true,
    });
  };
  public render() {
    const colums = [
      {
        title: '角色ID',
        dataIndex: 'id',
      },
      {
        title: '角色名称',
        dataIndex: 'role_name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formateData,
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(state: any) {
          if (state == 1) {
            return '启用';
          } else {
            return '停用';
          }
        },
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateData,
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name',
      },
    ];
    return (
      <div>
        <Card>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={this.handleRoleCrate}
          >
            创建角色
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={this.handlePermSet}
          >
            设置权限
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }}>
            用户授权
          </Button>
        </Card>
        <Card>
          <ETable
            updateSelectedItem={Utils.updateSeletedItem.bind(this)}
            columns={colums}
            dataSource={this.state.dataSource}
            selectedRowKeys={this.state.selectedRowKeys}
          />
        </Card>
        <Modal
          visible={this.state.isUserVisible}
          onCancel={() => {
            this.setState({
              isUserVisible: false,
            });
          }}
          onOk={() => {
            this.handleRoleSubmit();
          }}
        >
          <RoleForm
            wrappedComponentRef={(init: any) => {
              this.roleForm = init;
            }}
          />
        </Modal>
        <Modal
          title="设置权限"
          width={600}
          visible={this.state.isPermVisible}
          onCancel={() => {
            this.setState({
              isPermVisible: false,
            });
          }}
        >
          <PermEditForm detail={this.state.selectedItem} />
        </Modal>
      </div>
    );
  }
}
