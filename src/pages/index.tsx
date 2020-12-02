import React, { useEffect } from 'react';
import { Redirect } from 'umi';

export interface IIndexPageProps {}

export default class IndexPage extends React.Component<IIndexPageProps> {
  public render() {
    return (
      <div>
        <Redirect to="/home" />
      </div>
    );
  }
}
