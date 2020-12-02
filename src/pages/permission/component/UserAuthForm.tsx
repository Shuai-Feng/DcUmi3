import React,{ useEffect } from 'react';
import { Form,Input,Transfer } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import SFevent from '@/utils/SFevent';

const FormItem = Form.Item;

interface IUserAuthFormProps extends FormComponentProps {
  detailData:any,
  targetKeys:any,
  mockData:any,
  pathUserInfo:Function
}

const UserAuthForm: React.FunctionComponent<IUserAuthFormProps> = (props) => {


  const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 18}
  }

  let { getFieldDecorator } = props.form;
  let { detailData,mockData,targetKeys,pathUserInfo } = props;

  useEffect(()=>{
    SFevent.ee_emit('Form_inst',props.form)
  },[])

  return <div className="UserAuthForm">
      <Form layout='horizontal'>
          <FormItem label="角色状态" {...formItemLayout}>
              {
                getFieldDecorator('auth_name',{

                })(
                  <Input disabled maxLength={8} placeholder={detailData.role_name}/>
                )
              }
          </FormItem>


          <FormItem label="状态" {...formItemLayout}>
              {
                getFieldDecorator('auth_state',{

                })(
                  <Transfer  
                    height={600}
                    showSearch
                    titles={['待选用户','已选用户']}
                    dataSource={mockData}
                    targetKeys={targetKeys}
                    render={(item:any)=>{return item.title}}
                    onChange={(targetKeys:any)=>{
                        pathUserInfo(targetKeys)
                    }}
                  />
                )
              }
          </FormItem>
      </Form>
  </div> ;
};

export default Form.create<IUserAuthFormProps>()(UserAuthForm);
