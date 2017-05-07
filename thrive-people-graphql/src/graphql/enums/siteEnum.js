import {GraphQLEnumType} from 'graphql'

var siteType = new GraphQLEnumType({
  name: 'Site',
  values: {
    admin: { value: 'admin' },
    supplier: { value: 'supplier' },
    client: { value: 'client' }
  }
})

export default siteType 