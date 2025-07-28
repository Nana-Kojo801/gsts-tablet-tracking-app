import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useMutation } from '@tanstack/react-query'

export const useCreateClassMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.classes.create),
    meta: {
      successMessage: 'Class created successfully',
      errorMessage: 'Failed to create class',
    },
  })
}

export const useEditClassMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.classes.update),
    meta: {
      successMessage: 'Class updated successfully',
      errorMessage: 'Failed to update class',
    },
  })
}

export const useDeleteClassMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.classes.remove),
    meta: {
      successMessage: 'Class deleted successfully',
      errorMessage: 'Failed to delete class',
    },
  })
}

// Students
export const useCreateStudentMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.students.create),
    meta: {
      successMessage: 'Student created successfully',
      errorMessage: 'Failed to create student',
    },
  })
}

export const useEditStudentMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.students.update),
    meta: {
      successMessage: 'Student updated successfully',
      errorMessage: 'Failed to update student',
    },
  })
}

export const useDeleteStudentMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.students.remove),
    meta: {
      successMessage: 'Student deleted successfully',
      errorMessage: 'Failed to delete student',
    },
  })
}

export const useImportStudentsMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.students.importAll),
    meta: {
      successMessage: 'Students imported successfully',
      errorMessage: 'Failed to import students',
    },
  })
}

// Tablets
export const useCreateTabletMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.tablets.create),
    meta: {
      successMessage: 'Tablet created successfully',
      errorMessage: 'Failed to create tablet',
    },
  })
}

export const useEditTabletMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.tablets.update),
    meta: {
      successMessage: 'Tablet updated successfully',
      errorMessage: 'Failed to update tablet',
    },
  })
}

export const useDeleteTabletMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.tablets.remove),
    meta: {
      successMessage: 'Tablet deleted successfully',
      errorMessage: 'Failed to delete tablet',
    },
  })
}

// Programmes
export const useCreateProgrammeMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.programmes.create),
    meta: {
      successMessage: 'Programme created successfully',
      errorMessage: 'Failed to create programme',
    },
  })
}

export const useEditProgrammeMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.programmes.update),
    meta: {
      successMessage: 'Programme updated successfully',
      errorMessage: 'Failed to update programme',
    },
  })
}

export const useDeleteProgrammeMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.programmes.remove),
    meta: {
      successMessage: 'Programme deleted successfully',
      errorMessage: 'Failed to delete programme',
    },
  })
}

// Users
export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.users.create),
    meta: {
      successMessage: 'User created successfully',
      errorMessage: 'Failed to create user',
    },
  })
}

export const useEditUserMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.users.update),
    meta: {
      successMessage: 'User updated successfully',
      errorMessage: 'Failed to update user',
    },
  })
}

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.users.remove),
    meta: {
      successMessage: 'User deleted successfully',
      errorMessage: 'Failed to delete user',
    },
  })
}

// Submissions
export const useCreateSubmissionMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.submissions.create),
    meta: {
      successMessage: 'Submission created successfully',
      errorMessage: 'Failed to create submission',
    },
  })
}

export const useDeleteSubmissionMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.submissions.remove),
    meta: {
      successMessage: 'Submission deleted successfully',
      errorMessage: 'Failed to delete submission',
    },
  })
}

//Confiscations
export const useCreateConfiscationMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.confiscations.create),
    meta: {
      successMessage: 'Confiscation created successfully',
      errorMessage: 'Failed to create confiscation',
    },
  })
}

export const useUpdateConfiscationMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.confiscations.update),
    meta: {
      successMessage: 'Confiscation updated successfully',
      errorMessage: 'Failed to update confiscation',
    },
  })
}

export const useReturnDeviceMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.confiscations.returnDevice),
    meta: {
      successMessage: 'Device returned successfully',
      errorMessage: 'Failed to return device',
    },
  })
}

export const useClearAllConfiscationsMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.confiscations.removeAll),
    meta: {
      successMessage: 'All confiscations cleared successfully',
      errorMessage: 'Failed to clear all confiscations',
    },
  })
}

export const useClearAllDataMutation = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.data.clearAll),
    meta: {
      successMessage: 'All data cleared successfully',
      errorMessage: 'Failed to clear all data',
    },
  })
}
