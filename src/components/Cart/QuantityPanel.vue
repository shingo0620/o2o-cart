<template>
  <div class="flex justify-around px-1">
    <font-awesome-icon  v-if="modelValue > 0" icon="minus" size="lg" @click="reduceFromCart(productUuid)" class="text-gray-700 cursor-pointer"/>
    <font-awesome-icon  v-else icon="trash" size="lg" @click="removeFromCart(productUuid)" class="text-red-400 cursor-pointer" />
    <span class="text-gray-800">{{ modelValue }}</span>
    <font-awesome-icon icon="plus" size="lg" @click="addToCart(productUuid)" class="text-gray-700 cursor-pointer" />
  </div>
</template>

<script>
import { addToCart, removeFromCart, reduceFromCart } from '@/compositions'

export default {
  props: {
    modelValue: Number,
    productUuid: [Number, String]
  },

  setup (props) {
    return {
      addToCart,
      removeFromCart,
      reduceFromCart
    }
  }
}
</script>

<style>

</style>