import * as React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Form, Tree, Input, Select } from 'antd';
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

//倒入权限数据
import data from '@/components/NavLeft/menuConfig';
import FormItem from 'antd/lib/form/FormItem';
export interface PermProps extends FormComponentProps {
  detail: any;
  patchMenuInfo: any;
  menuInfo: any;
}

export interface PermState {}

class PermEditForm extends React.Component<PermProps, PermState> {
  constructor(props: PermProps) {
    super(props);
    this.state = {};
  }
  onCheck = (checkedKeys: any) => {
    this.props.patchMenuInfo(checkedKeys);
  };

  renderTreeNode = (data: any): any => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNode(item.children)}
          </TreeNode>
        );
      } else {
        return <TreeNode title={item.title} key={item.key} />;
      }
    });
  };
  public render() {
    let { getFieldDecorator } = this.props.form;
    let { detail, menuInfo } = this.props;
    const formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="horizontal">
          <FormItem label="角色名称：" {...formLayout}>
            <Input disabled placeholder={detail.role_name} />
          </FormItem>
          <FormItem label="状态：" {...formLayout}>
            {getFieldDecorator('status', {
              initialValue: detail.status ? '启用' : '停用',
            })(
              <Select style={{ width: 80 }} placeholder="启用">
                <Option value="1">启用</Option>
                <Option value="0">停用</Option>
              </Select>,
            )}
          </FormItem>
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={menuInfo}
            onCheck={checkedKeys => {
              this.onCheck(checkedKeys);
            }}
          >
            <TreeNode title="平台授权" key="platform_all">
              {this.renderTreeNode(data)}
            </TreeNode>
          </Tree>
        </Form>
      </div>
    );
  }
}
export default Form.create<PermProps>({})(PermEditForm);
