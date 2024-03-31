import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.uuid('session_id').after('id').index()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.dateTime('meal_datetime').notNullable()
    table.boolean('in_diet').notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
