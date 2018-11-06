exports.up = function(knex, Promise) {
  return knex.raw(`
      CREATE TABLE IF NOT EXISTS supervisor
      (
        supervisor_id SERIAL NOT NULL PRIMARY KEY,
        supervisor_name VARCHAR (50)
      );

      CREATE TABLE IF NOT EXISTS teacher
      (
        supervisor_id bigint NOT NULL REFERENCES supervisor(supervisor_id),

        teacher_id SERIAL NOT NULL PRIMARY KEY,
        teacher_name VARCHAR (50)
      );

      CREATE TABLE IF NOT EXISTS student
      (
        student_id SERIAL NOT NULL PRIMARY KEY,
        student_name VARCHAR (50)
      );

      CREATE TABLE IF NOT EXISTS subject
      (
        subject_id SERIAL NOT NULL PRIMARY KEY,
        subject_name VARCHAR (100) NOT NULL,
        subject_sections VARCHAR[]
      );

      CREATE TABLE IF NOT EXISTS assessment
      (
        assessment_subject_id bigint NOT NULL REFERENCES subject(subject_id),
      
        assessment_id SERIAL NOT NULL PRIMARY KEY,
        assessment_type VARCHAR (100) NOT NULL,
        assessment_name VARCHAR (100) NOT NULL,
        assessment_start_date TIMESTAMP NOT NULL,
        assessment_end_date TIMESTAMP,
        assessment_total_score INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS assessment_section
      (
        assessment_section_assessment_id bigint NOT NULL REFERENCES assessment(assessment_id),
      
        assessment_section_id SERIAL NOT NULL PRIMARY KEY,
        assessment_section_name VARCHAR (100) NOT NULL,
        assessment_section_mark_contribution INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS subject_teacher
      (
        st_subject_id bigint NOT NULL REFERENCES subject(subject_id),
        st_teacher_id bigint NOT NULL REFERENCES teacher(teacher_id),

        PRIMARY KEY (st_subject_id, st_teacher_id),  
        UNIQUE (st_teacher_id)
      );

      CREATE TABLE IF NOT EXISTS subject_student_supervisor
      (
        sss_subject_id bigint NOT NULL REFERENCES subject (subject_id),
        sss_student_id bigint NOT NULL REFERENCES student (student_id),
        sss_supervisor_id bigint NOT NULL REFERENCES supervisor (supervisor_id),

        PRIMARY KEY (sss_subject_id, sss_student_id, sss_supervisor_id),  
        UNIQUE (sss_subject_id, sss_student_id, sss_supervisor_id)
      );
  `);
}

exports.down = function resetDB(knex, Promise) {
  return knex.raw(`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA IF NOT EXISTS public;
  `);
}