import * as React from 'react';

export interface IDemo2Props {}

export interface IDemo2State {
  count: number;
}

export default class Demo2 extends React.Component<IDemo2Props, IDemo2State> {
  constructor(props: IDemo2Props) {
    super(props);

    this.state = {
      count: 0,
    };
  }
  // 第一题 就是 将 每个数组 转换为百位数 进行 排序;)
  myArray = (arr: Array<any>): Array<any> => {
    arr.sort((a: Array<number>, b: Array<number>) => {
      let res_a = 0;
      a.forEach((num: number, index: number) => {
        res_a += num * 10 ** (2 - index);
      });
      let res_b = 0;
      b.forEach((num: number, index: number) => {
        res_b += num * 10 ** (2 - index);
      });
      return res_a - res_b;
    });
    return arr;
  };
  arrayCombine(...arr: Array<any>) {
    let result: Array<number> = [];
    arr.forEach(item => {
      result = result.concat(item);
    });
    console.log(new Set(result));
  }

  componentDidMount() {
    this.arrayCombine([1, 2, 3], [2, 4, 5]);
  }
  public render() {
    return <div>demo2</div>;
  }
}
