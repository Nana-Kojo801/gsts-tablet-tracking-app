/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as AppRouteImport } from './routes/_app'
import { Route as AppIndexRouteImport } from './routes/_app/index'
import { Route as AuthLoginRouteImport } from './routes/_auth/login'
import { Route as AppSystemIndexRouteImport } from './routes/_app/system/index'
import { Route as AppSubmissionsIndexRouteImport } from './routes/_app/submissions/index'
import { Route as AppStudentsIndexRouteImport } from './routes/_app/students/index'
import { Route as AppSettingsIndexRouteImport } from './routes/_app/settings/index'
import { Route as AppReportsIndexRouteImport } from './routes/_app/reports/index'
import { Route as AppRecentSubmissionsIndexRouteImport } from './routes/_app/recent-submissions/index'

const AppRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRouteImport,
} as any)
const AppIndexRoute = AppIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRoute,
} as any)
const AuthLoginRoute = AuthLoginRouteImport.update({
  id: '/_auth/login',
  path: '/login',
  getParentRoute: () => rootRouteImport,
} as any)
const AppSystemIndexRoute = AppSystemIndexRouteImport.update({
  id: '/system/',
  path: '/system/',
  getParentRoute: () => AppRoute,
} as any)
const AppSubmissionsIndexRoute = AppSubmissionsIndexRouteImport.update({
  id: '/submissions/',
  path: '/submissions/',
  getParentRoute: () => AppRoute,
} as any)
const AppStudentsIndexRoute = AppStudentsIndexRouteImport.update({
  id: '/students/',
  path: '/students/',
  getParentRoute: () => AppRoute,
} as any)
const AppSettingsIndexRoute = AppSettingsIndexRouteImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => AppRoute,
} as any)
const AppReportsIndexRoute = AppReportsIndexRouteImport.update({
  id: '/reports/',
  path: '/reports/',
  getParentRoute: () => AppRoute,
} as any)
const AppRecentSubmissionsIndexRoute =
  AppRecentSubmissionsIndexRouteImport.update({
    id: '/recent-submissions/',
    path: '/recent-submissions/',
    getParentRoute: () => AppRoute,
  } as any)

export interface FileRoutesByFullPath {
  '/login': typeof AuthLoginRoute
  '/': typeof AppIndexRoute
  '/recent-submissions': typeof AppRecentSubmissionsIndexRoute
  '/reports': typeof AppReportsIndexRoute
  '/settings': typeof AppSettingsIndexRoute
  '/students': typeof AppStudentsIndexRoute
  '/submissions': typeof AppSubmissionsIndexRoute
  '/system': typeof AppSystemIndexRoute
}
export interface FileRoutesByTo {
  '/login': typeof AuthLoginRoute
  '/': typeof AppIndexRoute
  '/recent-submissions': typeof AppRecentSubmissionsIndexRoute
  '/reports': typeof AppReportsIndexRoute
  '/settings': typeof AppSettingsIndexRoute
  '/students': typeof AppStudentsIndexRoute
  '/submissions': typeof AppSubmissionsIndexRoute
  '/system': typeof AppSystemIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/_app': typeof AppRouteWithChildren
  '/_auth/login': typeof AuthLoginRoute
  '/_app/': typeof AppIndexRoute
  '/_app/recent-submissions/': typeof AppRecentSubmissionsIndexRoute
  '/_app/reports/': typeof AppReportsIndexRoute
  '/_app/settings/': typeof AppSettingsIndexRoute
  '/_app/students/': typeof AppStudentsIndexRoute
  '/_app/submissions/': typeof AppSubmissionsIndexRoute
  '/_app/system/': typeof AppSystemIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/login'
    | '/'
    | '/recent-submissions'
    | '/reports'
    | '/settings'
    | '/students'
    | '/submissions'
    | '/system'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/'
    | '/recent-submissions'
    | '/reports'
    | '/settings'
    | '/students'
    | '/submissions'
    | '/system'
  id:
    | '__root__'
    | '/_app'
    | '/_auth/login'
    | '/_app/'
    | '/_app/recent-submissions/'
    | '/_app/reports/'
    | '/_app/settings/'
    | '/_app/students/'
    | '/_app/submissions/'
    | '/_app/system/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren
  AuthLoginRoute: typeof AuthLoginRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexRouteImport
      parentRoute: typeof AppRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_app/system/': {
      id: '/_app/system/'
      path: '/system'
      fullPath: '/system'
      preLoaderRoute: typeof AppSystemIndexRouteImport
      parentRoute: typeof AppRoute
    }
    '/_app/submissions/': {
      id: '/_app/submissions/'
      path: '/submissions'
      fullPath: '/submissions'
      preLoaderRoute: typeof AppSubmissionsIndexRouteImport
      parentRoute: typeof AppRoute
    }
    '/_app/students/': {
      id: '/_app/students/'
      path: '/students'
      fullPath: '/students'
      preLoaderRoute: typeof AppStudentsIndexRouteImport
      parentRoute: typeof AppRoute
    }
    '/_app/settings/': {
      id: '/_app/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AppSettingsIndexRouteImport
      parentRoute: typeof AppRoute
    }
    '/_app/reports/': {
      id: '/_app/reports/'
      path: '/reports'
      fullPath: '/reports'
      preLoaderRoute: typeof AppReportsIndexRouteImport
      parentRoute: typeof AppRoute
    }
    '/_app/recent-submissions/': {
      id: '/_app/recent-submissions/'
      path: '/recent-submissions'
      fullPath: '/recent-submissions'
      preLoaderRoute: typeof AppRecentSubmissionsIndexRouteImport
      parentRoute: typeof AppRoute
    }
  }
}

interface AppRouteChildren {
  AppIndexRoute: typeof AppIndexRoute
  AppRecentSubmissionsIndexRoute: typeof AppRecentSubmissionsIndexRoute
  AppReportsIndexRoute: typeof AppReportsIndexRoute
  AppSettingsIndexRoute: typeof AppSettingsIndexRoute
  AppStudentsIndexRoute: typeof AppStudentsIndexRoute
  AppSubmissionsIndexRoute: typeof AppSubmissionsIndexRoute
  AppSystemIndexRoute: typeof AppSystemIndexRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppIndexRoute: AppIndexRoute,
  AppRecentSubmissionsIndexRoute: AppRecentSubmissionsIndexRoute,
  AppReportsIndexRoute: AppReportsIndexRoute,
  AppSettingsIndexRoute: AppSettingsIndexRoute,
  AppStudentsIndexRoute: AppStudentsIndexRoute,
  AppSubmissionsIndexRoute: AppSubmissionsIndexRoute,
  AppSystemIndexRoute: AppSystemIndexRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthLoginRoute: AuthLoginRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
