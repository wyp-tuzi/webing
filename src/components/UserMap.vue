<template>
  <div class="mapbox">
    <baidu-map class="map" @ready="handler" @mousemove="handMouseMove" center="武汉" :zoom="12" :map-click="false">
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <div v-for="(marker, i) of markers" :key="i">
          <bm-marker :position="{lng: marker.lng, lat: marker.lat}" @click="infoWindowOpen(marker)">
            <bm-info-window :width="250" title="个人信息" :position="{lng: marker.lng, lat: marker.lat}" :show="marker.showFlag" @close="infoWindowClose(marker)">
              <p v-text="'姓名:'+marker.info.name"></p>
              <p v-text="'年级:'+marker.info.grade"></p>
              <p v-text="'院校:'+marker.info.department"></p>
              <p v-text="'专业:'+marker.info.major"></p>
              <p v-text="'性别:'+marker.info.sex"></p>
              <p v-text="'工作地点:'+marker.info.workPlace"></p>
              <p v-text="'电话:'+marker.info.tel"></p>
              <p v-text="'薪资:'+marker.info.salary"></p>
            </bm-info-window>
          </bm-marker>
        </div>
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
            flag:false
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
                const eachMarker = { lng: lng, lat: lat,info:item,showFlag: false};

                that.markers.push(eachMarker);
            });
        },

        infoWindowClose (e) {
            this.flag = true;
            e.showFlag = false;
            console.log('infoWindowClose被调用',e);
        },
        infoWindowOpen (e) {
            this.flag = false;
            e.showFlag = true;
            console.log('infoWindowOpen被调用',e);
        },
        handMouseMove(e){
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