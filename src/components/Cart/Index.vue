<template>
  <div class="">
    <!-- 頭部控制按鈕 -->
    <div class="flex flex-wrap w-full bg-gray-700 pb-2">
      <div class="w-6/12 bg-gray-200 p-1">
        <button class="w-full text-center rounded ring-2 ring-gray-700 ring-opacity-60" @click="clear">清空購物車</button>
      </div>
      <div class="w-6/12 bg-green-200 p-1">
        <button class="w-full text-center rounded ring-2 ring-gray-700 ring-opacity-60" @click="checkout">結帳</button>
      </div>
    </div>

    <!-- 購物車內產品 -->
    <div class="py-5 px-2 flex w-full" v-for="item in items" :key="item.id">
      <div 
        class="text-center w-9/12"
      >
        {{ getProductById(item.id)['name'] }} (${{ getProductById(item.id)['unitPrice'] }})
      </div>
      <QuantityPanel
        class="ml-auto w-3/12"
        v-model="item.quantity"
        @remove="remove(item.id)"
      >
      </QuantityPanel>
    </div>

    <!-- 購物車總價 -->
    <div class="p-5 bg-gray-700 text-white text-right">
      <div v-if="items.length > 0">
        <span>總價格</span>
        <span class="ml-2">${{ total }}</span>
      </div>
      
      <div v-else class="text-center">
        請掃描商品 QR Code
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuantityPanel from './QuantityPanel.vue'

export default {
  name: 'Cart',
  components: {
    QuantityPanel
  },
  computed: {
    ...mapState({
      items: state => state.cartItems,
      products: state => state.products
    }),
    total () {
      return this.items.reduce((accu, current) => {
        return accu + current.quantity * current.unitPrice
      }, 0)
    }
  },
  mounted () {
    const productUUID = new URL(window.location.href).searchParams.get('productId')
    if (productUUID) {
      this.add(productUUID)
    }
  },
  methods: {
    getProductById (id) {
      return this.products.find(product => product.id === id) || {}
    },
    checkout () {
      let cartId = localStorage.getItem(this.cartIDKey)
      if (!cartId) {
        localStorage.setItem(this.cartIDKey, uuid())
      } else {
        window.alert(cartId)
      }
    },
    add (uuid) {
      const productIndex = this.products.findIndex(product => product.uuid === uuid)
      if (productIndex < 0) {
        window.alert('無此商品: ' + uuid)
        return
      }
      window.alert('成功加入購物車')
    },
    remove (id) {
      let targetItemIndex = this.items.findIndex((item) => item.id === id)
      this.items.splice(targetItemIndex, 1)
    },
    clear () {
      this.items = []
    }
  }
}
</script>
