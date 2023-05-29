function printProducts(pList, pDom, pBoton = true) { //añado un parametro opcional de pBoton que por defecto es true para que se cree. si es false no se creará.
    pDom.innerHTML = "";
    pList.forEach(product => printOneProduct(product, pDom, pBoton));
}

// <li>Nombre - 123€ <button>Añadir</button> </li> 
function printOneProduct(pProduct, pDom, pBoton) {
    const li = document.createElement('li');

    const button = document.createElement('button');
    if (pBoton) { //si existe el valor de pBoton se creara, sino no.
        button.textContent = 'Añadir';
        button.dataset.id = pProduct.id;
        button.addEventListener('click', addCart);
    }

    const textli = document.createTextNode(`${pProduct.title} - ${pProduct.price}€`);

    if (pBoton) { //si existe el valor de pBoton se creará, sino no.
        li.append(textli, button);
    } else {
        li.append(textli);
    }

    pDom.appendChild(li);
}

function addCart(event) {
    // alert(event.target.dataset.id)
    // Con el id saco el objeto del array, ese objeto lo meto en un array carrito que guardo en el localStorage.

    //forma larga facil:
    // let carrito = [];
    // if (localStorage.getItem('carrito')) {
    //     const carrito = JSON.parse(localStorage.getItem('carrito'));
    // } else {
    //     carrito = [];
    // }
    //forma pro:
    const carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : []; //si localStorage.getItem('carrito') existe, tienes que meter en carrito el JSON.parse() del valor del local storage y si no, tienes que meter un array vacio(pk sino en vez de ser un array es un null el tipo de dato.)


    let objetoComprado = productos.find(producto => producto.id === parseInt(event.target.dataset.id)); // si me salen 1, 2, 3, y 4 y yo se que existen esos id, pero no me funciona, pensar:z
    //estare recibiendo el tipo d dato que creo? hacer un typeof dato.

    carrito.push(objetoComprado);
    // Array y objetos no se pueden guardar en localstorage si no se convierten a texto. 
    //Para ello usaremos la funcion: JSON.stringify
    localStorage.setItem('carrito', JSON.stringify(carrito));



}