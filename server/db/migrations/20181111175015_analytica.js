exports.up = function(knex, Promise) {
  return knex
    .raw(
      `
    CREATE TABLE IF NOT EXISTS hod
      (
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR (50)
      );

    CREATE TABLE IF NOT EXISTS teacher
      (
        hod_id bigint NOT NULL,

        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR (50),
        FOREIGN KEY(hod_id) REFERENCES hod(id)
      );

    CREATE TABLE IF NOT EXISTS student
      (
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR (50)
      );

    CREATE TABLE IF NOT EXISTS subject
      (
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR (100) NOT NULL,
        sections VARCHAR[]
      );

    CREATE TABLE IF NOT EXISTS assessment
      (
        subject_id bigint NOT NULL,
      
        id SERIAL NOT NULL PRIMARY KEY,
        type VARCHAR (100) NOT NULL,
        name VARCHAR (100) NOT NULL,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP,
        total_score INT NOT NULL,
        FOREIGN KEY(subject_id) REFERENCES subject(id)
      );

    CREATE TABLE IF NOT EXISTS assessment_section
      (
        assessment_id bigint NOT NULL,
      
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR (100) NOT NULL,
        mark_contribution INT NOT NULL,
        FOREIGN KEY(assessment_id) REFERENCES assessment(id)
      );

    CREATE TABLE IF NOT EXISTS subject_student_teacher
      (
        subject_id bigint NOT NULL,
        student_id bigint NOT NULL,
        teacher_id bigint NOT NULL,

        PRIMARY KEY (subject_id, student_id, teacher_id),  
        UNIQUE (student_id, teacher_id)
      );`
    )
    .then(() => {});
};

exports.down = function resetDB(knex, Promise) {
  return Promise.all([
    knex.raw(`DROP SCHEMA IF EXISTS public CASCADE`),
    knex.raw(`CREATE SCHEMA IF NOT EXISTS public;`)
  ]);
};
