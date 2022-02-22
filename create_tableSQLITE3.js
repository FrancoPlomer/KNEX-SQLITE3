const optionsSQLITE = require('./options/SQLite3')
const knex = require('knex')(optionsSQLITE)

knex.schema.createTable('ecommerce', table => {
    table.increments('id')
    table.string('mensaje')
}).then(() => {
    console.log("Table created")
}).catch((err) => {
    console.log(err)
}).finally(() => {
    knex.destroy()
})