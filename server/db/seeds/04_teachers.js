const { teachers = [], supervisors } = require('../data/data');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all(
    teachers.map((teacher, idx) => {
      const supervisor = supervisors[(idx + 1) % (teachers.length - 1)];
      return knex('teacher').insert({
        teacher_name: teacher.teacher_name,
        supervisor_id: supervisor && supervisor.supervisor_id || 304
      }) 
    }))
};