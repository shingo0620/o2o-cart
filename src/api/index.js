export function getShop (shopId) {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        id: shopId,
        name: '蓋婭科技',
        products: [{
          id: 1,
          uuid: '1234-1234-1234',
          name: '香蔥麵包',
          unitPrice: 25
        }, {
          id: 2,
          uuid: 'qwer-qwer-qwer',
          name: '紅豆吐司',
          unitPrice: 50
        }, {
          id: 3,
          uuid: 'asdf-asdf-asdf',
          name: '蛋黃酥',
          unitPrice: 30
        }]
      }
    })
  })
}
