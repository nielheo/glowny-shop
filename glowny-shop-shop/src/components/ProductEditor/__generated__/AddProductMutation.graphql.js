/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule AddProductMutation.graphql
 * @generated SignedSource<<1039598cdbf433d438876e4500677948>>
 * @relayHash 75d0d74c747b58a5a08e8dc38bef442f
 * @flow
 * @nogrep
 */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AddUserInput = {
  email?: ?string;
  firstName?: ?string;
  lastName?: ?string;
  type?: ?"admin" | "shop" | "member";
  shopCode?: ?string;
  roles?: ?string;
};

export type AddProductMutationResponse = {
  id?: ?string;
  email?: ?string;
  firstName?: ?string;
  lastName?: ?string;
  isActive?: ?boolean;
  roles?: ?Array<?AddProductMutationResponse_roles>;
};

export type AddProductMutationResponse_roles = {
  id?: ?string;
  title?: ?string;
};
*/

/* eslint-disable comma-dangle, quotes */

/*
mutation AddProductMutation(
  $input: AddUserInput!
) {
  addUser(input: $input) {
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
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "AddUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddProductMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "AddUserInput!"
          }
        ],
        "concreteType": "User",
        "name": "addUser",
        "plural": false,
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
            "name": "email",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "firstName",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "lastName",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "isActive",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AddProductMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "AddUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AddProductMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "AddUserInput!"
          }
        ],
        "concreteType": "User",
        "name": "addUser",
        "plural": false,
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
            "name": "email",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "firstName",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "lastName",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "isActive",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation AddProductMutation(\n  $input: AddUserInput!\n) {\n  addUser(input: $input) {\n    id\n    email\n    firstName\n    lastName\n    isActive\n    roles {\n      id\n      title\n    }\n  }\n}\n"
};

module.exports = batch;
