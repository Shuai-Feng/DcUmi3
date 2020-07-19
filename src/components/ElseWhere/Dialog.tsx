import * as React from 'react';
import { Form, Row } from 'antd';
//import the component that we need ;)
const FormItem = Form.Item;

export interface IDialogProps {
  itemData: Array<any>;
}

export interface IDialogState {
  //统计标准个数
  deTialNum: number;
  itemArray: any;
}

export default class Dialog extends React.Component<
  IDialogProps,
  IDialogState
> {
  state = {
    deTialNum: 0,
    itemArray: [],
  };
  initialDetailOption = () => {};
  public render() {
    return (
      <div>
        <Row>ghfhgfjhg</Row>
      </div>
    );
  }

  componentDidMount() {
    this.initialDetailOption();
  }
}
