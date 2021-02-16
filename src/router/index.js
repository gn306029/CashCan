import Vue from 'vue'
import VueRouter from 'vue-router'
import VueGapi from 'vue-gapi'
import Index from '../components/Index.vue'
import Login from '../components/login/Login.vue'
import EditItem from '../components/cashcan/EditItem.vue'

Vue.use(VueRouter)
Vue.use(VueGapi, {
    apiKey: 'AIzaSyDfQyA68A2t5LWgNWrGLvuPa55bvjinDDI',
    clientId: '30929351065-k3d8ahn8lvnj3adicrkjef85pok0set5.apps.googleusercontent.com',
    // discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scope: 'profile',
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/add_item/',
    name: 'NewItem_',
    component: EditItem,
  },
  {
    path: '/add_item/:can_id/:item_id',
    name: 'NewItem',
    component: EditItem,
    props(route) {
      const props = {
        can_id: route.params.can_id,
        item_id: route.params.item_id
      };
      return props;
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
