import { createStore } from 'vuex'
import { getShop } from '@/api/index.js'

const store = createStore({
  state () {
    return {
      shopName: '',
      products: [],
      cartItems: [{
        id: 1,
        quantity: 3
      }, {
        id: 2,
        quantity: 1
      }]
    }
  },
  mutations: {
    setShopName (state, name) {
      state.shopName = name
    },
    setProducts (state, products) {
      state.products = products
    }
  },
  actions: {
    async getShop (context, shopId) {
      const res = (await getShop(shopId)).data
      context.commit('setShopName', res.name)
      context.commit('setProducts', res.products)
    }
  }
})

export default store