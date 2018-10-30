const { students = [] } = require('../data/data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('student').del()
    .then(function () {
      if (students.length > 0) {
        students.forEach(student => knex('student')
          .insert({ student_name: student })
            .delay(100));
      }
    });
};
