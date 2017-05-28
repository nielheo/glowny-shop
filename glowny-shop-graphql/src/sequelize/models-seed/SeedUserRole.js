export default function SeedUserRole (User, Role, UserRole, env) {

  if (env === 'development' || env === 'test') {
    Role.findOrCreate({ 
      defaults: {
        code: 'Admin_Super',
        title: 'Super Admin',
        type: 'admin',
        isSuper: true,
      },
      where: {code: 'Admin_Super'} 
    }).spread((role, created) => {
      /*console.log('=======================')
      console.log(role.get({
        plain: true
      }))
      console.log(role.id)
      console.log(created)*/
      if (role) {
        User.findOrCreate({ 
          defaults: {
            id: 'User1',
            email: 'super@glowny-shop.com',
            firstName: 'Daniel',
            lastName: 'Heo',
            type: 'admin',
            isActive: true,
            password: 'P@ssw0rd',
          },
          where: { email: 'super@glowny-shop.com' }}).spread((user, created) => {
            UserRole.findOrCreate({
              where: { userId: user.id, roleId: role.id },
              default: {
                userId: user.Id, roleId: role.Id
              }
            })
          })
      }
    })
  }

  if (env === 'test') {
    Role.findOrCreate({ 
      defaults: {
        code: 'Admin_User',
        title: 'User Admin',
        type: 'admin',
        isSuper: false,
      },
      where: {code: 'Admin_User'} 
    }).spread((adminUser, created) => {
      if (adminUser) {
        Role.findOrCreate({ 
          defaults: {
            code: 'Admin_Shop',
            title: 'Shop Admin',
            type: 'admin',
            isSuper: false,
          },
          where: {code: 'Admin_Shop'} 
        }).spread((adminShop, created) => {
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
              UserRole.findOrCreate({
                where: { userId: user.id, roleId: adminUser.id },
                default: {
                  userId: user.id, roleId: adminUser.id
                }
              })
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