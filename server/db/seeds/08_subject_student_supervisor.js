const { students = [], courses = [], supervisors = [] } = require('../data/data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  const max = Math.max(students.length, supervisors.length, courses.length);
  for (let i = 0; i < max; i++) {
    return Promise.all([
      knex('subject_student_supervisor')
        .insert({
          sss_subject_id: courses[i % (courses.length - 1)].course_id,
          sss_student_id: students[i % (students.length - 1)].student_id,
          sss_supervisor_id: supervisors[i % (supervisors.length - 1)].supervisor_id
        })
        .then(() => {})
    ]);
  }
};
