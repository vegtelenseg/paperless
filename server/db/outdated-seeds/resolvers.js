const joinMonster = require('join-monster').default;
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const getStudentById = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () => knex('student').where('id', '=', args.id));

const getAllStudents = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () => knex.raw(`SELECT * FROM student`));

const getTeacherById = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () => knex('teacher').where('id', '=', args.id));

const getAllTeachers = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () => knex.raw(`SELECT * FROM teacher`));

const getStudentTakingSubjectTaughtBy = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () =>
    knex.raw(`
    select DISTINCT subject.name, student.name, teacher.name from subject_student_teacher
    join subject
    on subject_student_teacher.subject_id = 6
    join student
    on student.id = subject_student_teacher.student_id
    join teacher
    on teacher.id = subject_student_teacher.teacher_id
  `)
  );

const getAllSubjects = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () => knex.raw(`SELECT * FROM subject`));

module.exports = {
  getStudentById,
  getTeacherById,
  getStudentTakingSubjectTaughtBy,
  getAllStudents,
  getAllTeachers,
  getAllSubjects
};
