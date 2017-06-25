import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation UpdateProductMutation (
    $input: UpdateProductInput!
  ) {
      updateProduct(input: $input) 
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
        console.log('Update Product Mutation complete'),
    }
  )
}

export default commit