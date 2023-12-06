exports.seed = function(knex) {
    return knex('animals')
      .truncate()
      .then(function() {
        return knex('animals').insert([
          { name: 'horse', classification: "mammal" },
          { name: 'turtle', classification: "reptile" },
          { name: 'frog', classification: "amphibian" },
          { name: 'great white shark', classification: "fish" },
        ]);
      });
  };