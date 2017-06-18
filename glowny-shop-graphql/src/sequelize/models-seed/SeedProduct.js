export default function SeedUserRole (db, env) {
   
  var Product = db['Product']
  var Shop = db['Shop']
  var User = db['User']

  if (env === 'development' || env === 'test') {
    Shop.findOrCreate({ 
      defaults: {
        code: 'Glowny_Cloth',
        systemCurr: 'THB',
        name: 'Glowny Clothing',
        isActive: true,
      },
      where: {code: 'Glowny_Cloth'} 
    }).spread((glownyCloth, created) => {

      if (glownyCloth) {
        User.findOrCreate({ 
            defaults: {
              id: 'User2',
              email: 'admin@glowny-shop.com',
              firstName: 'Daniel',
              lastName: 'Heo',
              type: 'admin',
              isActive: true,
              password: 'P@ssw0rd',
            },
            where: { email: 'admin@glowny-shop.com' }}).spread((user, created) => {
              Product.findOrCreate({ 
                defaults: {
                  id: 'ID:GC.0001',
                  shopId: glownyCloth.id,
                  sku: 'GC.0001',
                  name: 'Product 1',
                  description: 'This is product #1 from Glowny Cloth',
                  curr: 'THB',
                  price: 1500,
                  isActive: true,
                  createdBy: user.id,
                  updatedBy: user.id,
                },
                where: {sku: 'GC.0001'}
              })

              Product.findOrCreate({ 
                defaults: {
                  id: 'ID:GC.0002',
                  shopId: glownyCloth.id,
                  sku: 'GC.0002',
                  name: 'Product 2',
                  description: 'This is product #2 from Glowny Cloth',
                  curr: 'THB',
                  price: 1750,
                  isActive: true,
                  createdBy: user.id,
                  updatedBy: user.id,
                },
                where: {sku: 'GC.0002'}
              })
            })
      }
    })



    Shop.findOrCreate({ 
      defaults: {
        code: 'Daniel_Shop',
        name: 'Daniel Shop',
        systemCurr: 'IDR',
        isActive: true,
      },
      where: {code: 'Daniel_Shop'} 
    }).spread((danielShop, created) => {

      if (danielShop) {
        User.findOrCreate({ 
          defaults: {
            id: 'daniel_super',
            email: 'super@daniel-shop.com',
            firstName: 'Super',
            lastName: 'Daniel Shop',
            type: 'shop',
            isActive: true,
            password: 'P@ssw0rd',
            shopId: danielShop.id
          },
          where: { email: 'super@daniel-shop.com' }}).spread((user, created) => {
            Product.findOrCreate({ 
              defaults: {
                id: 'ID:DH.0001',
                shopId: danielShop.id,
                sku: 'DH.0001',
                name: 'Daniel Shop Product 1',
                description: 'Daniel Shop - Product #1',
                curr: 'IDR',
                price: 850000,
                isActive: true,
                createdBy: user.id,
                updatedBy: user.id,
              },
              where: { $and: [{sku: 'DH.0001'}, {shopId: danielShop.id}] }
            })
          })
      }
    })
  }
}