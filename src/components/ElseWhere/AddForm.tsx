import * as React from 'react';
import { Form, Button, Select, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';

const FormItem = Form.Item;
const Option = Select.Option;

export interface IProps extends FormComponentProps {
  itemData: Array<any>;
}

export interface IState {
  isAddNew: boolean;
}

class AddForm extends React.Component<IProps, IState> {
  state = {
    isAddNew: false,
  };
  initialOption = () => {
    let itemData = this.props.itemData;
    return itemData.map((item: any, index: number) => {
      return (
        <Option key={item.type} value={item.type}>
          {item.type}
        </Option>
      );
    });
  };
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { itemData } = this.props;
    const { isAddNew } = this.state;
    let initialValue =
      itemData && itemData.length > 0 ? itemData[0].type : 'addNew';
    return (
      <Form layout="horizontal">
        <FormItem label="标准选择">
          {getFieldDecorator('type', {
            initialValue: initialValue,
          })(
            <Select
              onChange={(value: string) => {
                if (value === 'addNew') {
                  this.setState({
                    isAddNew: true,
                  });
                } else {
                  this.setState({
                    isAddNew: false,
                  });
                }
              }}
            >
              {this.initialOption()}
              <Option value="addNew">新建尺寸</Option>
            </Select>,
          )}
        </FormItem>

        {isAddNew || initialValue == 'addNew' ? (
          <FormItem label="新增标准">
            {getFieldDecorator('newTypeName')(
              <Input placeholder="请输入新增标准名" />,
            )}
          </FormItem>
        ) : (
          ''
        )}

        <FormItem label="细节">
          {getFieldDecorator('detial')(<Input placeholder="请输入细节名" />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<IProps>({})(AddForm);
