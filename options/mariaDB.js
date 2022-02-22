class contenedorBase {
    constructor(
        client,
        connection,        
    )
    {
        this.client = client;
        this.connection = connection;
    }
}

const optionsMaria = new contenedorBase(
    'mysql',
    {
        host: '127.0.0.1',
        user: 'root',
        database: 'productos',
    }    
)

module.exports =  optionsMaria
