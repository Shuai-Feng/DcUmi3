import * as React from 'react';

export interface IAppProps {
  value?: string;
  defaultValue?: string;
  onChange?: Function;
  maxLength?: number;
}

export interface IAppState {
  currentLength: number;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    //判断是否指定 input默认值
    this.state = {
      currentLength: props.defaultValue ? props.defaultValue.length : 0,
    };
  }
  onInputChange = (e: any) => {
    let currentValue = e.target.value;
    let { onChange } = this.props;
    this.setState({
      currentLength: currentValue.length,
    });

    //若已经传递 onchange回调函数则执行
    if (onChange) {
      onChange(e.target.value);
    }
  };
  public render() {
    let { maxLength, defaultValue } = this.props;
    let { currentLength } = this.state;

    return (
      <div>
        {/* 自由解构 defaultValue maxLength value 等属性 */}
        <input type="text" {...this.props} onChange={this.onInputChange} />
        {maxLength ? (
          <div>
            {currentLength}/{maxLength}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
