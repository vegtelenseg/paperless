const { courses = [] } = require('../data/data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all(
    courses.map(course =>
      knex('subject')
        .insert({
          name: course.course_name || 'Physics'
        })
        .then(() => {})
    )
  );
};
