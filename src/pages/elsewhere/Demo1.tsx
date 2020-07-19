import * as React from 'react';
import { Row, Col, Form, Button, Modal, Select, Input, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
//import the component that we need ;)
import './style.less';
const FormItem = Form.Item;
const Option = Select.Option;

import AddForm from '@/components/ElseWhere/AddForm';
import Dialog from '@/components/ElseWhere/Dialog';

export interface IDemoProps extends FormComponentProps {}
export interface IDemoState {
  itemData: Array<object>;
  //this one is used for the mondal
  isVisible: boolean;
}

class Demo1 extends React.Component<IDemoProps, IDemoState> {
  state = {
    itemData: [
      {
        type: '洗衣机',
        details: [{ key: 11111, detailsName: '最高水位', value: 12.7 }],
      },
      {
        type: '煤气灶',
        details: [{ key: 22222, detailsName: '最大进气量', value: 13.7 }],
      },
    ],
    isVisible: false,
  };
  addForm: any;

  handleAddSubmit = () => {
    //获取当前数据信息
    let { itemData } = this.state;
    //增加细节 表单数据获取
    let addForm = this.addForm.props.form.getFieldsValue();
    //增加新类别
    let isType = true;
    let isDetial = true;
    if (addForm.newTypeName) {
      itemData.forEach((item: any, index: number) => {
        if (item.type === addForm.newTypeName) {
          message.warning('该类别已存在，请重试');
          this.addForm.props.form.setFieldsValue({ newTypeName: '' });
          isType = false;
        }
      });
      if (isType) {
        itemData.push({
          type: addForm.newTypeName,
          details: [
            {
              key: new Date().getTime(),
              detailsName: addForm.detial,
              value: 0,
            },
          ],
        });
        message.success('类别添加成功');
        this.addForm.props.form.resetFields();
        this.setState({
          isVisible: false,
        });
      }
      this.addForm.props.form.resetFields();
    } else {
      itemData.forEach((item: any, index: number) => {
        if (item.type === addForm.type) {
          item.details.forEach((detial: any) => {
            if (detial.detailsName === addForm.detial) {
              message.warning('该细节属性已存在，请重试');
              this.addForm.props.form.setFieldsValue({ detial: '' });
              isDetial = false;
            }
          });
          if (isDetial) {
            item.details.push({
              key: new Date().getTime(),
              detailsName: addForm.detial,
              value: 0,
            });
            message.success('细节属性添加成功');
            this.setState({
              isVisible: false,
            });
            this.addForm.props.form.resetFields();
          }
        }
      });
    }
  };

  handleItemEdit = (itemkey: any) => {
    let { itemData } = this.state;
    itemData.forEach((item: any, index: number) => {
      item.details = item.details.filter((detial: any) => {
        if (detial.key === itemkey) {
          return false;
        } else {
          return true;
        }
      });
    });

    this.setState({
      itemData,
    });
  };
  //初始化 渲染左侧的
  initialDetailOption = () => {
    const { getFieldDecorator } = this.props.form;
    let { itemData } = this.state;
    let itemArray: Array<any> = [];

    itemData.forEach((item: any) => {
      item.details.forEach((detail: any) => {
        itemArray.push(
          <FormItem key={detail.key}>
            {item.type + '/' + detail.detailsName}
            <span>&&&&</span>
            <Input value={detail.value} contentEditable={true} />
            <Button
              onClick={() => this.handleItemEdit(detail.key)}
              icon="delete"
              type="link"
            />
          </FormItem>,
        );
      });
    });
    return itemArray;
  };

  public render() {
    let { itemData } = this.state;
    return (
      <div>
        <Row className="content">
          <Col className="left" span={12}>
            成品尺寸标准
            <Button
              icon="plus-circle"
              type="link"
              onClick={() => {
                this.setState({ isVisible: true });
              }}
            >
              添加标准
            </Button>
            <Form>{this.initialDetailOption()}</Form>
          </Col>
          <Col className="right" span={12}>
            <Dialog itemData={itemData} />
          </Col>
        </Row>
        <Modal
          title="新增标准"
          visible={this.state.isVisible}
          okText="确认添加"
          cancelText="取消"
          onCancel={() => {
            this.setState({
              isVisible: false,
            });
          }}
          onOk={this.handleAddSubmit}
        >
          <AddForm
            itemData={itemData}
            wrappedComponentRef={(inst: any) => (this.addForm = inst)}
          />
        </Modal>
      </div>
    );
  }
}
export default Form.create<IDemoProps>({})(Demo1);
