import * as React from 'react';
import {
  Form,
  Button,
  Card,
  Icon,
  Input,
  Modal,
  Radio,
  InputNumber,
  Select,
  Switch,
  DatePicker,
  Checkbox,
  TimePicker,
  Upload,
} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const TextArea = Input.TextArea;
import './style.less';
import RadioGroup from 'antd/lib/radio/group';
const FormItem = Form.Item;

export interface IAppProps {
  form: any;
}

export interface IAppState {
  userImg: string;
  loading: boolean;
}

class RegForm extends React.Component<IAppProps, IAppState> {
  state = {
    userImg: '',
    loading: false,
  };
  getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl: string) =>
        this.setState({
          userImg: imageUrl,
          loading: false,
        }),
      );
    }
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4,
      },
      wrapperCol: {
        xs: 24,
        sm: 12,
      },
    };
    const rowObject = {
      minRows: 4,
      maxRows: 6,
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4,
        },
      },
    };

    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('userName', {
                initalValue: '',
                rules: [
                  {
                    require: true,
                    message: '用户名不能为空',
                  },
                ],
              })(<Input placeholder="请输入用户名"></Input>)}
            </FormItem>
            <FormItem label="用户密码" {...formItemLayout}>
              {getFieldDecorator('userPwd', {
                initialValue: '',
              })(<Input type="passowrd" placeholder="请输入密码" />)}
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {getFieldDecorator('sex', {
                initialValue: '',
              })(
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>,
              )}
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {getFieldDecorator('age', {
                initialValue: 18,
              })(<InputNumber />)}
            </FormItem>
            <FormItem label="状态" {...formItemLayout}>
              {getFieldDecorator('state', {
                initialValue: '2',
              })(
                <Select>
                  <Option value="1">咸鱼一条</Option>
                  <Option value="2">风华浪子</Option>
                  <Option value="3">北大才子一枚</Option>
                  <Option value="4">百度FE</Option>
                  <Option value="5">创业者</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem label="兴趣" {...formItemLayout}>
              {getFieldDecorator('interest', {
                initialValue: ['2', '5'],
              })(
                <Select mode="multiple">
                  <Option value="1">游泳</Option>
                  <Option value="2">打篮球</Option>
                  <Option value="3">踢足球</Option>
                  <Option value="4">跑步</Option>
                  <Option value="5">爬山</Option>
                  <Option value="6">骑行</Option>
                  <Option value="7">桌球</Option>
                  <Option value="8">麦霸</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {getFieldDecorator('isMarried', {
                valuePropsName: 'checked',
                initialValue: true,
              })(<Switch />)}
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {getFieldDecorator('birthday', {
                initialValue: moment('2018-08-08'),
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {getFieldDecorator('address', {
                initialValue: '北京市海淀区奥林匹克公园',
              })(<TextArea autosize={rowObject} />)}
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {getFieldDecorator('useImg')(
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  onChange={this.handleChange}
                >
                  {this.state.userImg ? (
                    <img style={{ width: '100px' }} src={this.state.userImg} />
                  ) : (
                    <Icon type="plus" />
                  )}
                </Upload>,
              )}
            </FormItem>
            <FormItem label="早期时间" {...formItemLayout}>
              {getFieldDecorator('time')(<TimePicker />)}
            </FormItem>
            <FormItem {...offsetLayout}>
              {getFieldDecorator('userImg')(
                <Checkbox>
                  已经阅读过<a href="#">慕课协议</a>
                </Checkbox>,
              )}
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(RegForm);
