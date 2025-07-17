import { Doc } from '../../_generated/dataModel'
import { QueryCtx } from '../../_generated/server'

export const getAllStudentProps = async (
  ctx: QueryCtx,
  students: Doc<'students'>[],
) => {
  return await Promise.all(
    students.map(async (student) => {
      const [studentProgramme, studentClass] = await Promise.all([
        ctx.db.get(student.programmeId),
        ctx.db.get(student.classId),
      ])

      if(!studentProgramme || !studentClass) {
        throw new Error('Student programme or class not found')
      }
      return {...student, programme: studentProgramme.name, class: studentClass.name, tablet: student.tabletId ? "Received" : "Not assigned" }
    }),
  )
}
