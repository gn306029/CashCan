import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Login from '../components/login/Login.vue'
import EditItem from '../components/cashcan/EditItem.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  {
    path: '/login',
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
