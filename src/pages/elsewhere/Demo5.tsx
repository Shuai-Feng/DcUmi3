import * as React from 'react';
import SFinput from '@/components/ElseWhere/SFinput';

export interface IDemo5Props {}

export interface IDemo5State {}

export default class Demo5 extends React.Component<IDemo5Props, IDemo5State> {
  constructor(props: IDemo5Props) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <SFinput maxLength={10} />
      </div>
    );
  }
}
