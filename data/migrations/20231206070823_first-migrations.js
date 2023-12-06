
exports.up = function(knex) {
  return knex.schema.createTable("animals", table => {
    table.increments();
    table.string("name", 100).unique().notNullable();
    table.string("classification", 100).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("animals");
};
