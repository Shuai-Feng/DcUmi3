import * as React from 'react';
import { Card, Button, Table, message, Modal } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/es/table';
import SForm, { SFormItemProps } from '@/component/SForm';
import SFaxios from '@/utils/axios';

interface IOrderPageProps {}

const OrderPage: React.FunctionComponent<IOrderPageProps> = props => {
  // 存放顶点表格上的数据
  const [tableList, setTableList] = React.useState([]);
 
  //选择表格选项的Id
  const [rowKeys, setRowKeys] = React.useState<Array<any>>([]);
  //选择条目的内容
  const [rowData, setRowData] = React.useState<any>();
  //控制模态框的希纳是;

  const columns: Array<ColumnProps<{}>> = [
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

  const formItemList: Array<SFormItemProps> = [
    {
      type: 'Select',
      label: '城市',
      width: 140,
      field: 'city',
      list: [
        { id: '', name: '全部' },
        { id: 'beijin', name: '北京' },
        { id: 'tianjin', name: '天津' },
      ],
    },
    {
      type: 'DateZoom',
      label: '订单时间',
      field: 'order_time',
    },
    {
      type: 'Select',
      label: '订单状态',
      width: 140,
      field: 'order_status',
      list: [
        { id: '', name: '全部' },
        { id: '1', name: '进行中' },
        { id: '2', name: '已完成' },
      ],
    },
  ];
  //表格选择时进行的控制
  const rowSelection: TableRowSelection<{}> = {
    type: 'radio',
    selectedRowKeys: rowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setRowKeys(selectedRowKeys);
      setRowData(selectedRows);
    },
  };

  //表格数据渲染
  let requestList = async (params: any) => {
    try {
      let tableData: any = await SFaxios.ajax({
        url: '/orderlist',
        data: {
          params,
        },
      });
      tableData = tableData.result.item_list;
      tableData.forEach((item: any, index: number) => {
        item.key = index;
      });
      setTableList(tableData || []);
    } catch (error) {
      message.warning('出问题啦\n心不是你的问题');
    }
  };

  //筛选表单提交时所触发的事件
  let handleFilterSubmit = (filteData: any) => {
    requestList(filteData);
  };
  //
  let handleUserDelete = () => {
    SFaxios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          order_id: rowData[0].order_sn,
        },
      },
    })
      .then(res => {
        message.success('订单结束已完成');
      })
      .catch(rej => {
        message.warning('有问题哦');
      });
  };

  //订单结束逻辑
  let handleOrderEnd = () => {
    if (rowKeys.length > 0) {
      Modal.confirm({
        title: `是否要结束订单 ${rowData[0].bike_sn}`,
        okText: '确定',
        cancelText: '取消',
        onOk: handleUserDelete,
      });
    } else {
      message.warning('请选择一条记录');
    }
  };
  //显示订单详情
  let handleOrderDetail = () => {
    if (rowKeys.length > 0) {
      window.open('/#/detail/order/' + rowData[0].order_sn, '_blank');
    } else {
      message.warning('请选择一条记录');
    }
  };
  React.useEffect(() => {
    requestList({ page: 1 });
  }, []);

  return (
    <div className="OrderPage">
      <Card>
        {/* <OrderForm/> */}
        <SForm FormList={formItemList} handleSubmit={handleFilterSubmit} />
      </Card>
      <Card>
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={handleOrderDetail}
        >
          订单详情
        </Button>
        <Button type="primary" onClick={handleOrderEnd}>
          结束订单
        </Button>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={tableList}
          rowSelection={rowSelection}
          onRow={(record: any, index: any) => {
            return {
              onClick: () => {
                setRowKeys([index]);
                setRowData([record]);
              }
            };
          }}
          
        />
      </Card>
    </div>
  );
};

export default OrderPage;
