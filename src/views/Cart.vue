<template>
  <div>
    <!-- 頭部控制按鈕 -->
    <div class="flex flex-wrap w-full bg-gray-700 pb-2">
      <div class="w-6/12 bg-gray-200 p-1">
        <button class="w-full text-center rounded ring-2 ring-gray-700 ring-opacity-60 p-1" @click="resetCart">清空購物車</button>
      </div>
      <div class="w-6/12 bg-green-200 p-1">
        <router-link :to="{name: 'Checkout'}" class="flex">
          <a class="w-full text-center rounded ring-2 ring-gray-700 ring-opacity-60 p-1">結帳</a>
        </router-link>
      </div>
    </div>

    <!-- 購物車內產品 -->
    <div class="py-5 px-2 flex w-full" v-for="item in items" :key="item.uuid">
      <div 
        class="text-center w-9/12"
      >
        {{ getProductByUuid(item.uuid)['name'] }} (${{ getProductByUuid(item.uuid)['unitPrice'] }})
      </div>
      <QuantityPanel
        class="ml-auto w-3/12"
        v-model="item.quantity"
        :productUuid="item.uuid"
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

    <router-link :to="{ name: 'Scan' }">
      <font-awesome-icon icon="camera-retro" size="4x"
        class="text-gray-700 cursor-pointer absolute right-3 bottom-3 z-10"
      />
    </router-link>    
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { cartItems as items, products, resetCart } from '@/compositions'
import QuantityPanel from '@/components/Cart/QuantityPanel.vue'

const total = computed(() => {
  if (items.value.length < 1 || products.value.length < 1) {
    return 0
  }
  return items.value.reduce((accu, current) => {
    const product = products.value.find(product => product.uuid === current.uuid)
    return accu + current.quantity * product?.unitPrice
  }, 0)
})

const getProductByUuid = (uuid) => {
  return products.value.find(product => product.uuid === uuid) || {}
}
</script>
