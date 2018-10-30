const { teachers = [] } = require('../data/data');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('teacher').del()
    .then(function () {
      if (teachers.length > 0) {
        console.log(teachers)
        teachers.forEach((teacher, idx) => knex('teacher')
          .insert({
            supervisor_id: 2755,
            teacher_name: teacher
          }).then(val => {
            console.log({val})
          }).delay(100))
      }
    });
};
