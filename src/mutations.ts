import { useConvexMutation } from "@convex-dev/react-query"
import { api } from "@convex/_generated/api"
import { useMutation } from "@tanstack/react-query"

export const useCreateClassMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.classes.create)
    })
}

export const useEditClassMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.classes.update)
    })
}

export const useDeleteClassMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.classes.remove)
    })
}

// Students
export const useCreateStudentMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.students.create)
    })
}

export const useEditStudentMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.students.update)
    })
}

export const useDeleteStudentMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.students.remove)
    })
}

export const useImportStudentsMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.students.importAll)
    })
}

// Tablets
export const useCreateTabletMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.tablets.create)
    })
}

export const useEditTabletMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.tablets.update)
    })
}

export const useDeleteTabletMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.tablets.remove)
    })
}

// Programmes
export const useCreateProgrammeMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.programmes.create)
    })
}

export const useEditProgrammeMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.programmes.update)
    })
}

export const useDeleteProgrammeMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.programmes.remove)
    })
}

// Users
export const useCreateUserMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.users.create)
    })
}

export const useEditUserMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.users.update)
    })
}

export const useDeleteUserMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.users.remove)
    })
}

// Submissions
export const useCreateSubmissionMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.submissions.create)
    })
}

export const useDeleteSubmissionMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.submissions.remove)
    })
}

// Distributions
export const useCreateDistributionMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.distributions.create)
    })
}

export const useDeleteDistributionMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.distributions.remove)
    })
}

export const useClearAllDataMutation = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.data.clearAll)
    })
}