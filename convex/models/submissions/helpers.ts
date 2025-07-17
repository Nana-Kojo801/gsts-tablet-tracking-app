import { Doc } from '../../_generated/dataModel'
import { QueryCtx } from '../../_generated/server'
import { getAllStudentProps } from '../students/helpers'

export const getAllSubmissionProps = async (
  ctx: QueryCtx,
  submissions: Doc<'submissions'>[],
) => {
  return await Promise.all(
    submissions.map(async (submission) => {
      const student = (await ctx.db.get(submission.studentId))!

      const [students, user] = await Promise.all([
        getAllStudentProps(ctx, [student]),
        ctx.db.get(submission.receivedById),
      ])

      return { ...submissions, student: students[0], receivedBy: user }
    }),
  )
}
