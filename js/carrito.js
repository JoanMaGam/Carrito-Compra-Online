//Recordar que si el localStorage no tiene datos, arroja un 'null'. Eso hay que tenerlo en cuenta cuando pidamos datos al localStorage.
const carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : [];

const ulCarrito = document.querySelector('.carrito');
const divPrecioTotal = document.querySelector('.precioTotal');


printProducts(carrito, ulCarrito, false);


function calcularPrecioTotal(pCarrito, pDom) {

    let precioTotal = 0;
    pCarrito.forEach(element => {
        precioTotal += element.price;
    });

    pDom.innerText = 'Precio total: ' + precioTotal + ' €';
}
calcularPrecioTotal(carrito, divPrecioTotal);

const btnVaciar = document.querySelector('#vaciar');
btnVaciar.addEventListener('click', deleteCart);

function deleteCart(event) {
    localStorage.clear(); //esto es para limpiar el localStorage.
    carrito.length = 0; //hacemos esto para vaciar el array. Si hago esto : carrito = []; , lo podria vaciar si fuera una variable pero es un const con lo cual no puedo y ademas si fuera let me lo podrian modificar a otra cosa que no fuera un array por eso utilizamos este otra metodo para vaciar el array. En este caso al ser const, no puedo modificar ese objeto pero si puedo modificar sus propiedades como el .length..
    printProducts(carrito, ulCarrito, false);
    calcularPrecioTotal(carrito, divPrecioTotal);
}

function delProduct(event) {
    //Saco el array del localStorage
    const carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : [];

    //Borrado interfaz
    const liDel = event.target.parentNode;
    liDel.parentNode.removeChild(liDel);

    //Borrado array
    deleteArray(parseInt(event.target.dataset.id), carrito);

    // Vuelvo a guardar el array sin el objeto eliminado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    printProducts(carrito, ulCarrito, false);
    calcularPrecioTotal(carrito, divPrecioTotal);
}

function deleteArray(pId, pList) {
    let position = pList.findIndex(product => product.id === pId);
    if (position !== -1) {
        pList.splice(position, 1);
    }
    return pList;
}

