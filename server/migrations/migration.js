const { knex }  = require('../config/config');
const {teachers} = require('../config/config-data/config-data.dummy');
function addTeachers(teachers = []) {
  if (teachers.length > 0) {
    teachers.forEach(teacher => knex('teacher').insert({teacher_name: teacher}).delay(500))
  }
}

function addStudents(students = []) {
  if (students.length > 0) {
    console.log(students)
    students.forEach(student => knex('student').insert({student_name: student}).delay(500))
  }
}

function addCourses(courses = []) {
  if (courses.length > 0) {
    courses.forEach(course =>  knex('subject').insert({subject_name: course}).delay(500));
  }
}

function addSupervisor(supervisors = []) {
  if (supervisors.length > 0) {
    supervisors.forEach((supervisor, idx) => {
      const supervisee = idx;
      knex('supervisor').insert({supervisor_name: supervisor})
    })
  }
}

function addSupervises() {
  let i = -1;
  while (500 > ++i) {
    knex.raw(`
    UPDATE teacher
    SET supervisor_fk = ${Math.ceil(Math.random() * 10)}
    WHERE teacher.teacher_id = ${i + 1}
  `).delay(300)
  }
}

function addSubjectTeacher() {
  teachers.forEach((teacher, idx) => {
    knex.raw(`
    INSERT INTO subject_teacher(st_subject_id, st_teacher_id)
    VALUES(${(idx +1)}, ${(idx + 1)})`).delay(500)
  })
}

addSubjectTeacher()
module.exports = {
  addStudents,
  addTeachers,
  addCourses,
  addSupervises
}
