import * as React from 'react';
import Header from '@/components/Header';
import axios from '@/axios';
import {Row,Card} from 'antd';
import './detial.less'

// @ts-ignore
import {Map, Polyline, NavigationControl,Polygon,Marker} from 'react-bmap'
import Axios from 'axios';
export interface IAppProps {
  match:any
}

export interface IAppState {
  orderInfo:any,
  myMap?:any
}

export default class App extends React.Component<IAppProps, IAppState> {
  state = {
    orderInfo:{},
    myMap:''
  }
  renderMap = (result:any)=>{
      console.log(result)
      let myMap:any = <Map  style={{height:450}} center={{lng: result.position_list[0].lon+0.01, lat: result.position_list[0].lat-0.01}} zoom="13" >
              <NavigationControl/>
              {this.drawMarker(result.position_list)}
              {this.drwaServiceArea(result.position_list)}
              {this.drawBikeRoute(result.position_list)}
      </Map>
      this.setState({
        myMap
      })
  }
  drawMarker = (positionList:Array<any>)=>{
      return (
        [
          <Marker position={{lng: positionList[0].lon, lat: positionList[0].lat}}/>,
          <Marker position={{lng: positionList[positionList.length-1].lon, lat: positionList[positionList.length-1].lat}}/>
        ]
      )
  }
  drwaServiceArea = (positionList:Array<any>)=>{
      let myPath:Array<any> = []
      positionList.forEach((item:any)=>{
        myPath.push({lng:item.lon, lat: item.lat})
      })
      return <Polygon 
      fillColor='#ff8605' 
      strokeColor='#CE0000'
      strokeWeight='2'   
      path={myPath}
  />
  }
  drawBikeRoute = (positionList:Array<any>)=>{
      let myPath:Array<any> = []
      positionList.forEach((item:any)=>{
        myPath.push({lng:item.lon, lat: item.lat})
      })
      return <Polyline 
      strokeColor='green' 
      path={myPath}
      />
  }
  componentDidMount(){
    let orderId = this.props.match.params.orderId;
    if(orderId){
        this.getDetailInfo(orderId);
    }
  }
  getDetailInfo = (orderId:any)=>{
    axios.ajax({
      url:'/order/detail',
      data:{
        params:{
          orderId:orderId
        }
      }
    }).then((res:any)=>{
      this.setState({
        orderInfo:res.result
      })
      this.renderMap(res.result)
    })
  }
  public render() {
    const info:any = this.state.orderInfo || {};
    return (
      <div>
        <Row className='simple-page'>
          <Header menuType='second' />
        </Row>
        <Card>
          {
            this.state.myMap?this.state.myMap:''
          }
          <div className="detail-items">
              <div className="item-title">基础信息</div>
              <ul className="detail-form">
                  <li>
                      <div className="detail-form-left">用车模式</div>
                      <div className="detail-form-content">{info.mode == 1 ?'服务区':'停车点'}</div>
                  </li>
                  <li>
                      <div className="detail-form-left">订单编号</div>
                      <div className="detail-form-content">{info.order_sn}</div>
                  </li>
                  <li>
                      <div className="detail-form-left">车辆编号</div>
                      <div className="detail-form-content">{info.bike_sn}</div>
                  </li>
                  <li>
                      <div className="detail-form-left">用户姓名</div>
                      <div className="detail-form-content">{info.user_name}</div>
                  </li>
                  <li>
                      <div className="detail-form-left">手机号码</div>
                      <div className="detail-form-content">{info.mobile}</div>
                  </li>
              </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
                <li>
                    <div className="detail-form-left">行程起点</div>
                    <div className="detail-form-content">{info.start_location}</div>
                </li>
                <li>
                    <div className="detail-form-left">行程终点</div>
                    <div className="detail-form-content">{info.end_location}</div>
                </li>
                <li>
                    <div className="detail-form-left">行驶里程</div>
                    <div className="detail-form-content">{info.distance/1000}公里</div>
                </li>
            </ul>
        </div>
        </Card>
      </div>
    );
  }
}
