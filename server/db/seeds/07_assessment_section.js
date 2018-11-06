const { assessment_sections = [] } = require('../data/data');

exports.seed = function(knex, Promise) {
  const sectionKeys = Object.keys(assessment_sections);
  // Deletes ALL existing entries
  return Promise.all(
    ...sectionKeys.map((sectionKey, idx) =>
      assessment_sections[sectionKey].map(section =>
        knex('assessment_section')
          .insert({
            ...section,
            assessment_section_assessment_id: idx + 1
          })
          .then(() => {})
      )
    )
  );
};
