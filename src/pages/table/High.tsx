import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import SFaxios from '@/utils/axios';
import { ColumnProps } from 'antd/es/table';
interface IHighProps {}

const High: React.FunctionComponent<IHighProps> = props => {
  const [tableData, setTableData] = useState([]);
  const columns1 = [
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
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '爱好',
      dataIndex: 'interest',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
  ];
  const columns2: Array<ColumnProps<{}>> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      width: 60,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 60,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 60,
    },
    {
      title: '爱好',
      dataIndex: 'interest',
      width: 60,
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      width: 60,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 60,
    },
  ];
  const columns3: Array<ColumnProps<{}>> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
      sorter: (a: any, b: any) => {
        return a.userName.length - b.userName.length;
      },
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      width: 60,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 60,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 60,
    },
    {
      title: '爱好',
      dataIndex: 'interest',
      width: 60,
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      width: 60,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 60,
    },
  ];
  //向远程请求表单数据
  let handleRequest = async () => {
    let remote_list: any = await SFaxios.ajax({ url: '/wbbb' });
    setTableData(remote_list.result.item_lists);
  };

  //相当于componentDIDMount
  useEffect(() => {
    handleRequest();

    // and this on  impliment componentWillUnmount
    return () => {};
  }, []);
  return (
    <div className="highTable">
      <Card title="列排序" style={{ marginBottom: 10 }}>
        <Table bordered columns={columns3} dataSource={tableData}></Table>
      </Card>
      <Card title="表头固定" style={{ marginBottom: 10 }}>
        <Table
          bordered
          columns={columns1}
          scroll={{ y: 300 }}
          dataSource={tableData}
        ></Table>
      </Card>
      <Card title="列宽固定" style={{ marginBottom: 10 }}>
        <Table bordered columns={columns2} dataSource={tableData}></Table>
      </Card>
    </div>
  );
};

export default High;
