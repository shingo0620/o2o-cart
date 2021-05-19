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
  <qrcode-stream @decode="decodeHandler"/>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { shopId, shopName, getShop, addToCart, createCart, restoreCart } from './compositions'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Cart from './components/Cart/Index.vue'

export default {
  components: {
    AppHeader,
    Cart,
    AppFooter
  },

  setup (props) {
    onMounted(() => {
      const shopId = (new URL(window.location.href)).searchParams.get('shopId')
      getShop(shopId)
      addProductByURL(window.location.href)
    })

    const scanning = ref(false)

    const decodeHandler = (result) => {
      addProductByURL(result)
      scanning.value = false
    }

    const addProductByURL = (url) => {
      const productUuid = (new URL(url)).searchParams.get('addItem')
      if (productUuid) {
        addToCart(productUuid)
      }
    }
    
    return {
      scanning,
      shopId,
      shopName,
      decodeHandler
    }
  }
}
</script>