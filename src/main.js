import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import "aos/dist/aos.css"
import Vuelidate from 'vuelidate'

window.Event = new Vue
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  created(){
    AOS.init()
  },
  router,
  render: h => h(App),
  
}).$mount('#app')
