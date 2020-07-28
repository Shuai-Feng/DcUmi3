import * as React from 'react';
import { FormComponentProps } from 'antd/es/form';

import { Form, Input, Transfer } from 'antd';

const FormItem = Form.Item;

export interface IRoleAuthFormProps extends FormComponentProps {
  targetKeys: any;
  mockData: any;
  detail: any;

  pathUserInfo: any;
}

export interface IRoleAuthFormState {}

class RoleAuthForm extends React.Component<
  IRoleAuthFormProps,
  IRoleAuthFormState
> {
  constructor(props: IRoleAuthFormProps) {
    super(props);
    this.state = {};
  }
  filterOption = (inputValue: string, option: any) => {
    return option.title.indexOf(inputValue) > -1;
  };
  public render() {
    let { detail } = this.props;
    let { getFieldDecorator } = this.props.form;
    const formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <FormItem label="角色名称：" {...formLayout}>
          <Input disabled placeholder={detail.role_name} />
        </FormItem>
        <Transfer
          //filter option is used for to filter the data you need in transfer
          listStyle={{ width: 200, height: 400 }}
          filterOption={this.filterOption}
          showSearch
          // updata targetKey to upload
          onChange={(targetKeys: any) => {
            this.props.pathUserInfo(targetKeys);
          }}
          targetKeys={this.props.targetKeys}
          dataSource={this.props.mockData}
          //this
          render={(item: any) => {
            return item.title;
          }}
        />
      </div>
    );
  }
}

export default Form.create<IRoleAuthFormProps>({})(RoleAuthForm);
