const { supervisors = [] } = require('../data/data');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all(supervisors.map(supervisor => knex('supervisor')
    .insert({ 'supervisor_name': supervisor.supervisor_name || 'God' })
    .then(() => { })))
}

