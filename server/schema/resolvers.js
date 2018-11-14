const joinMonster = require('join-monster').default;
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const getStudentById = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () => knex('student').where('id', '=', args.id)).join();

const getTeacherById = (parent, args, context, resolveInfo) =>
  joinMonster(resolveInfo, context, () => knex('teacher').where('id', '=', args.id));

module.exports = {
  getStudentById,
  getTeacherById
};
