import React from 'react';

import {
  graphql,
  createFragmentContainer
} from 'react-relay';


const Feed = createFragmentContainer(
  ({ data }) => (
    <ol>
      {data.map(entry => (
        <li key={`${entry.repository.owner.login}/${entry.repository.name}`}>
          
        </li>
      ))}
    </ol>
  ),
  graphql`
    fragment Feed on Viewer {
      users(type: admin) {
        id
      }

    }
  `
)

export default Feed;
