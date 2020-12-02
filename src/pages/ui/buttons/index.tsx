import React, { CSSProperties, useState, useEffect } from 'react';
import { Button, Card, Icon, Radio } from 'antd';
import { ButtonType, ButtonSize } from 'antd/lib/button/button';
const RadioGroup = Radio.Group;
const BtnGroup = Button.Group;

interface IButtonPageProps {}

interface littleButton {
  type?: ButtonType;
  style?: CSSProperties;
  text?: string | '';
  Icon?: any;
}
const glCard: CSSProperties = { marginBottom: 20 };

const ButtonPage: React.FunctionComponent<IButtonPageProps> = props => {
  const [loading, setLoading] = useState(true);
  let initSize: 'default' | 'small' | 'large' | undefined;
  const [size, setSize] = useState(initSize);
  const btnGroup1: Array<littleButton> = [
    {
      type: 'primary',
      style: { marginRight: 10 },
      text: '我是按钮',
    },
    {
      type: 'link',
      style: { marginRight: 10 },
      text: '我是按钮',
    },
    {
      type: 'dashed',
      style: { marginRight: 10 },
      text: '我是按钮',
    },
    {
      type: 'danger',
      style: { marginRight: 10 },
      text: '我是按钮',
    },
    {
      style: { marginRight: 10 },
      text: '我是按钮',
    },
  ];
  const btnGroup2: Array<littleButton> = [
    {
      type: 'primary',
      style: { marginRight: 10 },
      text: '加油 你是最棒的',
      Icon: <Icon type="fast-backward" />,
    },
    {
      type: 'link',
      style: { marginRight: 10 },
      text: '加油 你是最棒的',
      Icon: <Icon type="pause" />,
    },
    {
      type: 'dashed',
      style: { marginRight: 10 },
      text: '加油 你是最棒的',
      Icon: <Icon type="plus-circle" />,
    },
    {
      type: 'danger',
      style: { marginRight: 10 },
      text: '加油 你是最棒的',
      Icon: <Icon type="info" />,
    },
    {
      style: { marginRight: 10 },
      text: '加油 你是最棒的',
      Icon: <Icon type="question-circle" />,
    },
  ];
  const btnGroup3: Array<littleButton> = [
    {
      type: 'primary',
      style: { marginRight: 10 },
      text: loading ? '加载中' : '未加载',
    },
    {
      type: 'link',
      style: { marginRight: 10 },
      text: loading ? '加载中' : '未加载',
    },
    {
      type: 'dashed',
      style: { marginRight: 10 },
      text: loading ? '加载中' : '未加载',
    },
    {
      type: 'danger',
      style: { marginRight: 10 },
      text: loading ? '加载中' : '未加载',
    },
    {
      style: { marginRight: 10 },
      text: loading ? '加载中' : '未加载',
    },
  ];
  return (
    <div className="ButtonPage">
      <Card title={'基础按钮'} style={glCard}>
        {btnGroup1.map((item: littleButton, index: number) => {
          return (
            <Button type={item.type} key={index} style={item.style || {}}>
              {item.text}
            </Button>
          );
        })}
      </Card>
      <Card title={'带图标按钮'} style={glCard}>
        {btnGroup2.map((item: littleButton, index: number) => {
          return (
            <Button type={item.type} key={index} style={item.style || {}}>
              {item.Icon}
              {item.text}
            </Button>
          );
        })}
      </Card>
      <Card title={'Loading'} style={glCard}>
        {btnGroup3.map((item: littleButton, index: number) => {
          return (
            <Button
              type={item.type}
              key={index}
              loading={loading}
              style={item.style || {}}
            >
              {item.Icon}
              {item.text}
            </Button>
          );
        })}
        <Button
          onClick={() => {
            setLoading(!loading);
          }}
        >
          更改加载状态
        </Button>
      </Card>
      <Card title="字符串" style={glCard}>
        <BtnGroup>
          <Button>sadf</Button>
          <Button>sadf</Button>
          <Button>sadf</Button>
          <Button>sadf</Button>
        </BtnGroup>
      </Card>
      <Card title="按钮尺寸">
        <RadioGroup defaultValue={2}>
          <Radio
            value={1}
            onClick={() => {
              setSize('small');
            }}
          >
            small
          </Radio>
          <Radio
            value={2}
            onClick={() => {
              setSize('default');
            }}
          >
            defalut
          </Radio>
          <Radio
            value={3}
            onClick={() => {
              setSize('large');
            }}
          >
            large
          </Radio>
        </RadioGroup>
        <Button size={size} style={{ marginLeft: 10 }} type="primary">
          {size}
        </Button>
        <Button size={size} style={{ marginLeft: 10 }} type="danger">
          {size}
        </Button>
        <Button size={size} style={{ marginLeft: 10 }} type="dashed">
          {size}
        </Button>
      </Card>
    </div>
  );
};

export default ButtonPage;
