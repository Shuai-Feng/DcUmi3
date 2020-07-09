import * as React from 'react';
const fs = require('fs');
export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    let myArr = [
      '120.19391265979684,30.50168996705982',
      '120.2007606752449,30.51593062186734',
    ];
    console.log(this.arrFlat(myArr));
  }
  arrFlat(arr: Array<string>): Array<string> {
    let result: Array<any> = [];
    arr.forEach((item: string) => {
      result = result.concat(item.split(','));
    });
    return result;
  }
  //   var result = [];
  // function flatten(arr) {
  //     if(arr.length>0) {
  //         for(var i=0,len=arr.length;i<len;i++) {
  //             if(arr[i] instanceof Array && arr[i].length>0) {
  //                 flatten(arr[i])
  //             } else {
  //                 result.push(arr[i]);
  //             }
  //         }
  //     }
  //     return result;
  // }

  public render() {
    return <div>MyUser</div>;
  }
}
