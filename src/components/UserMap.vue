<template>
  <div class="mapbox">
    <baidu-map class="map" @ready="handler" @mousemove="handMouseMove"  center="武汉" :zoom="12" :map-click="false">
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <div v-for="(marker, i) of markers" :key="i">
          <bm-marker :position="{lng: marker.lng, lat: marker.lat}" @click="infoWindowOpen(marker)">
          </bm-marker>
      </div>
      <bm-info-window :width="250" title="个人信息" :position="{lng: infoWindow.lng_info, lat: infoWindow.lat_info}" :show="infoWindow.flag_info" @close="infoWindowClose" >
        <p v-text="'姓名:'+infoWindow.info.name"></p>
        <p v-text="'年级:'+infoWindow.info.grade"></p>
        <p v-text="'院校:'+infoWindow.info.department"></p>
        <p v-text="'专业:'+infoWindow.info.major"></p>
        <p v-text="'性别:'+infoWindow.info.sex"></p>
        <p v-text="'工作地点:'+infoWindow.info.workPlace"></p>
        <p v-text="'电话:'+infoWindow.info.tel"></p>
        <p v-text="'薪资:'+infoWindow.info.salary"></p>
      </bm-info-window>
      <bm-info-window :width="250" title="经纬度：" :position="{lng: lng, lat: lat}" :show="flag">
        <p v-text="'经度:'+lng"></p>
        <p v-text="'维度:'+lat"></p>
      </bm-info-window>
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
    data () {
        return {
            BMap: '',
            map: '',
            markers:[],
            lng:'',
            lat:'',
            flag:false,
            infoWindow:{
                lng_info:'',
                lat_info:'',
                flag_info:false,
                info:{
                    name:'',
                    grade:'',
                    department:'',
                    major:'',
                    sex:'',
                    workPlace:'',
                    tel:'',
                    salary:''
                }
            },
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
        infoWindowOpen (marker) {
            this.ctr = true;
            this.infoWindow.lng_info = marker.lng;
            this.infoWindow.lat_info = marker.lat;
            this.infoWindow.info = marker.info;
            this.infoWindow.flag_info = true;
        },
        infoWindowClose(){
            this.ctr = false;
        },
        handMouseMove(e){
            if(this.ctr){
                return;
            }
            this.lng = e.point.lng,
            this.lat = e.point.lat;
            this.flag = true;

        }
    }

};
</script>
<style scoped>
.map {
  height:800px;
}
</style>