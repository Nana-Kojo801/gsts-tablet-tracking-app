import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

import { query } from "./_generated/server"

export const getAllData = query({
  handler: async (ctx) => {
    // Fetch all raw data in parallel
    const [users, students, programmes, classes, tablets, submissions, confiscations] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db.query("students").collect(),
      ctx.db.query("programmes").collect(),
      ctx.db.query("classes").collect(),
      ctx.db.query("tablets").collect(),
      ctx.db.query("submissions").collect(),
      ctx.db.query("confiscations").order("desc").collect()
    ])

    // Server-side computation - even faster!
    const programmeMap = new Map(programmes.map(p => [p._id, p.name]))
    const classMap = new Map(classes.map(c => [c._id, c.name]))
    const tabletMap = new Map(tablets.map(t => [t._id, t]))
    const userMap = new Map(users.map(u => [u._id, u]))

    const processedStudents = students.map((student) => {
      const programme = programmeMap.get(student.programmeId)
      const className = classMap.get(student.classId)
      const tablet = student.tabletId ? tabletMap.get(student.tabletId) || null : null
      
      return { 
        ...student, 
        tablet, 
        programme, 
        class: className 
      }
    })

    const studentMap = new Map(processedStudents.map(s => [s._id, s]))

    const processedSubmissions = submissions.map((submission) => {
      const student = studentMap.get(submission.studentId)!
      const receivedBy = userMap.get(submission.receivedById)!
      return { ...submission, student, receivedBy }
    })

    const studentCountByClass = new Map<Id<"classes">, number>()
    processedStudents.forEach(student => {
      const count = studentCountByClass.get(student.classId) || 0
      studentCountByClass.set(student.classId, count + 1)
    })

    const processedClasses = classes.map((classEntry) => ({
      ...classEntry,
      students: studentCountByClass.get(classEntry._id) || 0,
    }))

    const confiscationHistoryCount = new Map<Id<"students">, number>()
    confiscations.forEach(confiscation => {
      const count = confiscationHistoryCount.get(confiscation.studentId) || 0
      confiscationHistoryCount.set(confiscation.studentId, count + 1)
    })

    const processedConfiscations = confiscations.map(confiscation => ({
      ...confiscation,
      student: studentMap.get(confiscation.studentId)!,
      history: confiscationHistoryCount.get(confiscation.studentId) || 0
    }))

    return {
      users,
      students: processedStudents,
      programmes,
      classes: processedClasses,
      tablets,
      submissions: processedSubmissions,
      confiscations: processedConfiscations,
    }
  }
})

export const clearAll = mutation({
  handler: async (ctx) => {
    // List all tables to clear
    const tables = [
      "students",
      "tablets",
      "submissions",
      "classes",
      "programmes",
    ] as const;

    // For each table, fetch all documents and delete them
    await Promise.all(
      tables.map(async (table) => {
        const docs = await ctx.db.query(table).collect();
        await Promise.all(
          docs.map((doc) => ctx.db.delete(doc._id))
        );
      })
    );
  },
});