
const Socket = io.connect();
let allDataProduct = {
    title: "",
    price: "",
    url: "",
}
let user = "";
let mensaje = "";
//productos

const inputNombre = document.getElementById("nombreProducto");
const inputPrice = document.getElementById("precioProducto");
const inputUrl = document.getElementById("urlProducto");
const form = document.getElementById("formProduct");

inputNombre.addEventListener("input", () => {
    allDataProduct = {
        ... allDataProduct,
        title: inputNombre.value,
    }
})

inputPrice.addEventListener("input", () => {
    allDataProduct = {
        ... allDataProduct,
        price: inputPrice.value,
    }
})

inputUrl.addEventListener("input", () => {
    allDataProduct = {
        ... allDataProduct,
        url: inputUrl.value
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    Socket.emit('producto', allDataProduct);
})

Socket.on('productos', data => {

        const containerRow = document.createElement("tr");

        const title = document.createElement("td");
        
        title.textContent = `${data.title}`

        containerRow.appendChild(title);
        
        const price = document.createElement("td");

        price.textContent = `$ ${data.price}`

        containerRow.appendChild(price);

        const imageContainer = document.createElement("td");
        const image = document.createElement("img");

        image.src = `${data.url}`

        imageContainer.appendChild(image);

        containerRow.appendChild(imageContainer);

        document.getElementById("contentTable").appendChild(containerRow);
})

//productosEnd

//Mensajes

const usuario = document.getElementById("nombreUsuario");
usuario.addEventListener("input", () => {
    user = usuario.value;
})

const formUser = document.getElementById("formUser");
formUser.addEventListener("submit", (e) => {
    e.preventDefault();
    Socket.emit('usuario', user);
})

Socket.on('usuarios', data => {
    document.getElementById("formUser").style.display = "none";
    document.getElementById("contentMessages").style.display = "block";
});

const Mensaje = document.getElementById("mensajeUsuario");
Mensaje.addEventListener("input", () => {
    mensaje = Mensaje.value;
})

const formMessage = document.getElementById("formMessage");
formMessage.addEventListener("submit", (e) => {
    e.preventDefault();
    Socket.emit('mensaje', mensaje);
})

Socket.on('mensajes', data => {
    const hoy = new Date();
    const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    const fechaYHora = fecha + ' ' + hora;

    const allMessages = document.getElementById("contentMessages_body");

    const usuario = document.createElement("strong");
    usuario.textContent = `${fechaYHora} - ${user}:`

    const mensaje = document.createElement("p");
    mensaje.textContent = `${data}`;

    allMessages.appendChild(usuario);
    allMessages.appendChild(mensaje);

})