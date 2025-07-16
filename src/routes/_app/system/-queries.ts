import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex/_generated/api";
import { queryOptions } from "@tanstack/react-query";

const GC_TIME = 1000 * 60 * 5

export const fetchClassesQueryOptions = () => {
    return queryOptions({
        ...convexQuery(api.classes.getAll, {}),
        gcTime: GC_TIME,
    })
}