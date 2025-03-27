/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {title: 'Mean Girls', watched: false},
    {title: 'Hackers', watched: false},
    {title: 'The Grey', watched: false},
    {title: 'Sunshine', watched: false},
    {title: 'Ex Machina', watched: false}
  ]);
};
