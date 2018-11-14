const { students = [], courses = [], hods = [] } = require('../data/data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  const max = Math.max(students.length, hods.length, courses.length);
  const knexPromises = Array(max).fill(null);
  for (let i = 0; i < max; i++) {
    knexPromises.push(
      knex('subject_student_teacher')
        .insert({
          subject_id: courses[i % (courses.length - 1)].course_id,
          student_id: students[i % (students.length - 1)].student_id,
          teacher_id: hods[i % (hods.length - 1)].supervisor_id
        })
        .then(() => {})
    );
  }
  return Promise.all(knexPromises);
};
