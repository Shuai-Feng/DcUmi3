import React, { useEffect, useState } from 'react';
import { Card, Table, Form, message, Button, Modal } from 'antd';
//从antd 的 form 里 获取一下
import SFaxios from '@/utils/axios';
import FilterForm from './components/FilterForm';
import OpenCityForm from './components/OpenForm';
import SFevent from '@/utils/SFevent';

import SFUtils from '@/utils/utils';
export interface ICityPageProps {}

export interface ICityPageState {
  modalVisibel: boolean;
  listData: Array<any>;
}

export default class CityPage extends React.Component<
  ICityPageProps,
  ICityPageState
> {
  state = {
    modalVisibel: false,
    listData: [],
    page: 0,
  };

  //
  filterForm: any;
  //
  Opencity: any;

  requestList = async () => {
    let { page } = this.state;
    let resultData: any = await SFaxios.ajax({
      url: '/open_city',
      data: { params: { page } },
    });
    if (resultData || resultData.code == 0) {
      resultData.result.item_list.forEach((item: any, index: number) => {
        item.key = index;
      });
      this.setState({
        listData: resultData.result.item_list,
      });
    } else {
      message.info('出现了问题\n放心，不是你的问题');
    }
  };

  componentWillMount() {
    SFevent.ee_on('getMyFilter', (myFilter: any) => {
      this.filterForm = myFilter;
    });
    SFevent.ee_on('getOpenCity', (myOpen: any) => {
      this.Opencity = myOpen;
    });
  }

  componentDidMount() {
    this.requestList();
  }

  handleOpenCitySubmit = async () => {
    try {
      await this.Opencity.validateFields();
      let OpenCityData = this.Opencity.getFieldsValue();
      SFaxios.ajax({ url: '/city/open', data: { params: OpenCityData } }).then(
        res => {
          this.setState({ modalVisibel: false });
          this.requestList();
          this.Opencity.resetFields();
        },
      );
    } catch (error) {
      message.warning('不对哦亲，表单好像有问题');
    }
  };
  render() {
    let { modalVisibel, listData } = this.state;
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
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name',
      },
    ];
    return (
      <div className="CityPage">
        <Card style={{ marginBottom: 10 }}>
          <FilterForm />
        </Card>
        <Card>
          <Button
            type="primary"
            onClick={() => {
              this.setState({ modalVisibel: true });
            }}
          >
            开通城市
          </Button>
        </Card>
        <Card>
          {/* <Input onBlur={handleRegTest}/> */}
          <Table columns={columns} dataSource={listData} />
        </Card>
        <Modal
          visible={modalVisibel}
          onCancel={() => {
            this.setState({ modalVisibel: false });
          }}
          title={'开通城市'}
          onOk={this.handleOpenCitySubmit}
        >
          <OpenCityForm />
        </Modal>
      </div>
    );
  }
}

// interface ICityPageProps {}

// const CityPage: React.FunctionComponent<ICityPageProps> = props => {
//   let any: any;

//   let [listData, setListData] = useState([]);
//   let [modalVisibel, setVisibel] = useState(false);

//   let [filterFormRef, setFilterForm] = useState(any);
//   //城市开通窗口的实例
//   let [openCityForm, setOpenCity] = useState(any);

//   const page = useState(2);

//   //定义表格的列
//   const columns = [
//     {
//       title: '城市ID',
//       dataIndex: 'id',
//     },
//     {
//       title: '城市名称',
//       dataIndex: 'name',
//     },
//     {
//       title: '用车模式',
//       dataIndex: 'mode',
//     },
//     {
//       title: '授权加盟商',
//       dataIndex: 'franchisee_name',
//     },
//     {
//       title: '城市管理员',
//       dataIndex: 'city_admins',
//       render(arr: any) {
//         return arr
//           .map((item: any) => {
//             return item.user_name;
//           })
//           .join(',');
//       },
//     },
//     {
//       title: '城市开通时间',
//       dataIndex: 'open_time',
//     },
//     {
//       title: '操作时间',
//       dataIndex: 'update_time',
//     },
//     {
//       title: '操作人',
//       dataIndex: 'sys_user_name',
//     },
//   ];

//   //请求数据
//   let requestList = async () => {
//     let resultData: any = await SFaxios.ajax({
//       url: '/open_city',
//       data: { params: { page } },
//     });
//     if (resultData || resultData.code == 0) {
//       resultData.result.item_list.forEach((item: any, index: number) => {
//         item.key = index;
//       });
//       setListData(resultData.result.item_list);
//     } else {
//       message.info('出现了问题\n放心，不是你的问题');
//     }
//   };

//   //组件渲染完成后执行
//   useEffect(() => {
//     requestList();
//     SFevent.ee_on('getOpenCity', (myFilter: any) => {
//       setOpenCity(myFilter);
//     });
//     SFevent.ee_on('getMyFilter', (myOpen: any) => {
//       setFilterForm(myOpen);
//     });
//   }, []);

//   //开通城市
//   let hanldeCitySubmit = () => {
//     console.log(openCityForm.getFieldsValue());
//   };

//   return (
//     <div className="CityPage">
//       <Card style={{ marginBottom: 10 }}>
//         <FilterForm />
//       </Card>
//       <Card>
//         <Button onClick={() => {}}>查询</Button>
//         <Button onClick={() => {}}>重置</Button>
//       </Card>
//       <Card>
//         <Button
//           type="primary"
//           onClick={() => {
//             setVisibel(true);
//           }}
//         >
//           开通城市
//         </Button>
//       </Card>
//       <Card>
//         {/* <Input onBlur={handleRegTest}/> */}
//         <Table columns={columns} dataSource={listData} />
//       </Card>
//       <Modal
//         visible={modalVisibel}
//         onCancel={() => {
//           setVisibel(false);
//         }}
//         title={'开通城市'}
//         onOk={hanldeCitySubmit}
//       >
//         <OpenCityForm />
//       </Modal>
//     </div>
//   );
// };
// export default CityPage;
