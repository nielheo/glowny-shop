import {commitMutation, graphql} from 'react-relay'

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

function getConfigs(id, isActive) {
  return [{
    type: 'FIELDS_CHANGE',
    UpdateUserActiveInput: {
      id: id,
      isActive: isActive,
    },
  }]
}

function getOptimisticResponse (complete, todoId, viewerId) {
  const viewerPayload = {id: viewerId}
  return {
    todo: {
      complete,
      id: todoId,
    },
    viewer: viewerPayload,
  }
}

function commit(environment, id, isActive) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {input: { id: id, isActive: isActive }},
    }
  )
}

export default commit