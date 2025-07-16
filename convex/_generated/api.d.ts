/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as classes from "../classes.js";
import type * as models_classes_classTable from "../models/classes/classTable.js";
import type * as models_users_helpers from "../models/users/helpers.js";
import type * as models_users_usersTable from "../models/users/usersTable.js";
import type * as shared_validators from "../shared/validators.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  classes: typeof classes;
  "models/classes/classTable": typeof models_classes_classTable;
  "models/users/helpers": typeof models_users_helpers;
  "models/users/usersTable": typeof models_users_usersTable;
  "shared/validators": typeof shared_validators;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
