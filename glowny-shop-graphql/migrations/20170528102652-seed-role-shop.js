'use strict'
const uuid = require('uuid')

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    const buffer = new Buffer(32)
    return[ 
      queryInterface.bulkInsert('Roles',[{
        id: uuid(),
        code: 'Shop_Product',
        title: 'Product Admin',
        type: 'shop',
        isSuper: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: uuid(),
        code: 'Shop_User',
        title: 'User Admin',
        type: 'shop',
        isSuper: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: uuid(),
        code: 'Shop_Seller',
        title: 'Seller',
        type: 'shop',
        isSuper: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }])
    ]
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, [ {where : { code: 'Shop_Seller'}}] )
  }
};
