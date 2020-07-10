import * as React from 'react';
import './style.less';
export interface IAppProps {
  children: any;
}

export interface IAppState {
  visible: string;
  text: string;
}

export default class Toast extends React.Component<IAppProps, IAppState> {
  state = {
    visible: 'show',
    text: '',
  };
  public render() {
    //用户
    const { visible, text } = this.state;
    return (
      <div>
        <div className={`ToastWrapper ToastWrapper-${visible}`}>{text}</div>
      </div>
    );
  }
  show(text: string, time: number) {
    this.setState({
      text,
    });
    let timer = setTimeout(() => {
      this.setState({
        visible: 'hide',
      });
      clearTimeout(timer);
    }, time);
  }
  componentDidMount() {
    this.show('asdfasd', 800);
  }
}
