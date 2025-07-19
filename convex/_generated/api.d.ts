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
import type * as data from "../data.js";
import type * as models_classes_classTable from "../models/classes/classTable.js";
import type * as models_programmes_programmeTable from "../models/programmes/programmeTable.js";
import type * as models_students_studentTable from "../models/students/studentTable.js";
import type * as models_submissions_submissionTable from "../models/submissions/submissionTable.js";
import type * as models_tablets_tabletTable from "../models/tablets/tabletTable.js";
import type * as models_users_helpers from "../models/users/helpers.js";
import type * as models_users_usersTable from "../models/users/usersTable.js";
import type * as programmes from "../programmes.js";
import type * as shared_validators from "../shared/validators.js";
import type * as students from "../students.js";
import type * as submissions from "../submissions.js";
import type * as tablets from "../tablets.js";
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
  data: typeof data;
  "models/classes/classTable": typeof models_classes_classTable;
  "models/programmes/programmeTable": typeof models_programmes_programmeTable;
  "models/students/studentTable": typeof models_students_studentTable;
  "models/submissions/submissionTable": typeof models_submissions_submissionTable;
  "models/tablets/tabletTable": typeof models_tablets_tabletTable;
  "models/users/helpers": typeof models_users_helpers;
  "models/users/usersTable": typeof models_users_usersTable;
  programmes: typeof programmes;
  "shared/validators": typeof shared_validators;
  students: typeof students;
  submissions: typeof submissions;
  tablets: typeof tablets;
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
