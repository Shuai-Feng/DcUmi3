import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal,message, Form } from 'antd';
import { ColumnProps,TableRowSelection } from 'antd/es/table';


import SFaxios from '@/utils/axios';
import SFevent from '@/utils/SFevent';
import { RoleForm,PermEditForm,UserAuthForm } from './component';

//引入样式表
import './style.less';

interface IPermissionProps {}

const Permission: React.FunctionComponent<IPermissionProps> = props => {


  //表格里的数据
  const [tableList, setTableList] = useState<Array<any>>([]);
  //选择表格选项的Id
  const [rowKeys, setRowKeys] = useState<Array<any>>([]);
  //选择条目的内容
  const [rowData, setRowData] = useState<any>();
  //用于判断模态框
  const [modalVisible, setModal] = useState<boolean>(false);
  const [modalTitle,setTitle] = useState<'create'|'setPir'|'userPir'|''>('')


  //获得各个表单的实例
  const [Form_inst, setRForm] = useState<any>();

  //userAuthList 
  const [AuthuserList,setAuthList] = useState<any>({mockData:[],targetKeys:[]});

  //表格的列
  const tableColum:Array<ColumnProps<{}>> = [
      {
          title:"用户Id",
          dataIndex:'id'
      },{
          title:"角色名称",
          dataIndex:'role_name'
      },{
          title:'创建时间',
          dataIndex:'create_time'
      },{
          title:'使用状态',
          dataIndex:'status',
          render(status){
            if(status == 1 ){
                return '启用'
            }else{
                return '停用'
            }
          }
      },{
          title:'使用状态',
          dataIndex:'authorize_time'
      },{
          title:'授权人',
          dataIndex:'authorize_user_name'
      }
  ]

  //表格行学配置项
  const rowSelection:TableRowSelection<{}> = {
    type:'radio',
    selectedRowKeys:rowKeys,
    onChange:(selectRowKey:any,selectRows:any)=>{
      setRowKeys(selectRowKey);
      setRowData(selectRows);
    }
  }

  //负责请求数据的函数
  let handleRequestList =  async ()=>{
    let res:any =  await SFaxios.ajax({url:'/role/list'})
    let tableData:Array<any> = res.result.item_list
    tableData.forEach((item:any,index:number)=>{
        item.key = index;
    })
    setTableList(tableData);
  }

  //模拟componentDidmount
  useEffect(()=>{
    handleRequestList();
    
    SFevent.ee_on('Form_inst',(instant:any)=>{
        setRForm(instant)
    })

  },[])

  // useEffect(()=>{
  //   console.log(Form_inst?.getFieldsValue())
  // },[Form_inst])


  //负责打开模态框的函数
  let handleModalOpen = (type:'create'|'setPir'|'userPir')=>{
    
    if(type == 'create'){

    }else if (rowKeys.length <=0 ){
      message.info('必须选择一条记录哦')
      return 
    }else if(type =='userPir'){
      getRoleRequestList();
    }

    setModal(true)
    setTitle(type)
  }

  //  模态框提交时执行的回调函数
  let handleOk = async ()=>{
    let params  = {...Form_inst.getFieldsValue()};
    let url = '';

    try{
      await Form_inst.validateFields();

      if(modalTitle == 'create'){
        url = '/role/create'
      }else if(modalTitle == 'setPir'){
        url = '/role/user_role_edit'
        params = {...params,targetKeys:AuthuserList.targetKeys}
      }else{
        url = '/role/user_role_edit'
      }
  
      await SFaxios.ajax({url,data:{
        params
      }}).then(res=>{
        message.success('数据修改成功')
        handleRequestList();
        handleModalClose();
      })
    }catch(e){
      message.info('有点问题哦，再检查一下表单吧')
    }
  }



  //关闭模态框执行的函数
  let handleModalClose =  ()=>{
      setModal(false)
      setRForm({})
  }



  //角色划分数据请求
  let getRoleRequestList = async ()=>{
    let res:any =  await SFaxios.ajax({url:'/role/user_list'})
    let itemData:Array<any> = res.result
    itemData.forEach((item:any,index:number)=>{
        item.key = index;
    })
    getAuthuserList(itemData);
  }



  // 角色数据加工
  let getAuthuserList = (datasource: Array<any>)=>{
    const mockData: Array<any> = [];
    const targetKeys: Array<any> = [];
    if(datasource && datasource.length >0){
      datasource.forEach((item: any, index: number)=>{
        const data = {
          key:item.user_id,
          title:item.user_name,
          status:item.status
        }
        if(data.status == 1){
          targetKeys.push(data.key)
        }
        mockData.push(data)
        setAuthList({ mockData, targetKeys });
      })
    }
  }



  const config = {
    'create':'创建角色',
    'setPir':'设置权限',
    'userPir':'用户权限'
  }


  let m_width = {};
  if (modalTitle === 'userPir') {
    m_width = {
      width: 800,
    };
  }



  return (
    <div className="PermissionPage">

      {/* 菜单选项卡 */}
      <Card>
        <div className="grid-test">
          <Button type="primary" onClick={()=>{handleModalOpen('create')}} >创建角色</Button>
          <Button type="primary" onClick={()=>{handleModalOpen('setPir')}} >设置权限</Button>
          <Button type="primary" onClick={()=>{handleModalOpen('userPir')}} >用户权限</Button>
        </div>
      </Card>

      {/* 表格区域 */}
      <div className="content-wrap">
        <Table 
            dataSource={tableList}
            columns={tableColum}
            rowSelection={rowSelection}
            onRow={(record:any,index:any)=>{
              return {
                onClick:()=>{
                  setRowKeys([index]);
                  setRowData([record]);
                }
              } 
            }}
         />
      </div>

      {/* 模态框 */}

  
      <Modal
        title={config[modalTitle]}
        visible={modalVisible}
        onCancel={()=>{handleModalClose()}}
        onOk={()=>{handleOk()}}
        {...m_width}
      >
        {modalTitle == 'create' ? <RoleForm/> :''}
        {modalTitle == 'setPir' ? <PermEditForm detailData={rowData[0]} menuData={rowData[0].menus}  /> :''}
        {modalTitle == 'userPir' ? <UserAuthForm 
          detailData={rowData[0]} 
          mockData={AuthuserList.mockData} 
          targetKeys={AuthuserList.targetKeys} 
          pathUserInfo = { (targetKeys:any)=>{
            setAuthList({...AuthuserList,targetKeys});
          } }
        /> :''}
      </Modal>

    </div>
  );
};

export default Permission;
