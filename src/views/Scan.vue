<template>
<div>
  <qrcode-stream @decode="decodeHandler"/>
  <router-link :to="{ name: 'Cart' }">
    <font-awesome-icon icon="times-circle" size="4x"
      class="text-gray-700 cursor-pointer absolute right-3 bottom-3 z-10"
    />
  </router-link>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { addToCart } from '@/compositions'

const router = useRouter()

const decodeHandler = (result) => {
  addProductByURL(result)
  router.push({name: 'Cart'})
}

const addProductByURL = (url) => {
  const productUuid = (new URL(url)).searchParams.get('addItem')
  if (productUuid) {
    addToCart(productUuid)
  }
}
</script>
