import * as React from 'react';
import { Card, Button, Form, Input, Modal, message } from 'antd';
import ETable from '@/components/ETable';
import UserForm from '@/components/User/UserForm';

import Axios from '@/axios';
import Utils from '@/utils';

const FormItem = Form.Item;

export interface IUserProps {}

export interface IUserState {
  list: Array<any>;
  selectedRowKeys: any;
  selectedIds: Array<any>;

  selectedItem?: any;
  isVisible: boolean;
  title?: string;

  userInfo?: any;
  type?: any;
}

export default class User extends React.Component<IUserProps, IUserState> {
  constructor(props: IUserProps) {
    super(props);
    this.state = {
      list: [],
      selectedRowKeys: [],
      selectedIds: [],
      isVisible: false,
    };
  }
  userForm: any;
  params = {
    page: 1,
  };

  handleOperator = (type: string) => {
    let item: any = this.state.selectedItem;
    if (type === 'create') {
      this.setState({
        title: '创建员工',
        isVisible: true,
        type: type,
      });
    } else if (type === 'edit' || type === 'detail') {
      if (!item) {
        Modal.info({
          title: '信息',
          content: '请选择一个用户',
        });
        return;
      }
      this.setState({
        type: type === 'edit' ? '编辑用户' : '查看详情',
        isVisible: true,
        userInfo: item,
        //@ts-ignore
        type: type,
      });
    } else if (type === 'delete') {
      if (!item) {
        Modal.info({
          title: '信息',
          content: '请选择一个用户',
        });
        return;
      }
      Modal.confirm({
        title: '确定要删除此用户吗？',
        onOk: () => {
          Axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id,
              },
            },
          }).then((res: any) => {
            if (res.code == 0) {
              this.setState({
                isVisible: false,
              });
              message.success('信息成功删除');
              this.requestList();
            }
          });
        },
      });
    }
  };
  requestList = () => {
    Axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page,
        },
      },
    }).then((res: any) => {
      this.setState({
        list: res.result.list.map((item: any, index: number) => {
          item.key = index;
          return item;
        }),
      });
    });
  };
  componentDidMount() {
    this.requestList();
  }
  public render() {
    const columns = [
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
        title: '状态',
        dataIndex: 'state',
        render(state: any) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        },
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest: any) {
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
          return config[interest];
        },
      },
      {
        title: '爱好',
        dataIndex: 'isMarried',
        render(isMarried: any) {
          return isMarried ? '已婚' : '未婚';
        },
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '联系地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      },
    ];
    return (
      <div>
        <Card>
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登 录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card>
          <Button
            icon="plus"
            type="primary"
            onClick={() => this.handleOperator('create')}
          >
            创建员工
          </Button>
          <Button icon="edit" onClick={() => this.handleOperator('edit')}>
            编辑员工
          </Button>
          <Button onClick={() => this.handleOperator('detail')}>
            员工详情
          </Button>
          <Button
            icon="delete"
            type="danger"
            onClick={() => this.handleOperator('delete')}
          >
            删除员工
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            selectedRowKeys={this.state.selectedRowKeys}
            // selectedItem={this.state.selectedItem}
            // selectedIds={this.state.selectedIds}
            columns={columns}
            dataSource={this.state.list}
            updateSelectedItem={Utils.updateSeletedItem.bind(this)}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          width={600}
          onCancel={() => {
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false,
            });
          }}
        >
          <UserForm
            userInfo={this.state.userInfo}
            type={this.state.type}
            wrappedComponentRef={(inst: any) => {
              this.userForm = inst;
            }}
          />
        </Modal>
      </div>
    );
  }
}

// interface IUserFormProps extends FormComponentProps {

// }

// class UserForm extends React.Component<IUserFormProps> {
//   public render() {
//     let {getFieldDecorator}  = this.props.form;
//     return (
//       <div>
//         <Form>
//           <FormItem>
//             {
//               getFieldDecorator('user_name')(
//                 <Input type="text" placeholder="请输入姓名"/>
//               )
//             }
//           </FormItem>
//         </Form>
//       </div>
//     );
//   }
// }

//  //@ts-ignore
//  UserForm = Form.create<IUserFormProps>({})(UserForm)
