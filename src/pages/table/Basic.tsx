import * as React from 'react';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  state = {};

  public render() {
    return <div>Basic</div>;
  }
}
