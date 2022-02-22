class contenedorBase {
    constructor(
        client,
        connection,
        useNullAsDefault        
    ){
        this.client = client;
        this.connection = connection;
        this.useNullAsDefault = useNullAsDefault;
    }
}

const optionsSQLITE = new contenedorBase(
    'sqlite3',
    {
        filename: `${__dirname}/DB/ecommerce`
    },
    true,
)

module.exports = optionsSQLITE
