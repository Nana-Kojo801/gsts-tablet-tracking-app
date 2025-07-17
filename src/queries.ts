import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex/_generated/api";
import { queryOptions } from "@tanstack/react-query";

const GC_TIME = 1000 * 60 * 5

export const fetchClassesQueryOptions = () => {
    return queryOptions({
        ...convexQuery(api.classes.getAll, {}),
        gcTime: GC_TIME,
        initialData: []
    })
}

export const fetchTabletsQueryOptions = () => {
    return queryOptions({
        ...convexQuery(api.tablets.getAll, {}),
        gcTime: GC_TIME,
        initialData: []
    })
}

export const fetchProgrammesQueryOptions = () => {
    return queryOptions({
        ...convexQuery(api.programmes.getAll, {}),
        gcTime: GC_TIME,
        initialData: []
    })
}

export const fetchStudentsQueryOptions = () => {
    return queryOptions({
        ...convexQuery(api.students.getAll, {}),
        gcTime: GC_TIME,
        initialData: []
    })
}

export const fetchUsersQueryOptions = () => {
    return queryOptions({
        ...convexQuery(api.users.getAll, {}),
        gcTime: GC_TIME,
        initialData: []
    })
}