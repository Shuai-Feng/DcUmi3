import * as React from 'react';
import { Table } from 'antd';

export interface IETableProps {
  columns: Array<any>;
  updateSelectedItem?: any;
  rowSelection?: any;
  dataSource: any;
  selectedRowKeys?: any;
  selectedItem?: any;
  selectedIds?: any;
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
  //选择框变更
  onSelectedChange = (selectedRowKeys: any, selectedRows: any) => {
    let rowSelection = this.props.rowSelection;
    const selectedIds: any = [];
    if (rowSelection === 'checkbox') {
      selectedRows.map((item: any) => {
        selectedIds.push(item.id);
      });
      this.props.updateSelectedItem(
        selectedRowKeys,
        selectedRows[0],
        selectedIds,
      );
    }
  };

  onSelectAll = (selected: any, selectedRows: Array<any>, changeRows: any) => {
    let selectedIds: any = [];
    let selectedRowKeys: any = [];
    selectedRows.forEach((item: any, i: number) => {
      selectedIds.push(item.id);
      selectedRowKeys.push(i);
    });
    this.props.updateSelectedItem(
      selectedRowKeys,
      selectedRows[0] || {},
      selectedIds,
    );
  };
  onRowClick = (record: any, index: any) => {
    let rowSelection = this.props.rowSelection;
    if (rowSelection === 'checkbox') {
      let selectedRowKeys = this.props.selectedRowKeys;
      let selectedItem = this.props.selectedItem || [];
      let selectedIds = this.props.selectedIds;
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        if (i == -1) {
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectedItem.push(record);
        } else {
          selectedIds.splice(i, 1);
          selectedRowKeys.splice(i, 1);
          selectedItem.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record];
      }

      this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds);
    } else {
      //  单选状态
      let selectedRowKeys: any = [index];
      let selectedItem: any = record;
      // console.table(selectedRowKeys,selectedItem)
      this.props.updateSelectedItem(selectedRowKeys, selectedItem);
    }
  };
  //第一步 渲染表格  引入colums 和 datasource属性

  tableInit = () => {
    let row_Selection = this.props.rowSelection;
    let selectedRowKeys = this.props.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectedChange,
      onSelectAll: this.onSelectAll,
    };

    if (row_Selection === false || row_Selection === null) {
      row_Selection = false;
    } else if (row_Selection == 'checkbox') {
      rowSelection.type = 'checkbox';
    } else {
      row_Selection = 'radio';
    }
    return (
      <Table
        bordered
        // columns={columns}  dataSource={dataSource}
        {...this.props}
        //@ts-ignore
        rowSelection={row_Selection ? rowSelection : null}
        selectedRowKeys={selectedRowKeys}
        onRow={(record, index: any) => {
          return {
            onClick: () => {
              if (!row_Selection) {
                return;
              }
              this.onRowClick(record, index);
            },
          };
        }}
      />
    );
  };
  public render() {
    return <div>{this.tableInit()}</div>;
  }
}
