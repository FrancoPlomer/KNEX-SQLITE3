const optionsMaria = require('./options/mariaDB');
const knex = require('knex')(optionsMaria)

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('name')
    table.string('price')
    table.string('url')
}).then(() => {
    console.log("Table created")
}).catch((err) => {
    console.log(err)
}).finally(() => {
    knex.destroy()
})