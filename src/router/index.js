import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import EditItem from '../components/cashcan/EditItem.vue'
import ManageAmountClass from '../components/cashcan/ManageAmountClass.vue'
import AmountClassItemDetail from '../components/cashcan/AmountClassItemDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
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
  },
  {
    path: '/amount_class/',
    name: 'AmountClass',
    component: ManageAmountClass,
  },
  {
    path: '/amount_class/:amount_class_id/:amount_class_name/',
    name: 'AmountClassItemDetail',
    component: AmountClassItemDetail,
    props(route) {
      const props = {
        amount_class_id: route.params.amount_class_id,
        amount_class_name: route.params.amount_class_name
      };
      return props;
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
