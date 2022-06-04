
<template>
  <div class="mapbox">
    <baidu-map class="map" @ready="handler"  center="武汉" :zoom="12" :map-click="false">
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
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
            flag:false
        };
    },
    methods: {
        handler ({ BMap, map }) {
            this.BMap = BMap;
            this.map = map;
            this.map.setDefaultCursor('pointer');
            let that = this,
                arrData = this.tableData;
            //点击点标记打开学生信息窗口

            arrData.forEach(function (item, index) {
                let arr = item.position.split(','),
                    lng = arr[0],
                    lat = arr[1],
                    point = new that.BMap.Point(lng, lat),
                    marker = new that.BMap.Marker(point); // 创建标注

                marker.information = item; //给marker对象添加information属性
                that.map.addOverlay(marker); // 将标注添加到地图中
                let informationOpts = {
                        title : '<b>个人信息</b>' ,
                        offset: new that.BMap.Size(0,-28) // 向上偏移
                    },
                    infoWindow =  new that.BMap.InfoWindow('content', informationOpts);

                marker.addEventListener('click', function (e) {
                    that.flag = true;
                    let lng =e.point.lng,
                        lat = e.point.lat,
                        point = new that.BMap.Point(lng, lat),
                        content = '姓名: ' + arrData[index].name + '<br>年级: ' + arrData[index].grade + '<br>院校: ' + arrData[index].department + '<br>专业: ' + arrData[index].major + '<br>性别：' + arrData[index].sex + '<br>工作地点：' + arrData[index].workPlace + '<br>电话：' + arrData[index].tel + '<br>薪资：' + arrData[index].salary;

                    infoWindow.setContent(content);
                    that.map.openInfoWindow(infoWindow, point);
                    infoWindow.addEventListener('close',function (){
                        that.flag = false; //信息窗口关闭 此时鼠标移动事件可以生效
                    });
                });
            });

            //鼠标移动打开经纬度窗口
            let positionOpts = {
                    title : '<b>经纬度</b>' ,
                    offset: new that.BMap.Size(0,-28) // 向上偏移
                },
                positionInfoWindow =  new that.BMap.InfoWindow('content', positionOpts);

            that.map.addEventListener('mousemove',function (e) {
                if(that.flag){
                    return;
                }
                let lng = e.point.lng,
                    lat = e.point.lat,
                    content = '<div style="font-size:16px; font-weight: bold">' + '经度：' + lng + '<br>纬度：' + lat + '</div>';

                positionInfoWindow.setContent(content);
                let point = new that.BMap.Point(lng, lat);

                that.map.openInfoWindow(positionInfoWindow, point); // 打开信息窗口
            });
        }
    }

};

</script>
<style scoped>
  .map {
    height:800px;
  }
</style>