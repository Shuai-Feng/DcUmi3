import  React,{ useEffect } from 'react';
import { Input,Select,Form,Tree } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import SFevent from '@/utils/SFevent';
import menuConfig,{menuItem} from '@/component/NavBar/menuConfig';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

interface IPermEditFormProps extends FormComponentProps {
  detailData:any
  menuData:any
}

const PermEditForm: React.FunctionComponent<IPermEditFormProps> = (props) => {

  const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 18}
  }

  
  let { detailData,menuData } = props;
    

  let { getFieldDecorator } = props.form; 

  let renderTreeNode = (data:any)=>{
      
     return data.map((item:menuItem,index:number)=>{
        if(item.children){
           return  <TreeNode title={item.title} key={item.key} >
              { renderTreeNode(item.children) }
          </TreeNode>
        }else{
          return <TreeNode title={item.title} key={item.key} ></TreeNode>
        }
     })
  }
  
  useEffect(()=>{
    SFevent.ee_emit('Form_inst',props.form)
  },[])



  return <div className="PermEditForm">
      <Form layout='horizontal'>
        <FormItem label='人力名称' {...formItemLayout}>
            {
              getFieldDecorator('user_name',{
                    initialValue:detailData.authorize_user_name
              })(
                <Input disabled placeholder={detailData.authorize_user_name}/>
              )
            }
        </FormItem>
        <FormItem label='状态' {...formItemLayout}>
            {
              getFieldDecorator('status',{
                  initialValue:'1'
              })(
                <Select style={{width:80}} placeholder='启用'>
                    <Option value='1' >启用</Option>
                    <Option value='0' >停用</Option>
                </Select>
              )
            }
        </FormItem>
        <Tree
            checkable
            defaultExpandAll
            checkedKeys={menuData}
        >
              <TreeNode title='平台权限' key="platform_all">
                  { renderTreeNode(menuConfig) }
              </TreeNode> 
        </Tree>
      </Form>
  </div> ;
};

export default Form.create<IPermEditFormProps>()(PermEditForm);
