
const { courses = [] } = require('../data/data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('subject').del()
    .then(function () {
      // Inserts seed entries
      if (courses.length > 0) {
        courses.forEach(course => knex('subject')
          .insert({ subject_name: course })
            .delay(100));
      }
    });
};
