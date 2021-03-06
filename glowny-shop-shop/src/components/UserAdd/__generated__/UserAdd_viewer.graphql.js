/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule UserAdd_viewer.graphql
 * @generated SignedSource<<edf116928645f42e4d07fc4ecaf1dd77>>
 * @flow
 * @nogrep
 */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type UserAdd_viewer = {
  roles?: ?Array<?UserAdd_viewer_roles>;
};

export type UserAdd_viewer_roles = {
  id?: ?string;
  title?: ?string;
  isSuper?: ?boolean;
};
*/

/* eslint-disable comma-dangle, quotes */

const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserAdd_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "type",
          "value": "admin",
          "type": "Site!"
        }
      ],
      "concreteType": "Role",
      "name": "roles",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "id",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "title",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "isSuper",
          "storageKey": null
        }
      ],
      "storageKey": "roles{\"type\":\"admin\"}"
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
