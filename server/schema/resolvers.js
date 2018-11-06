const joinMonster = require('join-monster').default;
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);

const getStudentById = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () => knex('student').where('student_id', '=', args.id));

const getTeacherById = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () => knex('teacher').where('teacher_id', '=', args.id));

module.exports = {
  getStudentById,
  getTeacherById
};
