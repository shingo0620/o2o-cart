<template>
  <nav class="bg-gray-700 text-center text-white w-100 py-4">
    {{ shopName }} - 購物車
  </nav>
</template>

<script>
export default {
  props: {
    shopName: {
      type: String,
      default: '我的商店'
    }
  }
}
</script>
