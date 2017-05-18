import {commitMutation, graphql} from 'react-relay'

const mutation = graphql`
  mutation UpdateUserMutation (
    $input: UpdateUserInput!
  ) {
      updateUser(input: $input) 
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

function commit(environment, input) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: { input: input },
    }
  )
}

export default commit