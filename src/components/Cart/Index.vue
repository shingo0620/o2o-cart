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
        {{ item.name }} (${{ item.unitPrice }})
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
import QuantityPanel from './QuantityPanel.vue'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

const DEMO_SHOP_ID = 'DEMO_SHOP_ID'

export default {
  components: {
    QuantityPanel
  },
  data () {
    return {
      cartTTLKey: `shop_${DEMO_SHOP_ID}_cart_ttl`,
      cartIDKey: `shop_${DEMO_SHOP_ID}_cart_id`,
      items: [{
        id: '1234-1234-1234',
        name: '香蔥麵包',
        quantity: 2,
        unitPrice: 25
      }, {
        id: 'qwer-qwer-qwer',
        name: '紅豆吐司',
        quantity: 1,
        unitPrice: 50
      }, {
        id: 'asdf-asdf-asdf',
        name: '蛋黃酥',
        quantity: 5,
        unitPrice: 30
      }]
    }
  },
  computed: {
    total () {
      return this.items.reduce((accu, current) => {
        return accu + current.quantity * current.unitPrice
      }, 0)
    }
  },
  mounted () {
    let cartTTL = localStorage.getItem(this.cartTTLKey)

    // 不存在 cartTTL 或是 cartTTL 過期 => 產生新的購物車並且賦予新的 cartTTL
    if (!cartTTL || dayjs.unix(cartTTL).isBefore(dayjs())) {
      this.createCart()
    } else {
      this.renewTTL()
    }
  },
  methods: {
    createCart () {
      // TODO 和後端產生新的購物車
      let cartTTL = dayjs().unix() + 60 * 60
      localStorage.setItem(this.cartTTLKey, cartTTL)
    },
    renewTTL () {
      let cartTTL = dayjs().unix() + 60 * 60
      localStorage.setItem(this.cartTTLKey, cartTTL)
    },
    checkout () {
      let cartId = localStorage.getItem(this.cartIDKey)
      if (!cartId) {
        localStorage.setItem(this.cartIDKey, uuid())
      } else {
        window.alert(cartId)
      }
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
