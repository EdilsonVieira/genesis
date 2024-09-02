exports.up = function(knex) {
    return knex.schema.createTable('config', function(table) {
      table.increments('id');
      table.integer('owner').nullable();
      table.foreign('owner').references('users.id');
      table.string('chave').notNullable();
      table.json('valor').nullable();
      table.timestamps(true, true);
    })
    .then(function() {
        // Inserir uma linha após a criação da tabela
        return knex('config').insert({
            owner: null,           
            chave: 'systemConfig',  
            valor: JSON.stringify({ "appName": "Seu App" }), 
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        });
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('config');
 };
  