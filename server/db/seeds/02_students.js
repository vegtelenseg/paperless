const { students = [] } = require('../data/data');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all(students.map(student => knex('student')
    .insert({ 'student_name': student.student_name || 'Broskie' })
    .then(() => { })))
}

