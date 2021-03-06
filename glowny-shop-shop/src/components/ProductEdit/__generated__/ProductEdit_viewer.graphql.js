/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule ProductEdit_viewer.graphql
 * @generated SignedSource<<97b771e2630231f66f0533977d32d521>>
 * @flow
 * @nogrep
 */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type ProductEdit_viewer = {
  products?: ?Array<?ProductEdit_viewer_products>;
};

export type ProductEdit_viewer_products = {
  id?: ?string;
  sku?: ?string;
  name?: ?string;
  description?: ?string;
  curr?: ?string;
  price?: ?number;
  isActive?: ?boolean;
};
*/

/* eslint-disable comma-dangle, quotes */

const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "shopCode",
      "type": "String!"
    },
    {
      "kind": "RootArgument",
      "name": "id",
      "type": "String"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductEdit_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id",
          "type": "String"
        },
        {
          "kind": "Variable",
          "name": "shopCode",
          "variableName": "shopCode",
          "type": "String!"
        }
      ],
      "concreteType": "Product",
      "name": "products",
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
          "name": "sku",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "name",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "description",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "curr",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "price",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "isActive",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
