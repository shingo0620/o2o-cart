<template>
<div class="d-flex">
  <AppHeader :shopName="shopName"></AppHeader>
  <Cart></Cart>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import AppHeader from './components/AppHeader.vue'
import Cart from './components/Cart/Index.vue'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

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
  computed: {
    cartTTLKey () {
      return `shop_${this.shopId}_cart_ttl`
    }
  },
  created () {
    const url = new URL(window.location.href)
    this.shopId = url.searchParams.get('shopId')
    this.getShop(this.shopId)
  },
  mounted () {
    let cartTTL = localStorage.getItem(this.cartTTLKey)

    if (!cartTTL || dayjs.unix(cartTTL).isBefore(dayjs())) {
      // 不存在 cartTTL 或是 cartTTL 過期 => 產生新的購物車並且賦予新的 cartTTL
      this.createCart()
    } else {
      // 取回購物車並更新 TTL
      this.restoreCart()
      this.renewTTL()
    }
  },
  methods: {
    ...mapActions(['getShop']),
    createCart () {
      // TODO 和後端產生新的購物車
      let cartTTL = dayjs().unix() + 60 * 60
      localStorage.setItem(this.cartTTLKey, cartTTL)
    },
    restoreCart () {},
    renewTTL () {
      let cartTTL = dayjs().unix() + 60 * 60
      localStorage.setItem(this.cartTTLKey, cartTTL)
    }
  }
}
</script>