import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import { getShop } from '@/api/index.js'
import { computed, ref } from 'vue'

export const shopId = ref('')
export const shopName = ref('')
export const products = ref([])
export const cartId = ref('')
export const cartItems = ref([])

export const cartTTLKey = computed(() => `shop_${state.shopId}_cart_ttl`)
export const cartIDKey = computed(() => `shop_${state.shopId}_cart_id`)

export const getShop = async (shopId) => {
  shopId.value = shopId
  const res = (await getShop(shopId)).data
  shopName.value = res.name
  products.value = res.products
  
  const oldCartTTL = localStorage.getItem(cartTTLKey.value)
  const oldCartId = localStorage.getItem(cartIDKey.value)
  if (!oldCartId || !oldCartTTL || dayjs.unix(oldCartTTL).isBefore(dayjs())) {
    // 不存在 cartId, cartTTL 或是 cartTTL 過期 => 產生新的購物車並且賦予新的 cartTTL
    createCart()
  } else {
    cartId.value = oldCartId
    restoreCart()
  }
}

export const createCart = () => {
  cartId.value = uuid()
  localStorage.setItem(cartIDKey.value, cartId.value)
  localStorage.setItem(cartId.value, JSON.stringify([]))
  renewTTL()
}

export const restoreCart = () => {
  const items = JSON.parse(localStorage.getItem(cartId.value))
  cartItems.value = items
  renewTTL()
}

export const saveCart =  () => {
  localStorage.setItem(cartId.value, JSON.stringify(cartItems.value))
  renewTTL()
},

export const renewTTL = () => {
  let cartTTL = dayjs().unix() + 60 * 60
  localStorage.setItem(cartTTLKey.value, cartTTL)
},

export const addToCart = (productUuid) => {
  const index = cartItems.value.findIndex((item) => item.uuid === productUuid)
  if (index > -1) {
    // 商品已存在, 增加數量
    cartItems.value[index]++
  } else {
    cartItems.value.push({
      uuid: productUuid,
      quantity: 1
    })
  }
  saveCart()
}

export const reduceFromCart = (productUuid) => {
  const index = cartItems.value.findIndex((item) => item.uuid === productUuid)
  if (index > -1) {
    // 商品已存在, 減少數量
    cartItems.value[index]--
  }
  saveCart()
}

export const removeFromCart = (productUuid) => {
  const index = cartItems.value.findIndex((item) => item.uuid === productUuid)
  if (index > -1) {
    cartItems.value.splice(index, 1)      
  }
  saveCart()
},

export const resetCart = () => {
  cartItems.value = []
  saveCart()
},

export const checkout = () => {}