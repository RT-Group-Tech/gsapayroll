import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index'
import storeData from './store/store.js'
import axios from 'axios';
Vue.config.productionTip = false;

Vue.filter('sortlength', function(text, length, suffix) {
    var sorted = (text.length > length) ? text.substring(0, length) + suffix : text
    return sorted;
});
Vue.use(Vuex);

//axios instance
var domain="http://127.0.0.1/rd-payroll";
if(location.href.includes(".com"))
{
    if(location.protocol!=="https://")
    {
        location.protocol="https://";
    }
    domain="https://gsa-central-server.rtgroup-rdc.com";
}
var instance = axios.create({
    baseURL: domain,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
Vue.prototype.$axios = instance;

//support vueSweetalert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
Vue.use(Autocomplete);

Vue.config.productionTip = false;
Vue.component('XLoading', require('@/components/utilities/loading').default);
const store = new Vuex.Store(storeData);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
