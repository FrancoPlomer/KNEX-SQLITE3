const optionsMaria = require('./options/mariaDB');
const knex = require('knex')(optionsMaria);
const optionsSQLITE = require('./options/SQLite3')
const knex2 = require('knex')(optionsSQLITE)
const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer} = require('http');
const exphbs = require("express-handlebars");


const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer);

const PORT = 8080 || process.env.PORT;

let productos = {}
app.engine(
    "hbs",
    exphbs.engine(
        {
            extname: "hbs",
            defaultLayout: 'index.hbs',
        }
    )
)

app.set('views','./views');
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
    }))
app.get('/', (req, res) => {
    res.render('datos.hbs');
})

async function addProducts(productos) {
    const allOfMyProducts = await knex('productos').insert(productos)
        .then(async () => {
            console.log("data inserted")
            async function allProducts () {
                const allOfMyProducts = await knex.from('productos').select('*')
                .then((rows) => {
                    const productosTotal = rows.reduce((rowacc, row) => 
                    {
                        return rowacc = [...rowacc, row]
                    }
                    , [])
                    return productosTotal;
                })
                .catch((err) => console.log(err))       
                
                return allOfMyProducts;
            }
            const totalProducts = await allProducts();
        return totalProducts;
        })
        .catch((err) => console.log(err))
    return allOfMyProducts;
}

async function addMessages(message) {
    const allOfMyMessages = await knex2('ecommerce').insert(message)
        .then(async () => {
            console.log("message inserted")
            async function allMessages () {
                const allOfMyMessages = await knex2.from('ecommerce').select('*')
                .then((rows) => {
                    const MessagesTotal = rows.reduce((rowacc, row) => 
                    {
                        return rowacc = [...rowacc, row]
                    }
                    , [])
                    return MessagesTotal;
                })
                .catch((err) => console.log(err))       
                
                return allOfMyMessages;
            }
            const totalMessages = await allMessages();
            return totalMessages;
        })
        .catch((err) => console.log(err))
    return allOfMyMessages;
}

io.on('connection', (socket) => {
    console.log("Usuario conectado");
    socket.emit('Bienvenido','Hola usuario.')
    socket.on('producto', async(data) => {
        productos = {
            name: data.title,
            price: data.price,
            url: data.url,
        }
        let allOfProducts = await addProducts(productos);
        allOfProducts.map((product) =>
        {
            io.sockets.emit('productos', product);
        }
        )
    })
    socket.on('usuario', data => {
        io.sockets.emit('usuarios', data);
    })
    socket.on('mensaje', async(data) => {
        const newMessage = {
            mensaje: data
        }
        let AllofMyMessages = await addMessages(newMessage);
        AllofMyMessages.map((message) =>
        {
            io.sockets.emit('mensajes', message.mensaje);
        })
    })
})

const connectedServer = httpServer.listen(PORT, function () {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`);
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))