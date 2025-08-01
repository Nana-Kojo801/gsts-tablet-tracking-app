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
import type * as confiscations from "../confiscations.js";
import type * as data from "../data.js";
import type * as models_class from "../models/class.js";
import type * as models_confiscation from "../models/confiscation.js";
import type * as models_programme from "../models/programme.js";
import type * as models_student from "../models/student.js";
import type * as models_submission from "../models/submission.js";
import type * as models_tablet from "../models/tablet.js";
import type * as models_user from "../models/user.js";
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
  confiscations: typeof confiscations;
  data: typeof data;
  "models/class": typeof models_class;
  "models/confiscation": typeof models_confiscation;
  "models/programme": typeof models_programme;
  "models/student": typeof models_student;
  "models/submission": typeof models_submission;
  "models/tablet": typeof models_tablet;
  "models/user": typeof models_user;
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
