'use strict';
let productsData = [
  {
    name: "Nokia 6.1 Plus",
    image_url: "https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1",
    price: 2400000,
    stock: 10
  },
  {
    name: "Iphone 10",
    image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/12/23/2480499/2480499_e90b744f-d3ad-4928-bdf6-5386c22d6d60",
    price: 10000000,
    stock: 5
  },
  {
    name: "Iphone 11",
    image_url: "https://www.kindpng.com/picc/m/266-2662141_apple-iphone-11-pro-max-iphone-11-pro.png",
    price: 14000000,
    stock: 5
  },
  {
    name: "Motorola G Plus",
    image_url: "https://www.begawei.com/wp-content/uploads/2019/10/motorola-g8-plus-f.png",
    price: 5000000,
    stock: 3
  },
  {
    name: "Redmi Note 8",
    image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-8613560/xiaomi_xiaomi_redmi_note_8_smartphone_-64_gb-_4_gb-_garansi_resmi_full01_t8sbogf6.jpg",
    price: 3000000,
    stock: 10
  }
]

productsData.forEach(el=>{
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', productsData, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
