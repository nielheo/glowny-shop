export default function SeedUserRole (db, env) {
   
  var User = db['User']
  var Role = db['Role']
  var Shop = db['Shop']
  var UserRole = db['User_Role']
  var UserShop = db['User_Shop']

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
        Role.findOrCreate({ 
          defaults: {
            code: 'Shop_Super',
            title: 'Super Admin',
            type: 'shop',
            isSuper: true,
          },
          where: {code: 'Shop_Super'} 
        }).spread((adminShop, created) => {
          User.findOrCreate({ 
            defaults: {
              id: 'Cloth_Super',
              email: 'super@glowny-cloth.com',
              firstName: 'Super',
              lastName: 'Glowny Cloth',
              type: 'shop',
              isActive: true,
              password: 'P@ssw0rd',
              shopId: glownyCloth.id
            },
            where: { email: 'super@glowny-cloth.com' }}).spread((user, created) => {
              UserRole.findOrCreate({
                where: { userId: user.id, roleId: adminShop.id },
                default: {
                  userId: user.id, roleId: adminShop.id
                }
              })
            })
        })
        Role.findOrCreate({ 
          defaults: {
            code: 'Shop_User',
            title: 'User Admin',
            type: 'shop',
            isSuper: false,
          },
          where: {code: 'Shop_User'} 
        }).spread((roleShopUser, created) => {
          User.findOrCreate({ 
            defaults: {
              id: 'Cloth_User',
              email: 'user@glowny-cloth.com',
              firstName: 'User',
              lastName: 'Glowny Cloth',
              type: 'shop',
              isActive: true,
              password: 'P@ssw0rd',
              shopId: glownyCloth.id
            },
            where: { email: 'user@glowny-cloth.com' }}).spread((userUser, created) => {
              UserRole.findOrCreate({
                where: { userId: userUser.id, roleId: roleShopUser.id },
                default: {
                  userId: userUser.id, roleId: roleShopUser.id
                }
              })
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
        Role.findOrCreate({ 
          defaults: {
            code: 'Shop_Super',
            title: 'Super Admin',
            type: 'shop',
            isSuper: true,
          },
          where: {code: 'Shop_Super'} 
        }).spread((adminShop, created) => {
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
            where: { email: 'super@daniel-shop.com' }}).spread((userDanielSuper, created) => {
              UserRole.findOrCreate({
                where: { userId: userDanielSuper.id, roleId: adminShop.id },
                default: {
                  userId: userDanielSuper.id, roleId: adminShop.id
                }
              })
            })
        })
        
      }
    })
  }
}