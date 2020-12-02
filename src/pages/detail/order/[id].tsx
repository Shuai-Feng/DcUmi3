import SFaxios from '@/utils/axios';
import React,{useEffect,useState} from 'react';
import { Card } from 'antd';
import { IRouteComponentProps } from 'umi';
import './index.less';

//@ts-ignore
const BMap = window.BMap;

//路由参数上可能出现的属性，放在那里
interface IOrderDetialProps extends IRouteComponentProps<{id:string}> {
    
}

const OrderDetial: React.FunctionComponent<IOrderDetialProps> = (props) => {
    //存放地图的实例
    let myMap:any;

    // 获取路由传递参数
    let { id } = props.match.params;
    //用于存放该订单数据的state数据的state
    const [info,setInfo] = useState<any>({});
    //根据当前订单号去请求车辆行驶数据
    let requestList =  async()=>{
        await SFaxios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    id
                }
            }
        }).then((res:any)=>{
            setInfo(res.result)
            initialMap(res.result)
        })
    }


    //生成地图
    let initialMap = (result:any)=>{
        if(!BMap) return ;
        myMap = new BMap.Map('myMap');

        //调用以加载坐标尺和导航控制条
        addMapControl();
        //绘制运动路径
        drawRoute(result.position_list);
    }
    //添加地图控件
    let addMapControl = ()=>{
        // 0 1 2 3 分别对应着 左上 右上 左下 右下
        //添加标尺
        myMap.addControl(new BMap.ScaleControl({anchor:1}));
        myMap.addControl(new BMap.NavigationControl({anchor:1}));
    }
    let drawRoute = (positionList:Array<any>)=>{
        let startPoint:any;
        let endPoint:any;
        if(positionList.length > 0){
            //绘制首个坐标点
            let first = positionList[0];
            startPoint = new BMap.Point(first.lon,first.lat);
            let startIcon = new BMap.Icon('/asset/start_point.png',new BMap.Size(36,42),{
                imageSize:new BMap.Size(36,42),
                anchor: new BMap.Size(18, 42)
            })
            let startMarker = new BMap.Marker(startPoint,{icon:startIcon});
            myMap.addOverlay(startMarker);


            //绘制末尾坐标点
            let last = positionList[positionList.length-1];
            endPoint = new BMap.Point(last.lon,last.lat);
            let endIcon = new BMap.Icon('/asset/end_point.png',new BMap.Size(36,42),{
                imageSize:new BMap.Size(36,42),
                anchor:new BMap.Size(18,42)
            })
            let endMarker = new BMap.Marker(endPoint,{icon:endIcon})
            myMap.addOverlay(endMarker);


            //绘制行驶路线
            let tarckPoint:Array<any>  = [];
            positionList.map(point=>{
                tarckPoint.push(new BMap.Point(point.lon,point.lat))
            })

            let polyLine = new BMap.Polyline(tarckPoint,{
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            })
            myMap.addOverlay(polyLine);
            //绘制服务区
            let polygon = new BMap.Polygon(tarckPoint,{
                strokeColor: '#CE0000',
                strokeWeight: 4,
                strokeOpacity: 1,
                fillColor:'#ff8605',
                fillOpacity:0.4
            })
            myMap.addOverlay(polygon)

            let middlePoint = new BMap.Point((first.lon+last.lon)/2,(first.lat+last.lat)/2);        
            myMap.centerAndZoom(middlePoint,13)
        }
    }
    //模拟ComponentDidMount
    useEffect(()=>{
        requestList();
    },[])


    //渲染组件 render the component 
    return <div className="OrderDetial">
            <Card>
                <div id="myMap" className="order-map">ops~ 地图有点问题 请稍等</div>
                <div className="detail-items">
                    <div className="item-title">基础信息</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">用车模式</div>
                            <div className="detail-form-content">{info.mode == 1?"服务区":"停车点"}</div>
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
                            <div className="detail-form-content">{info.distance/1000}km</div>
                        </li>
                    </ul>
                </div>
            </Card>
    </div>
};

export default OrderDetial;
