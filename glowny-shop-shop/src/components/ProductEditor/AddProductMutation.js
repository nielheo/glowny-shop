import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation AddProductMutation (
    $input: AddProductInput!
  ) {
      addProduct(input: $input) 
      {
        id
        sku
        name
        description
        curr
        price
        isActive
      }
    }
`

function commit(environment, input) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: { input: input },
      onComplete: 
        console.log('Add Product Mutation complete'),
    }
  )
}

export default commit