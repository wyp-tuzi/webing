<template >
  <div class="baidumap" id="container" >

  </div>
</template>

<script>

export default {
    props:{
        tableData:{
            type:Array,
            default() {
                return undefined;
            }
        }
    },
    data(){
        return{

        };
    },

    methods: {
        baiduMap() {
            let map = new BMapGL.Map('container'); // 创建Map实例  <div id="container"></div>

            map.centerAndZoom('武汉市', 11); // 初始化地图,设置中心点坐标和地图缩放级别
            map.enableScrollWheelZoom(true); // 开启鼠标滚轮 地图可以进行放大 缩小
            let scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件 左下角显示

            map.addControl(scaleCtrl);
            let zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件 右下角显示

            map.addControl(zoomCtrl);
            let cityControl = new BMapGL.CityListControl({ //添加城市列表控件 左上角
            // 控件的停靠位置（可选，默认左上角）
                anchor: BMAP_ANCHOR_TOP_LEFT,
                // 控件基于停靠位置的偏移量（可选）
                offset: new BMapGL.Size(20, 5)
            });

            map.addControl(cityControl);

            let positionOpts = {
                    width: 300, // 信息窗口宽度
                    height: 60, // 信息窗口高度
                    title: '' // 信息窗口标题
                },
                positionInfoWindow = new BMapGL.InfoWindow('content', positionOpts), // 创建信息窗口对象


                flag = false;
            // 鼠标移动显示经纬度信息

            map.addEventListener('mousemove',fn);
            function fn(event){
                if(flag){
                    return;
                }
                let lng = event.latlng.lng,
                    lat = event.latlng.lat,
                    content = '<div style="font-size:16px; font-weight: bold">' + '经度：' + lng + '<br>纬度：' + lat + '</div>';

                positionInfoWindow.setContent(content);
                positionInfoWindow.setTitle('<div style="font-size:18px; font-weight: bold">经纬度:</div>');
                let point = new BMapGL.Point(lng, lat);

                map.openInfoWindow(positionInfoWindow, point); // 打开信息窗口
            }

            // const hashMap = new Map()
            let arrData = this.tableData;

            arrData.forEach(function (item, index) {
                let arr = item.position.split(','),
                    lng = arr[0],
                    lat = arr[1],
                    point = new BMapGL.Point(lng, lat),
                    marker = new BMapGL.Marker(point);

                marker.information = item; //给marker对象添加information属性
                //
                // let personInfo={};
                // let newArr=[];
                // personInfo.marker =marker;
                // personInfo.info=item;
                // newArr.push(personInfo);
                // hashMap.set(item.tel,personInfo)
                map.addOverlay(marker);
                marker.addEventListener('click', clickOnMarker);
            });


            let informationOpts = {
                    width: 300,
                    height: 210,
                    title: '',
                    content: ''
                },
                infoWindow = new BMapGL.InfoWindow('', informationOpts);

            infoWindow.setTitle('<div style="font-size:18px; font-weight: bold">个人信息:</div>');

            function clickOnMarker(event) {
                flag = true; //点击图标时，不触发鼠标移动事件
                let personObject = event.currentTarget.information,
                    content = '姓名: ' + personObject.name + '<br>年级: ' + personObject.grade + '<br>院校: ' + personObject.department + '<br>专业: ' + personObject.major + '<br>性别：' + personObject.sex + '<br>工作地点：' + personObject.workPlace + '<br>电话：' + personObject.tel + '<br>薪资：' + personObject.salary;

                infoWindow.setContent(content);
                let lng = event.latLng.lng,
                    lat = event.latLng.lat,
                    point = new BMapGL.Point(lng, lat);

                map.openInfoWindow(infoWindow, point);
                infoWindow.addEventListener('close',function (){
                    flag = false; //信息窗口关闭 此时鼠标移动事件可以生效
                });
            }
        }

    },
    mounted() {
        this.baiduMap();
    }
};
</script>
<style  lang="less">
  .baidumap {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
  }

</style>