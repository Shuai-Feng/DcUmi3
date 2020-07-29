import * as React from 'react';
import BaseForm from '@/components/BaseForm';
import { Card } from 'antd';
import Axios from '@/axios';

//@ts-ignore
import { Map, Polyline } from 'react-bmap';

export interface IBikeMapProps {}

export interface IBikeMapState {
  total_count: number;
  myMap?: any;
}

export default class BikeMap extends React.Component<
  IBikeMapProps,
  IBikeMapState
> {
  constructor(props: IBikeMapProps) {
    super(props);
    this.state = {
      total_count: 0,
    };
  }
  params = {
    page: 1,
  };

  //用于存放地图的实例
  map: any;

  requestList = () => {
    Axios.ajax({
      url: '/map/bike_list',
      data: {
        params: this.params,
      },
    }).then((res: any) => {
      this.setState({
        total_count: res.result.total_count,
      });
      this.renderMap(res.result);
    });
  };
  drawRoute = (result: Array<any>) => {};
  drawBikePoint = (result: Array<any>) => {};
  renderMap(result: any) {
    console.log('renderMap', result);
    let list: any = result.route_list;
    this.map = new window.BMap.Map('container', { enableMapClick: false });
    //

    this.map.enableScrollWheelZoom();
    //获得起点和终点
    let gps1 = list[0].split(',');
    let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
    let gps2 = list[list.length - 1].split(',');
    let endPoint = new window.BMap.Point(gps2[0], gps2[1]);

    this.map.centerAndZoom(endPoint, 11);

    //绘制行车起点
    let startPointIcon = new window.BMap.Icon(
      '/assets/start_point.png',
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42),
      },
    );
    //绘制行车终点
    var bikeMarkerStart = new window.BMap.Marker(startPoint, {
      icon: startPointIcon,
    });
    this.map.addOverlay(bikeMarkerStart);

    let endPointIcon = new window.BMap.Icon(
      '/assets/end_point.png',
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42),
      },
    );

    var bikeMarkerend = new window.BMap.Marker(endPoint, {
      icon: endPointIcon,
    });
    this.map.addOverlay(bikeMarkerend);
    //绘制形式路线
    let routeList: Array<any> = [];
    list.forEach((item: any) => {
      let p = item.split(',');
      let point = new window.BMap.Point(p[0], p[1]);
      routeList.push(point);
    });
    let polyLine = new window.BMap.Polyline(routeList, {
      storkeColor: '#ef4136',
      storkeWeight: 3,
      storkeOpactiy: 1,
    });
    this.map.addOverlay(polyLine);
    //服务区路线
    let serviceList: Array<any> = result.service_list;
    let servicePointist: Array<any> = [];
    serviceList.forEach((item: any) => {
      let point = new window.BMap.Point(item.lon, item.lat);
      servicePointist.push(point);
    });
    let polyServiceLine: any = new window.BMap.Polyline(servicePointist, {
      storkeColor: '#ef4136',
      storkeWeight: 3,
      storkeOpactiy: 1,
    });
    this.map.addOverlay(polyServiceLine);

    //绘制地图中的bike
    let bikeList = result.bike_list;
    let bikeIcon = new window.BMap.Icon(
      '/assets/bike.jpg',
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42),
      },
    );
    bikeList.forEach((item: any) => {
      let p = item.split(',');
      let point = new window.BMap.Point(p[0], p[1]);
      let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
      this.map.addOverlay(bikeMarker);
    });
    //添加地图控件
    var top_right_control = new window.BMap.ScaleControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT,
    });
    var top_right_navigation = new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT,
    });
    //添加控件和比例尺
    this.map.addControl(top_right_control);
    this.map.addControl(top_right_navigation);
    this.map.enableScrollWheelZoom(true);
  }

  componentDidMount() {
    this.requestList();
  }
  public render() {
    const formList = [
      {
        type: 'TIME',
      },
      {
        type: 'SELECT',
        label: '订单状态',
        field: 'order_status',
        placeholder: '全部',
        initialValue: '0',
        width: 100,
        list: [
          { id: '0', name: '全部' },
          { id: '1', name: '进行中' },
          { id: '2', name: '行程结束' },
        ],
      },
    ];
    return (
      <div>
        <Card>
          <BaseForm formList={formList} showButton />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{ height: 500 }}></div>
        </Card>
      </div>
    );
  }
}
