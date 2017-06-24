/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule ProductAdd_viewer.graphql
 * @generated SignedSource<<0a6c6108abe93cd53b00749ddec0a0c0>>
 * @flow
 * @nogrep
 */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type ProductAdd_viewer = {
  shops?: ?Array<?ProductAdd_viewer_shops>;
};

export type ProductAdd_viewer_shops = {
  id?: ?string;
  systemCurr?: ?string;
};
*/

/* eslint-disable comma-dangle, quotes */

const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "shopCode",
      "type": "String!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductAdd_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "code",
          "variableName": "shopCode",
          "type": "String!"
        }
      ],
      "concreteType": "Shop",
      "name": "shops",
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
          "name": "systemCurr",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;