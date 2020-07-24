import * as React from 'react';

export interface IDemo3Props {}

export interface IDemo3State {}

declare type diffArray = Array<number | Array<number>>;
export default class Demo3 extends React.Component<IDemo3Props, IDemo3State> {
  constructor(props: IDemo3Props) {
    super(props);
    this.state = {};
  }

  SFdiff(arr1: diffArray, arr2: diffArray): diffArray {
    //大哥 暴力枚举虽然做出来了但是还有没有别的方法
    let result: diffArray = [];
    arr1.forEach((item: any) => {
      if (!arr2.includes(item)) {
        result.push(item);
      }
    });
    arr2.forEach((item: any) => {
      if (!arr1.includes(item)) {
        result.push(item);
      }
    });
    return result;
  }
  componentDidMount() {
    console.log(this.SFdiff([1, 2, 3], [2, 4, 1, 2, 3]));
  }
  public render() {
    return (
      <div>
        <h3>demo3</h3>
        <p>
          * 写一个 diff
          方法，用于比较两个数组，返回两数组中不同的部分，仅需要判断数组一级即可；
          * 要求考虑算法性能，使用 es2015 / es2016 语法，不能使用第三方类库；
        </p>
      </div>
    );
  }
}
