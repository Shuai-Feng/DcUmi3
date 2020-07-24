import * as React from 'react';
import { AxiosPromise } from 'axios';

export interface IDemo4Props {}

export interface IDemo4State {}
//享凉
interface vector {
  x: number;
  y: number;
}

export default class Demo4 extends React.Component<IDemo4Props, IDemo4State> {
  constructor(props: IDemo4Props) {
    super(props);

    this.state = {};
  }
  //向量相加
  vectorAdd(a: vector, b: vector): vector {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
    };
  }
  //质数判断
  componentDidMount() {
    console.log(this.myPer(20));
  }
  myPer(max: number): Array<number> {
    let result: Array<number> = [];
    // isPermiuer
    for (let i = 2; i <= max; i++) {
      for (var j = 2; j < i / 2 + 1; j++) {
        if (i % j === 0) break;
      }
      if (j > i / 2 + 1) {
        result.push(i);
      }
    }
    return result;
  }
  public render() {
    return <div>Demo4</div>;
  }
}
