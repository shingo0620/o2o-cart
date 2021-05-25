<template>
<div class="w-full bg-gray-200 p-1">
  <router-link :to="{name: 'Cart'}" class="flex">
    <a class="w-full p-1 text-center rounded ring-2 ring-gray-700 ring-opacity-60">返回購物車</a>
  </router-link>
</div>

<div class="p-20 justify-center flex-wrap">
  <label class="block text-center">付款總金額</label>
  <input class="block p-4 text-4xl font-bold mx-auto mt-4 text-center border ring-4 rounded-lg" v-model="total" />
  <p class="text-center mt-4">如有需要請與店員確認結帳總金額是否正確</p>
</div>

<!-- 結帳方法選擇 -->
<div class="flex flex-wrap w-full">
  <div class="w-6/12 bg-gray-200 p-1">
    <router-link :to="{name: 'Cart'}" class="flex">
      <a class="p-4 w-full text-center rounded ring-2 ring-gray-700 ring-opacity-60">信用卡</a>
    </router-link>
  </div>
  <div class="w-6/12 bg-green-200 p-1">
    <router-link :to="{name: 'Checkout'}" class="flex">
      <a class="p-4 w-full text-center rounded ring-2 ring-gray-700 ring-opacity-60">Apple Pay</a>
    </router-link>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { cartItems, products } from '@/compositions'

const total = ref(0)

onMounted(() => {
  total.value = cartItems.value.reduce((accu, current) => {
    const product = products.value.find((item) => item.uuid === current.uuid)
    return accu + product.unitPrice * current.quantity
  }, 0)
})

const getAmount = () => {
  
}
</script>
