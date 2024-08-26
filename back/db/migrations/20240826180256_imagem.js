exports.up = function(knex) {
    return knex.schema.createTable('imagem', function(table) {
      table.increments('id');
      table.string('tipo').nullable();
      table.string('nome').nullable();
      table.binary('dados').nullable();
      table.timestamps(true, true);
    })
    .then(function() {
      return knex.schema.table('users', function(table) {
        table.integer('avatar_id').unsigned();
        table.string('nome_completo').nullable();
        table.foreign('avatar_id').references('imagem.id');
      });
    });
  };
  
exports.down = function(knex) {
    return knex.schema.table('users', function(table) {
      table.dropForeign('avatar_id');
      table.dropColumn('avatar_id');
      table.dropColumn('nome_completo');
    })
    .then(function() {
      return knex.schema.dropTableIfExists('imagem');
    });
 };
  