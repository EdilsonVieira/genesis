const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {username: 'master', password: bcrypt.hashSync('abc321', 8)},
    {username: 'teste1', password: bcrypt.hashSync('bcd321', 8)},
    {username: 'teste2', password: bcrypt.hashSync('cde321', 8)}
  ]);
};
