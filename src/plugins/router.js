import { createRouter, createWebHistory } from 'vue-router'
import Cart from '@/views/Cart.vue'
import Scan from '@/views/Scan.vue'
import Checkout from '@/views/Checkout.vue'

const routes = [
  { 
    path: '/',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scan
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router