import React from 'react';
import { Form, Button, Select, Input, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import Utils from '@/utils/index';

const FormItem = Form.Item;
const Option = Select.Option;

declare const FormLayouts: ['horizontal', 'inline', 'vertical'];
export declare type FormLayout = typeof FormLayouts[number];

interface IProps extends FormComponentProps {
  formList: any;
  layout?: FormLayout;
  showButton?: boolean;
}

class FilterForm extends React.Component<IProps, {}> {
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    console.log(fieldsValue);
  };

  reset = () => {
    this.props.form.resetFields();
  };
  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList: Array<any> = [];
    if (formList && formList.length > 0) {
      formList.forEach((item: any, i: number) => {
        let label: any = item.label;
        let field: string = item.field;
        let initialValue: any = item.initialValue || '';
        let placeholder: any = item.placeholder;
        let width: any = item.width;
        if (item.type === 'SELECT') {
          const SELECT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator(field, {
                initialValue: initialValue,
              })(
                <Select style={{ width: width }} placeholder={placeholder}>
                  {Utils.getOptionList(item.list)}
                </Select>,
              )}
            </FormItem>
          );
          formItemList.push(SELECT);
        } else if (item.type === 'INPUT') {
          const INPUT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator(field, {
                initialValue,
              })(<Input type="text" placeholder={placeholder} />)}
            </FormItem>
          );
          formItemList.push(INPUT);
        } else if (item.type === 'TIME') {
          const begin_time = (
            <FormItem label="订单时间" key="begin_time">
              {getFieldDecorator('begin_time')(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />,
              )}
            </FormItem>
          );
          formItemList.push(begin_time);
          const end_time = (
            <FormItem label="~" colon={false} key="end_time">
              {getFieldDecorator('end_time')(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />,
              )}
            </FormItem>
          );
          formItemList.push(end_time);
        }
      });
    }
    return formItemList;
  };
  render() {
    let { layout } = this.props;
    return (
      <Form layout={layout}>
        {this.initFormList()}
        {this.props.showButton ? (
          <FormItem>
            <Button
              type="primary"
              style={{ margin: '0 20px' }}
              onClick={this.handleFilterSubmit}
            >
              查询
            </Button>
            <Button onClick={this.reset}>重置</Button>
          </FormItem>
        ) : (
          ''
        )}
      </Form>
    );
  }
}
export default Form.create<IProps>({})(FilterForm);
