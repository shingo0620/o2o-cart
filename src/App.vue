<template>
<div class="d-flex">
  <AppHeader :shopName="shopName"></AppHeader>
  <router-view></router-view>
  <AppFooter></AppFooter>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { shopId, shopName, getShop, addToCart, createCart, restoreCart } from '@/compositions'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

onMounted(() => {
  const shopId = (new URL(window.location.href)).searchParams.get('shopId')
  getShop(shopId)
  addProductByURL(window.location.href)
})

const addProductByURL = (url) => {
  const productUuid = (new URL(url)).searchParams.get('addItem')
  if (productUuid) {
    addToCart(productUuid)
  }
}
</script>
