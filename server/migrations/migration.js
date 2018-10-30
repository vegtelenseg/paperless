const { knex } = require('../config/config');
const { teachers, courses, students, supervisors } = require('../config/config-data/config-data.dummy');

function addTeachers(teachers = []) {
  if (teachers.length > 0) {
    teachers.forEach((teacher, idx) => knex('teacher').insert({ teacher_name: teacher, supervisor_id: ++idx }).delay(500))
  }
}

function addStudents(students = []) {
  if (students.length > 0) {
    console.log(students)
    students.forEach(student => knex('student').insert({ student_name: student }).delay(500))
  }
}

function addCourses(courses = []) {
  if (courses.length > 0) {
    courses.forEach(course => knex('subject').insert({ subject_name: course }).delay(500));
  }
}

function addSupervisor(supervisors = []) {
  if (supervisors.length > 0) {
    supervisors.forEach((supervisor, idx) => {
      const supervisee = idx;
      knex('supervisor').insert({ supervisor_name: supervisor })
    })
  }
}

function addSupervises() {
  let i = -1;
  while (500 > ++i) {
    knex.raw(`
    UPDATE teacher
    SET supervisor_id = ${Math.ceil(Math.random() * 10)}
    WHERE teacher.teacher_id = ${i + 1}
  `).delay(300)
  }
}

function addSubjectTeacher() {
  teachers.forEach((teacher, idx) => {
    knex.raw(`
    INSERT INTO subject_teacher(st_subject_id, st_teacher_id)
    VALUES(${(idx + 1) % 9}, ${(idx + 1)})`).delay(500)
  })
}


function createSchema() {
  knex.raw(`
      CREATE TABLE IF NOT EXISTS supervisor
      (
        supervisor_id SERIAL NOT NULL UNIQUE,
        supervisor_name VARCHAR (50),
        CONSTRAINT supervisor_pk PRIMARY KEY(supervisor_id)
      );

      CREATE TABLE IF NOT EXISTS teacher(
        supervisor_id INT NOT NULL,

        teacher_id SERIAL NOT NULL,
        teacher_name VARCHAR (50),
        CONSTRAINT teacher_pk PRIMARY KEY (teacher_id),
        CONSTRAINT supervisor_id FOREIGN KEY (supervisor_id) REFERENCES supervisor(supervisor_id)
      );

      CREATE TABLE IF NOT EXISTS student
      (
        student_id SERIAL NOT NULL,
        student_name VARCHAR (50),
        CONSTRAINT student_pk PRIMARY KEY (student_id)
      );

      CREATE TABLE IF NOT EXISTS subject
      (
        subject_id SERIAL NOT NULL,
        subject_name VARCHAR (100) NOT NULL,
        CONSTRAINT subject_pk PRIMARY KEY (subject_id)
      );

      CREATE TABLE IF NOT EXISTS assessment
      (
        asub_id INTEGER NOT NULL,
      
        assessment_id SERIAL NOT NULL,
        assessment_type VARCHAR (100) NOT NULL,
        assessment_name VARCHAR (100) NOT NULL,
        assessment_start_date TIMESTAMP NOT NULL,
        assessment_end_date TIMESTAMP,
        assessment_total_score INT NOT NULL,
        CONSTRAINT assessment_id_pk PRIMARY KEY (assessment_id),
        CONSTRAINT asub_fk FOREIGN KEY (asub_id) REFERENCES subject (subject_id)
      );

      CREATE TABLE IF NOT EXISTS assessment_section
      (
        asec_assessment_id INT NOT NULL,
      
        assessment_section_id SERIAL NOT NULL,
        assessment_section_name VARCHAR (100) NOT NULL,
        assessment_section_mark_contribution INT NOT NULL,
        CONSTRAINT assessment_section_pk PRIMARY KEY (assessment_section_id),
        CONSTRAINT asec_assessment_fk FOREIGN KEY (asec_assessment_id) REFERENCES assessment (assessment_id)
      );

      CREATE TABLE IF NOT EXISTS subject_teacher
      (
        st_subject_id INTEGER NOT NULL,
        st_teacher_id INTEGER NOT NULL,

        CONSTRAINT st_subject_fk FOREIGN KEY (st_subject_id) REFERENCES subject (subject_id),
        CONSTRAINT st_teacher_fk FOREIGN KEY (st_teacher_id) REFERENCES teacher (teacher_id),
        CONSTRAINT subject_teacher_pk PRIMARY KEY (st_subject_id, st_teacher_id),  
        CONSTRAINT subject_teacher_st_uq  UNIQUE (st_subject_id, st_teacher_id)
      );

      CREATE TABLE IF NOT EXISTS subject_student_supervisor
      (
        sss_subject_id INTEGER NOT NULL,
        sss_student_id INTEGER NOT NULL,
        sss_supervisor_id INTEGER NOT NULL,

        CONSTRAINT sss_subject_fk FOREIGN KEY (sss_subject_id) REFERENCES subject (subject_id),
        CONSTRAINT sss_student_fk FOREIGN KEY (sss_student_id) REFERENCES student (student_id),
        CONSTRAINT sss_supervisor_fk FOREIGN KEY (sss_supervisor_id) REFERENCES supervisor (supervisor_id),
        CONSTRAINT subject_student_supervisor_pk PRIMARY KEY (sss_subject_id, sss_student_id, sss_supervisor_id),  
        CONSTRAINT subject_student_supervisor_sss_uq  UNIQUE (sss_subject_id, sss_student_id, sss_supervisor_id)
      );
  `).delay(0);
}

function resetDB() {

  knex.raw(`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA IF NOT EXISTS public;
  `);
}

function loadSampleData() {
  addSupervisor(supervisors);
  addTeachers(teachers);
 // addStudents(students);
  //addCourses(courses);
  //addSupervises(supervisors);
}

module.exports = {
  createSchema,
  loadSampleData,
  resetDB
}
