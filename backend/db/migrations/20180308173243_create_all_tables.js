exports.up = knex =>
  knex.schema
    .createTable('Organisation', table => {
      table.increments('id').primary();
      table.string('org_name');
      table.string('website');
    })
    .createTable('Branch', table => {
      table.increments('id').primary();
      table
        .integer('org_id')
        .unsigned()
        .references('id')
        .inTable('Organisation')
      table.string('borough')
      table.string('project')
      table.string('tag');
    })
    .createTable('Service', table => {
      table.increments('id').primary();
      table
        .integer('branch_id')
        .unsigned()
        .references('id')
        .inTable('Branch');
      table.string('service_days');
      table.string('process');
      table.string('service');
    })
    .createTable('Categories', table => {
      table.increments('id').primary();
      table
        .integer('service_id')
        .unsigned()
        .references('id')
        .inTable('Service');
      table.string('cat_name');
    })
    .createTable('Address', table => {
      table.increments('id').primary();
      table
        .integer('branch_id')
        .unsigned()
        .references('id')
        .inTable('Branch');
      table.string('address_line');
      table.string('area');
      table.string('postcode');
      table.string('email_address');
      table.string('telephone');
    })
    .createTable('Location', table => {
      table.increments('id').primary();
      table
        .integer('address_id')
        .unsigned()
        .references('id')
        .inTable('Address');
      table.string('lat');
      table.string('long');
    })
    .createTable('Users', table => {
      table.increments('id').primary();
      table.string('email');
      table.string('organisation');
      table.string('fullname');
      table.string('salt_password');
      table.date('last_updated');
      table.string('role');
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('Organisation')
    .dropTableIfExists('Branch')
    .dropTableIfExists('Service')
    .dropTableIfExists('Categories')
    .dropTableIfExists('Address')
    .dropTableIfExists('Location')
    .dropTableIfExists('Users');
