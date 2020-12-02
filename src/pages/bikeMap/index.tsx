import React,{ useEffect,useState } from 'react';
import { Card, message } from 'antd';
import SForm,{SFormItemProps} from '@/component/SForm';
import SFaxios from '@/utils/axios';

//@ts-ignore
const BMap = window.BMap;

interface IBikePageProps {
}

const BikePage: React.FunctionComponent<IBikePageProps> = (props) => {

    //bikeInfo 控制Setstate
    const  [bikeData,setBikeData ] = useState<any>();

    const SFormItem:Array<SFormItemProps> = [
        {
            type:'Select',
            field:'city_name',
            label:'城市选择',
            width:80,
            initialValue:1,
            list:[
                {
                    id:0,
                    name:"全部"
                },
                {
                    id:1,
                    name:"进行中"
                },
                {
                    id:2,
                    name:"行程结束"
                }
            ]
        },{
            type:'DateZoom',
            field:'bikeOrderTime',
            label:'订单时间'
        },{
            type:'Select',
            field:'city_name',
            label:'订单选择',
            width:80,
            initialValue:1,
            list:[
                {
                    id:0,
                    name:"全部"
                },
                {
                    id:1,
                    name:"进行中"
                },
                {
                    id:2,
                    name:"行程结束"
                }
            ]
        }
    ]

    var a:string;

    //渲染基础地图界面
    let initialMap = (mapData:any)=>{
        
        if(!BMap){
            message.info('地图模块出了点问题，不过不是你的问题')
            return
        }

        //实例话地图控件

        let myMap = new BMap.Map('container');
        myMap.centerAndZoom(new BMap.Point(116.404, 39.915),15);

        let list = mapData.route_list;

        //绘制开始起点和终止点
        let gps1 = list[0].split(',');
        let startPoint = new BMap.Point(gps1[0],gps1[1]);
        let startPointIcon = new BMap.Icon('/asset/start_point.png',new BMap.Size(36,42),{
            imageSize:new BMap.Size(36,42),
            anchor:new BMap.Size(18,42)
        })
        let bikeMakerStart = new BMap.Marker(startPoint,{icon:startPointIcon});
        myMap.addOverlay(bikeMakerStart)

        let gps2 = list[list.length - 1].split(',');
        let endPoint = new BMap.Point(gps2[0], gps2[1]);
        let endPointIcon = new BMap.Icon('/asset/end_point.png',new BMap.Size(36,42),{
            imageSize:new BMap.Size(36,42),
            anchor:new BMap.Size(18,42)
        });
        let bikeMakerEnd = new BMap.Marker(endPoint,{icon:endPointIcon});
        myMap.addOverlay(bikeMakerEnd)


        //服务路径绘制
        let serviceList = mapData.service_list;
        let servicePointList:any = [];
        serviceList.forEach((item:any)=>{
            let point = new BMap.Point(item.lon,item.lat);
            servicePointList.push(point)
        })
        let polyServiceLine = new BMap.Polygon(servicePointList,{
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor:'#ff8605',
            fillOpacity:0.4
        });
        myMap.addOverlay(polyServiceLine)

        //行驶路径绘制
        let routeList:any = [];
        list.forEach((item:any)=>{
            let p = item.split(",");
            let point = new BMap.Point(p[0],p[1]);
            routeList.push(point)
        })
        let polyLine  = new BMap.Polyline(routeList,{
            strokeColor:"#ef4136",
            strokeWidth:3,
            storkeOpacity:1
        })
        myMap.addOverlay(polyLine);

        myMap.centerAndZoom(endPoint, 11);

        //添加比例尺和控件
        let top_right_control = new BMap.ScaleControl({anchor:1})
        let top_right_navigation = new BMap.NavigationControl({anchor:1})
        myMap.addControl(top_right_control);
        myMap.addControl(top_right_navigation);
        myMap.enableScrollWheelZoom(true);

        let bikeList = mapData.bike_list;
        let bikeIcon = new BMap.Icon('/asset/bike.jpg',new BMap.Size(36,42),{
            imageSize: new BMap.Size(36, 42),
            anchor: new BMap.Size(18, 42)
        })
        
        bikeList.forEach((item:any)=>{
            let p = item.split(',');
            let point = new BMap.Point(p[0],p[1]);
            let bikeMarker = new BMap.Marker(point,{icon:bikeIcon})
            myMap.addOverlay(bikeMarker);
        })
    }

    let handleRequest = ()=>{
         SFaxios.ajax({url:'/map/bike_list'}).then((res:any)=>{
            let mapData = res.result;
            initialMap(mapData);
         })
    
    }

    useEffect(()=>{
        handleRequest();
    },[])
  return <div className="BikePage">
      <Card>
        <SForm FormList={ SFormItem } />
      </Card>
      <Card style={{marginTop:10}}>
        <div>共{}辆车</div>
        <div id='container' style={{height:500}}></div>
      </Card>
  </div>;
};

export default BikePage;
