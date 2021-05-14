<template>
<div class="d-flex">
  <AppHeader :shopName="shopName"></AppHeader>
  <Cart></Cart>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppHeader from './components/AppHeader.vue'
import Cart from './components/Cart/Index.vue'

export default {
  components: {
    AppHeader,
    Cart
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      shopId: state => state.shopId,
      shopName: state => state.shopName
    })
  },
  async mounted () {
    const url = new URL(window.location.href)
    const shopId = url.searchParams.get('shopId')
    await this.getShop(shopId)

    const productUuid = url.searchParams.get('addItem')
    if (productUuid) {
      this.addToCart(productUuid)
    }
  },
  methods: {
    ...mapActions(['getShop', 'createCart', 'restoreCart', 'addToCart'])
  }
}
</script>