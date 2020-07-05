import * as React from 'react';
import { Button } from 'antd';
export interface IAppProps {

}

export interface IAppState {
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {

    }
  }
  handleSubmit(myName:String){
      console.log(myName)
  }
  magicObject(tree:Array<any>,name:String):any{
      let result:any={name:'未查到'};
      for( let i in tree){
          let item = tree[i]
          if(item.children){
            result = this.magicObject(item.children,name);
          }else if(item.name = name){
            result = item;
            break
          }
      }
      return result
  }
  componentDidMount(){
    let tree =[ {
      name: "中国",
      children: [
          {
              name: "北京",
              children: [
                  {name: "朝阳群众"},
                  {name: "海淀区"},
                  {name: "昌平区"}
              ]
          },
          {
              name: "浙江省",
              children: [
                  {
                      name: "杭州市",
                      code: "0571"
                  },
                  {name: "嘉兴市"},
                  {name: "绍兴市"},
                  {name: "宁波市"}
              ]
          }
      ]
    }]

   console.log( this.magicObject(tree,'宁波市'));
  }
  public render() {
    return (
      <div>
          asdfasdffasdfasfd
          <Button onClick={()=>{this.handleSubmit('alksdjflaksfdlkas')}}>wbbb</Button>
      </div>
    );
  }
}
