<template>
  <div class="mapbox">
    <baidu-map class="map" @ready="handler" @mousemove="handMouseMove" center="武汉" :zoom="12" :map-click="false">
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <div v-for="(marker, i) of markers" :key="i">
          <bm-marker :position="{lng: marker.lng, lat: marker.lat}" @click="handClick(marker)">
          </bm-marker>
      </div>
      <InfoWindow :title="title" :content="content" :lng="lng" :lat="lat" @editCtr="editCtr"/>
    </baidu-map>
  </div>
</template>

<script>

import InfoWindow from '@/components/InfoWindow';
export default {
    components: {InfoWindow},
    props:{
        tableData:{
            type:Array,
            default() {
                return undefined;
            }
        }
    },
    data () {
        return {
            BMap: '',
            map: '',
            title:'',
            content:'',
            lng:'',
            lat:'',
            markers:[],
            ctr:false
        };
    },
    methods: {
        handler ({ BMap, map }) {
            map.enableScrollWheelZoom(true);
            this.BMap = BMap;
            this.map = map;
            let that = this;

            this.tableData.forEach(function (item, index) {
                let arr = item.position.split(','),
                    lng = arr[0],
                    lat = arr[1];
                const eachMarker = { lng: lng, lat: lat,info:item};

                that.markers.push(eachMarker);
            });
        },
        handClick (marker) {
            this.title='个人信息';
            this.lng = marker.lng;
            this.lat = marker.lat;
            this.content='姓名: '+marker.info.name+'<br>年级: ' + marker.info.grade + '<br>院校: ' + marker.info.department + '<br>专业: ' +marker.info.major + '<br>性别：' + marker.info.sex + '<br>工作地点：' + marker.info.workPlace + '<br>电话：' + marker.info.tel + '<br>薪资：' +marker.info.salary;
        },
        handMouseMove(e){
            if(this.ctr){
                return;
            }
            this.title='经纬度';
            this.lng = String(e.point.lng);
            this.lat = String(e.point.lat);
            this.content='经度:'+ this.lng+'<br>维度:'+ this.lat;
        },
        editCtr(newCtr){
            this.ctr = newCtr;
        }
    }

};
</script>
<style scoped>
.map {
  height:800px;
}
</style>