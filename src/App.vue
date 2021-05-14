<template>
<div class="d-flex" v-if="!scanning">
  <AppHeader :shopName="shopName"></AppHeader>
  <Cart></Cart>
  <AppFooter></AppFooter>
  <font-awesome-icon icon="camera-retro" size="4x"
    @click="scanning=true"
    class="text-gray-700 cursor-pointer absolute right-3 bottom-3"
  />
</div>
<div v-else>  
  <font-awesome-icon icon="times-circle" size="4x"
    @click="scanning=false"
    class="text-gray-700 cursor-pointer absolute right-3 bottom-3"
  />
  <qrcode-stream @decode="onDecode"/>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Cart from './components/Cart/Index.vue'

export default {
  components: {
    AppHeader,
    Cart,
    AppFooter
  },
  data () {
    return {
      scanning: false
    }
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
    ...mapActions(['getShop', 'createCart', 'restoreCart', 'addToCart']),
    onDecode (result) {
      const url = new URL(result)
      const productUuid = url.searchParams.get('addItem')
      if (productUuid) {
        this.addToCart(productUuid)
      }
      this.scanning = false
    }
  }
}
</script>