import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation UpdateUserActiveMutation (
    $input: UpdateUserActiveInput!
  ) {
      updateUserActive(input: $input) 
      {
        id
        email
        firstName
        lastName
        isActive
        roles {
          id
          title
        }
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