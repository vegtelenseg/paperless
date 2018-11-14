const { teachers = [], hods } = require('../data/data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all(
    teachers.map((teacher, idx) => {
      const supervisor = hods[(idx + 1) % (teachers.length - 1)];
      return knex('teacher').insert({
        name: teacher.teacher_name,
        hod_id: (supervisor && supervisor.supervisor_id) || 304
      });
    })
  );
};
