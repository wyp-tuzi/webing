import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import BaiduMap from 'vue-baidu-map';
import {BmlMarkerClusterer} from 'vue-baidu-map';


Vue.component('bml-marker-cluster', BmlMarkerClusterer);

Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.use(BaiduMap, {
    ak:'0YFlrudeTjQfHmr1M8NY6bWYRyMCGL1R'
});

new Vue({
    render: h => h(App)
}).$mount('#app');
