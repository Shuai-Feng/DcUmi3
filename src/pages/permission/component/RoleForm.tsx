import React,{ useEffect } from 'react';
import { Form,Input,Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import SFevent from '@/utils/SFevent';

const FormItem = Form.Item;
const Option = Select.Option;


interface IRoleFormProps extends FormComponentProps {
  detailData:any
  menuData:any
}

const RoleForm: React.FunctionComponent<IRoleFormProps> = (props) => {

  let { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 18}
  }

  useEffect(()=>{
    SFevent.ee_emit('Form_inst',props.form)
  },[])

  return <div className="RoleForm">
      <Form layout='horizontal' >
          <FormItem label="用户名： " {...formItemLayout}>
                {
                  getFieldDecorator('role_name',{
                    initialValue:"",
                    rules:[
                      {
                        required:true,
                        message:'用户名不能为空'
                      }
                    ]
                  })(
                    <Input placeholder="请输入角色名称"/>
                  )
                }
          </FormItem>
          <FormItem label="状态： "  {...formItemLayout}>
                {
                  getFieldDecorator('role_state',{
                    initialValue:1
                  })(
                    <Select>
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                  )
                }
          </FormItem>

      </Form>
  </div> ;
};

export default Form.create()(RoleForm);
