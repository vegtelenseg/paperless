const { assessments = [] } = require('../data/data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all(
    assessments.map((assessment, idx) =>
      knex('assessment')
        .insert({ ...assessment, subject_id: ++idx })
        .then(() => {})
    )
  );
};
