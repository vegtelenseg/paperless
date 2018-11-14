const { hods = [] } = require('../data/data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all(
    hods.map(supervisor =>
      knex('hod')
        .insert({ name: supervisor.supervisor_name || 'God' })
        .then(() => {})
    )
  );
};
