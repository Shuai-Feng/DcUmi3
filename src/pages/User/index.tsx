import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal, message, Form } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/es/table';

import { WrappedFormUtils } from 'antd/es/form/Form';
//引入这个表单的接口
import { SFormItemProps } from '@/component/SForm';
import SFform from '@/component/SForm';
//引入自己的封装的请求
import SFaxios from '@/utils/axios';
import UserForm from './component/UserFrom';
import SFevent from '@/utils/SFevent';

interface IUserPageProps {}

const UserPage: React.FunctionComponent<IUserPageProps> = props => {
  //表单的控制
  const [tableData, setTable] = useState<Array<any>>([]);
  //更改模态框状态
  const [modalState, setModal] = useState({
    isVisible: false,
    title: '',
    type: '',
  });

  //表格的信息的使用
  const [rowKey, setRowKeys] = useState<Array<any>>([]); //表格对应键值
  const [rowData, setRowData] = useState<any>({}); //表格对应数据

  //存放表单实例
  const [userform, getUserForm] = useState<WrappedFormUtils>();

  //定义表单自定义字段
  const formList: Array<SFormItemProps> = [
    {
      type: 'Input',
      field: 'userName',
      label: '用户名',
    },
    {
      type: 'Input',
      field: 'phone',
      label: '手机号',
    },
    {
      type: 'SimpleDateZoom',
      field: 'date',
      label: '用户日期',
    },
  ];
  //定义表格列
  const userTableColumns: Array<ColumnProps<{}>> = [
    {
      title: '用户id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: '性别',
      key: 'sex',
      dataIndex: 'sex',
      render: sex => {
        let config = {
          '1': '男',
          '2': '女',
        };
        return config[sex];
      },
    },
    {
      title: '性别',
      key: 'state',
      dataIndex: 'state',
      render: state => {
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
      title: '兴趣',
      key: 'interest',
      dataIndex: 'interest',
      render: (interest: any) => {
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
      title: '生日',
      key: 'birthday',
      dataIndex: 'birthday',
    },
  ];

  //表格行选配置
  const rowSelection: TableRowSelection<{}> = {
    type: 'radio',
    selectedRowKeys: rowKey,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setRowKeys(selectedRowKeys);
      setRowData(selectedRows);
    },
  };

  //componentDidmount
  useEffect(() => {
    requestList();
    SFevent.ee_on('userForm_create', (formInstant: any) => {
      getUserForm(formInstant);
    });
  }, []);

  //请求列表封装
  let requestList = async (param?: any) => {
    let tableData: any;
    if (param) {
      tableData = await SFaxios.ajax({ url: '/user/list' });
    } else {
      tableData = await SFaxios.ajax({
        url: '/user/list',
        data: { params: { ...param } },
      });
    }
    tableData.result.item_list.map((item: any, index: number) => {
      item.key = index;
    });
    setTable(tableData.result.item_list);
  };
  let footer = {};
  if (modalState.type === 'detail') {
    footer = {
      footer: null,
    };
  }
  //打开相应窗口
  let handleOpen = (type: 'create' | 'detail' | 'edit' | 'delete') => {
    let modaltitle: string = '';
    if (type == 'create') {
      modaltitle = '创建员工';
      setModal({ isVisible: true, title: modaltitle, type });
    } else if (type == 'edit' || type == 'detail') {
      if (!rowKey.length) {
        message.info('请选择一位员工');
        return;
      }
      modaltitle = type == 'edit' ? '员工编辑' : '员工详情';
      setModal({ isVisible: true, title: modaltitle, type });
    } else if (type == 'delete') {
      if (!rowKey.length) {
        message.info('请选择一位员工');
        return;
      }
      Modal.confirm({
        title: '员工删除',
        content: '你确定要删除员工 ' + rowData.id + ' 吗?',
        onOk: () => {
          handleDelete(rowKey[0]);
        },
        onCancel: () => {
          setModal({ ...modalState, isVisible: false });
        },
      });
    }
  };

  //角色删除逻辑
  let handleDelete = (id: string) => {
    SFaxios.ajax({
      url: '/user/delete',
      data: {
        params: {
          delete_id: id,
        },
      },
    })
      .then(res => {
        message.success('用户删除成功');
      })
      .catch(err => {
        message.warn('出现了问题，放心不是你的问题');
      });
    requestList();
    setModal({ ...modalState, isVisible: false });
  };

  //表单提交
  let handleSubmit = () => {
    let formData = userform?.getFieldsValue();
    SFaxios.ajax({
      url: modalState.type == 'create' ? '/user/add' : '/user/edit',
      data: {
        params: formData,
        isShowLoading: true,
      },
    }).then((res: any) => {
      if (res.code == 0) {
        requestList();
        setModal({ ...modalState, isVisible: false });
      }
    });
  };

  return (
    <div className="UserPage">
      {/* 渲染员工操作表单 */}
      <Card>
        <SFform FormList={formList} />
      </Card>
      {/* 渲染员工操作按钮   */}
      <Card>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          onClick={() => {
            handleOpen('create');
          }}
          icon="plus"
        >
          创建员工
        </Button>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          onClick={() => {
            handleOpen('edit');
          }}
          icon="edit"
        >
          编辑员工
        </Button>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          onClick={() => {
            handleOpen('detail');
          }}
        >
          员工详情
        </Button>
        <Button
          style={{ marginRight: 10 }}
          type="danger"
          onClick={() => {
            handleOpen('delete');
          }}
          icon="delete"
        >
          删除员工
        </Button>
      </Card>
      <Card>
        {/* 渲染员工表格 */}
        <Table
          dataSource={tableData}
          columns={userTableColumns}
          rowSelection={rowSelection}
          onRow={(record: any, index: any) => {
            return {
              onClick: () => {
                setRowData(record);
                setRowKeys([index]);
              },
            };
          }}
        />
      </Card>
      <Modal
        visible={modalState.isVisible}
        title={modalState.title}
        onCancel={() => {
          setModal({ ...modalState, isVisible: false });
        }}
        onOk={handleSubmit}
        okText={'确定'}
        cancelText={'取消'}
        {...footer}
      >
        <UserForm
          type={modalState.type}
          userInfo={modalState.type != 'create' ? rowData : {}}
        />
      </Modal>
    </div>
  );
};

export default UserPage;
