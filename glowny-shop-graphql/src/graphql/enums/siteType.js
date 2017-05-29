import {GraphQLEnumType} from 'graphql'

var siteType = new GraphQLEnumType({
  name: 'Site',
  values: {
    admin: { value: 'admin' },
    shop: { value: 'shop' },
    member: { value: 'member' }
  }
})

export default siteType 