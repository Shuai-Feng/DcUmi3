import React, { useState, useEffect } from 'react';
import {
  Form,
  Card,
  Input,
  Radio,
  Select,
  Switch,
  DatePicker,
  Upload,
  Icon,
  Button,
  Checkbox,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

//在 antd3 中 使用 Form.create()(组件)
//配合

interface IRegPageProps extends FormComponentProps {}

const RegPage: React.FunctionComponent<IRegPageProps> = props => {
  let { getFieldDecorator } = props.form;
  let [imgsrc, setImgSrc] = useState('');
  //图片上传所执行的回调函数

  //编辑base64的图片信息
  let getBase64 = (img: File, callback: Function) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  //上传图片时的回调函数
  let handleChange = (info: any) => {
    getBase64(info.file.originFileObj, (imageUrl: any) => {
      setImgSrc(imageUrl);
    });
  };

  //
  let handleSubmit = () => {
    let { getFieldsValue, validateFields } = props.form;
    validateFields((err, values) => {
      if (err) {
        return;
      } else {
        console.log({ ...getFieldsValue(), imgsrc });
      }
    });
  };
  const formLayout = {
    labelCol: {
      sm: 24,
      md: 4,
    },
    wrapperCol: {
      sm: 24,
      md: 12,
    },
  };
  const offsetLayout = {
    wrapperCol: {
      sm: 24,
      md: {
        span: 12,
        offset: 4,
      },
    },
  };
  return (
    <div className="regPage">
      <Card title="来自与Form的注册界面">
        <Form>
          <FormItem {...formLayout} label="用户名">
            {getFieldDecorator('useName', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="text" placeholder="用户名" />)}
          </FormItem>
          <FormItem {...formLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="password" placeholder="密码" />)}
          </FormItem>
          <FormItem {...formLayout} label="性别">
            {getFieldDecorator('sex', {
              initialValue: 'male',
            })(
              <RadioGroup>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
              </RadioGroup>,
            )}
          </FormItem>
          <FormItem {...formLayout} label="年龄">
            {getFieldDecorator('age', {
              initialValue: 18,
            })(<Input type="number" style={{ width: 200 }} />)}
          </FormItem>
          <FormItem {...formLayout} label="权限等级">
            {getFieldDecorator('status', {
              initialValue: 'LV1',
            })(
              <Select>
                <Option value="LV1">LV1</Option>
                <Option value="LV2">LV2</Option>
                <Option value="LV3">LV3</Option>
                <Option value="LV4">LV4</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formLayout} label="爱好">
            {getFieldDecorator('hobby', {
              initialValue: ['棒球', '冰壶'],
            })(
              <Select mode="multiple">
                <Option value="打篮球">打篮球</Option>
                <Option value="踢足球">踢足球</Option>
                <Option value="棒球">棒球</Option>
                <Option value="冰壶">冰壶</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formLayout} label="婚否">
            {getFieldDecorator('married', {
              valuePropName: 'checked',
              initialValue: true,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Switch />)}
          </FormItem>
          <FormItem {...formLayout} label="生日">
            {getFieldDecorator(
              'birthday',
              {},
            )(<DatePicker showTime format="YYYY-MM-DD hh:mm:ss" />)}
          </FormItem>
          <FormItem {...formLayout} label="联系地址">
            {getFieldDecorator('address', {
              initialValue: '',
              rules: [
                {
                  required: true,
                },
              ],
            })(<TextArea />)}
          </FormItem>
          <FormItem {...formLayout} label="头像">
            <Upload listType="picture-card" onChange={handleChange}>
              <Icon type="plus" />
            </Upload>
          </FormItem>
          <FormItem {...offsetLayout}>
            {getFieldDecorator('agree', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                我已经阅读过<a href="https://baidu.com">布里特安防公司协议 </a>
              </Checkbox>,
            )}
          </FormItem>
          <FormItem {...offsetLayout}>
            <Button type="primary" onClick={handleSubmit}>
              注册
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(RegPage);
