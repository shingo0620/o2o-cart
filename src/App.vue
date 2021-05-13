<template>
<div class="d-flex">
  <AppHeader :shopName="shopName"></AppHeader>
  <Cart :products="products"></Cart>
</div>
</template>

<script>
import { getShop } from './api/index.js'
import AppHeader from './components/AppHeader.vue'
import Cart from './components/Cart/Index.vue'

export default {
  components: {
    AppHeader,
    Cart
  },
  data () {
    return {
      shopName: null,
      shopId: null,
      products: []
    }
  },
  created () {
    const url = new URL(window.location.href)
    this.shopId = url.searchParams.get('shopId')
    this.getShop(this.shopId)
  },
  methods: {
    async getShop (shopId) {
      const res = (await getShop(shopId)).data
      this.shopName = res.name
      this.products = res.products
    }
  }
}
</script>