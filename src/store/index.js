import { createStore } from 'vuex'

const setLocalStorage = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalStorage = () => {
  const cartListString = localStorage.cartList
  return cartListString ? JSON.parse(localStorage.cartList) : {}
}

export default createStore({
  state: {
    cartList: getLocalStorage()
    // shopID: {
    //   shopName: ''
    //   productList: {
    //     productId: {
    //      id: 1,
    //      imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //      name: '番茄250g/份',
    //      sales: '月售十件',
    //      price: 33.6,
    //      originalPrice: 39.6,
    //      count: 1
    //    }
    //   }
    // }
  },
  getters: {},
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopID, productId, productInfo } = payload
      // console.log(shopID, productId, productInfo)
      let shopInfo = state.cartList[shopID] || {
        shopName: '', productList: {}
      }
      if (!shopInfo) {
        shopInfo = {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += payload.num
      if (payload.num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopID] = shopInfo
      // console.log(state.cartList)
      setLocalStorage(state)
    },
    changeShopName (state, payload) {
      const { shopID, shopName } = payload
      const shopInfo = state.cartList[shopID] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopID] = shopInfo
      setLocalStorage(state)
    },
    changeCartItemChecked (state, payload) {
      const { shopID, productId } = payload
      const product = state.cartList[shopID].productList[productId]
      product.check = !product.check
      setLocalStorage(state)
    },
    clearCartProduct (state, payload) {
      const { shopID } = payload
      state.cartList[shopID].productList = {}
      setLocalStorage(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopID } = payload
      const products = state.cartList[shopID].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalStorage(state)
    },
    handleCancleOrder (state, payload) {
      const { shopID } = payload
      const cartList = state.cartList
      cartList[shopID].condition = 'false'
      setLocalStorage(state)
    },
    handleConfimOrder (state, payload) {
      const { shopID } = payload
      const cartList = state.cartList
      cartList[shopID].condition = 'true'
      setLocalStorage(state)
    }
  },
  actions: {},
  modules: {}
})
