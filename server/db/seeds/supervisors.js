const { supervisors = [] } = require('../data/data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('supervisor').del()
    .then(function () {
      if (supervisors.length > 0) {
        supervisors.forEach((supervisor, idx) => knex('supervisor')
            .insert({ supervisor_name: supervisor })
              .delay(100)
        );
      }
    });
};
