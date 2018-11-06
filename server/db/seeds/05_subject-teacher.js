const { teachers = [], courses } = require('../data/data');
const reversedCourses = courses.reverse();

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all(teachers.map((teacher, idx) => knex('subject_teacher')
    .insert({
      st_subject_id: reversedCourses[idx % 9].course_id,
      st_teacher_id: teacher.teacher_id
    })
    .then(() => { })))
}