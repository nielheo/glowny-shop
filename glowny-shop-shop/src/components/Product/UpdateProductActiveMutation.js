import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation UpdateProductActiveMutation (
    $input: UpdateProductActiveInput!
  ) {
      updateProductActive(input: $input) 
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

function commit(environment, id, isActive) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: { input: { id: id, isActive: isActive } },
    }
  )
}

export default commit