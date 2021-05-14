import { createStore } from 'vuex'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import { getShop } from '@/api/index.js'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',

  state () {
    return {
      shopId: '',
      shopName: '',
      products: [],
      cartId: '',
      cartItems: []
    }
  },

  mutations: {
    setShopId (state, id) {
      state.shopId = id
    },
    setShopName (state, name) {
      state.shopName = name
    },
    setCartId (state, uuid) {
      state.cartId = uuid
    },
    setCartItems (state, items) {
      state.cartItems = items
    },
    setProducts (state, products) {
      state.products = products
    },
    addItemToCart (state, {uuid, quantity}) {
      state.cartItems.push({uuid, quantity})
    },
    addCartItemQuantity (state, index) {
      state.cartItems[index].quantity++
    },
    reduceCartItemQuantity (state, index) {
      state.cartItems[index].quantity--
    },
    removeCartItem (state, index) {
      state.cartItems.splice(index, 1)      
    },
    resetCart (state) {
      state.cartItems = []
    }
  },
  
  actions: {
    async getShop (context, shopId) {
      context.commit('setShopId', shopId)

      const res = (await getShop(shopId)).data
      context.commit('setShopName', res.name)
      context.commit('setProducts', res.products)

      const cartTTL = localStorage.getItem(context.getters.cartTTLKey)
      const cartId = localStorage.getItem(context.getters.cartIDKey)
      if (!cartId || !cartTTL || dayjs.unix(cartTTL).isBefore(dayjs())) {
        // 不存在 cartId, cartTTL 或是 cartTTL 過期 => 產生新的購物車並且賦予新的 cartTTL
        context.dispatch('createCart')
      } else {
        context.commit('setCartId', cartId)
        context.dispatch('restoreCart')
      }
    },
    createCart (context) {
      const cartId = uuid()
      context.commit('setCartId', cartId)
      localStorage.setItem(context.getters.cartIDKey, cartId)
      localStorage.setItem(cartId, JSON.stringify([]))
      context.dispatch('renewTTL')
    },

    restoreCart (context) {
      const items = JSON.parse(localStorage.getItem(context.state.cartId))
      context.commit('setCartItems', items)
      context.dispatch('renewTTL')
    },

    saveCart (context) {
      localStorage.setItem(context.state.cartId, JSON.stringify(context.state.cartItems))
      context.dispatch('renewTTL')
    },

    renewTTL (context) {
      let cartTTL = dayjs().unix() + 60 * 60
      localStorage.setItem(context.getters.cartTTLKey, cartTTL)
    },

    addToCart (context, productUuid) {
      const index = context.state.cartItems.findIndex((item) => item.uuid === productUuid)
      if (index > -1) {
        // 商品已存在, 增加數量
        context.commit('addCartItemQuantity', index)
      } else {
        context.commit('addItemToCart', {
          uuid: productUuid,
          quantity: 1
        })
      }
      context.dispatch('saveCart')
    },

    reduceFromCart (context, productUuid) {
      const index = context.state.cartItems.findIndex((item) => item.uuid === productUuid)
      if (index > -1) {
        // 商品已存在, 減少數量
        context.commit('reduceCartItemQuantity', index)
      }
      context.dispatch('saveCart')
    },

    removeFromCart (context, productUuid) {
      const index = context.state.cartItems.findIndex((item) => item.uuid === productUuid)
      if (index > -1) {
        context.commit('removeCartItem', index)
      }
      context.dispatch('saveCart')
    },

    resetCart (context) {
      context.commit('setCartItems', [])
      context.dispatch('saveCart')
    },

    checkout (context) {}
  },

  getters: {
    cartTTLKey (state) {
      return `shop_${state.shopId}_cart_ttl`
    },
    cartIDKey (state) {
      return `shop_${state.shopId}_cart_id`
    }
  }
})

export default store