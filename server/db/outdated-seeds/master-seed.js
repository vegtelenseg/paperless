const { courses = [], students = [], supervisors = [], teachers = [] } = require('../data/data');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all(
    courses.map(course =>
      knex('subject')
        .insert({ subject_name: course })
        .then(() => {
          students.map(student =>
            knex('student')
              .insert({ student_name: student })
              .then(() => {
                supervisors.map(supervisor =>
                  knex('supervisor')
                    .insert({ supervisor_name: supervisor })
                    .then(() => {
                      teachers.map((teacher, idx) =>
                        knex('teacher')
                          .insert({
                            teacher_name: teacher,
                            supervisor_id: knex
                              .select('supervisor_id')
                              .from('supervisor')
                              .where({
                                supervisor_id: ++idx
                              })
                              .then(() => {})
                          })
                          .then(() => {
                            teachers.map((teacher, idx) =>
                              knex('subject_teacher')
                                .insert({
                                  st_subject_id: ++idx % 8,
                                  st_teacher_id: knex
                                    .select('teacher_id')
                                    .from('teacher')
                                    .where({
                                      teacher_name: teacher
                                    })
                                    .then(() => {})
                                })
                                .then(() => {})
                            );
                          })
                      );
                    })
                );
              })
          );
        })
    )
  );
};
