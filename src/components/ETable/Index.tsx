import * as React from 'react';
import { Table } from 'antd';

export interface IETableProps {
  columns: Array<any>;
}

export interface IETableState {}

export default class ETable extends React.Component<
  IETableProps,
  IETableState
> {
  constructor(props: IETableProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { columns } = this.props;
    return (
      <div>
        <Table columns={columns} />
      </div>
    );
  }
}
