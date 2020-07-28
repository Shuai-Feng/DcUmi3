import * as React from 'react';

import { Card, Button, Modal, message } from 'antd';
import Utils from '@/utils';
import ETable from '@/components/ETable';
//引入关于permission的自定义组件
import RoleForm from '@/components/permission/RoleForm';
import PermEditForm from '@/components/permission/PermEditForm';
import RoleAuthForm from '@/components/permission/RoleAuthForm';
import Axios from '@/axios';

export interface IPermissionProps {}

export interface IPermissionState {
  dataSource: any;
  selectedRowKeys?: any;
  selectedIds?: Array<any>;
  selectedItem?: any;

  isUserVisible: boolean;
  isPermVisible: boolean;
  isRoleAuthVisible: boolean;

  detailInfo?: any;
  menuInfo?: any;

  mockData?: Array<any>;
  targetKeys?: Array<any>;
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
      isRoleAuthVisible: false,
    };
  }
  //角色表单实例

  roleForm: any;
  //角色权限更改订单实例
  PermForm: any;

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
        message.success('用户创建成功');
        this.requestList();
      }
    });
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
      detailInfo: item,
      menuInfo: item.menus,
    });
  };

  hanldePermSubmit = () => {
    let data = this.PermForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menu = this.state.menuInfo;
    Axios.ajax({
      url: '/permision/edit',
      data: {
        params: {
          ...data,
        },
      },
    }).then(res => {
      if (res) {
        message.success('权限修改已完成');
        this.setState({
          isPermVisible: false,
        });
        this.requestList();
      }
    });
  };

  //UserAuth 设计逻辑
  handleRoleAuthSet = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        content: '请选择一条记录',
      });
      return;
    }
    this.setState({
      isRoleAuthVisible: true,
      detailInfo: item,
    });
    this.getRoleRequestList(item.id);
  };
  getRoleRequestList = (id: any) => {
    Axios.ajax({
      url: '/role/user_list',
      data: {
        params: {
          id,
        },
      },
    }).then((res: any) => {
      if (res && res.code == 0) {
        this.getAuthuserList(res.result);
      }
    });
  };
  getAuthuserList = (datasource: Array<any>) => {
    console.log(datasource);
    const mockData: Array<any> = [];
    const targetKeys: Array<any> = [];
    //@ts-ignore
    if (datasource || datasource.length > 0) {
      datasource.forEach((item: any, index: number) => {
        const data = {
          key: item.user_id,
          title: item.user_name,
          status: item.status,
        };
        if (data.status == 1) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      });
    }
    this.setState({ mockData, targetKeys });
  };
  handleUserAuthSubmit = () => {
    let data: any = {};
    //argument: targetID
    data.user_ids = this.state.targetKeys;
    //argetment:role.id from selectedItem
    data.role_id = this.state.selectedItem.id;
    console.log(data);
    Axios.ajax({
      url: 'role/user_role_edit',
      data: {
        params: { ...data },
      },
    }).then(res => {
      if (res) {
        message.success('已更改用户授权');
        this.setState({
          isRoleAuthVisible: false,
        });
      }
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
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={this.handleRoleAuthSet}
          >
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
          onOk={this.hanldePermSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false,
            });
          }}
        >
          <PermEditForm
            wrappedComponentRef={(init: any) => {
              this.PermForm = init;
            }}
            detail={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkedkeys: any) => {
              this.setState({
                menuInfo: checkedkeys,
              });
              console.log(this.state.menuInfo);
            }}
          />
        </Modal>
        <Modal
          visible={this.state.isRoleAuthVisible}
          onCancel={() => {
            this.setState({
              isRoleAuthVisible: false,
            });
          }}
          onOk={this.handleUserAuthSubmit}
        >
          <RoleAuthForm
            wrappedComponentRef={(init: any) => {
              this.PermForm = init;
            }}
            detail={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            //用于同步targetKeys
            pathUserInfo={(targetKeys: any) => {
              this.setState({
                targetKeys,
              });
            }}
          />
        </Modal>
      </div>
    );
  }
}
