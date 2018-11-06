const { assessment_sections = [] } = require('../data/data');

exports.seed = function (knex, Promise) {
  const sectionKeys = Object.keys(assessment_sections);
  // Deletes ALL existing entries
  return Promise.all(sectionKeys.map((sectionKey, idx) => {
    const { assessment_section_name, assessment_section_mark_contribution } = assessment_sections[sectionKey][idx];
    return knex('assessment_section')
      .insert({
        assessment_section_name,
        assessment_section_mark_contribution,
        assessment_section_assessment_id: idx + 1
      })
      .then(() => { })
  }))
}