export default function SeedUserRole (db, env) {
   
  var User = db['User']
  var Role = db['Role']
  var Shop = db['Shop']
  var UserRole = db['User_Role']
  var UserShop = db['User_Shop']

  if (env === 'test') {
    Shop.findOrCreate({ 
      defaults: {
        code: 'Glowny_Cloth',
        name: 'Glowny Clothing',
        isActive: false,
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
              console.log('============')
              console.log(user.id)
              UserRole.findOrCreate({
                where: { userId: user.id, roleId: adminShop.id },
                default: {
                  userId: user.id, roleId: adminShop.id
                }
              })
            })
        })
      }
    })
  }
}