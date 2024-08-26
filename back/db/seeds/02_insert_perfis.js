exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('perfil').del()
      .then(function () {
        // Inserts seed entries
        return knex('perfil').insert([
          { perfil: 'Admin', menu: JSON.stringify({ /* seu menu aqui */ }) },
          { perfil: 'Gerencial', menu: JSON.stringify({ /* seu menu aqui */ }) },
          { perfil: 'Operacional', menu: JSON.stringify({ /* seu menu aqui */ }) }
        ]);
      });
  };
  