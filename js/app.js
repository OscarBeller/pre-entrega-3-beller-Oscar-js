let carrito = [];

const productos = [
  { nombre: "YERBA LA TRANQUERA", valor: 750, descripcion: " La yerba la tranquera es ideal para unos mates a media tarde para compartir con amigos", img: "recursos/la-tranquera.jpg" },
  { nombre: "YERBA MAÑANITA", valor: 560, descripcion: "Es una yerba amiga", img: "recursos/la-selva.jpg" },
  { nombre: "YERRBA NOBLEZA GAUCHA ", valor: 800, descripcion: "Es una yerba ideal para arrancar la mañana", img: "recursos/nobleza-gaucha.jpg" },
  { nombre: "PICADA VIEJA ", valor: 832, descripcion: "Como su nombre lo indica, es una yerba ideal para tomar con la vieja. Esos mates que te hacen mimos al corazon", img: "recursos/picada-vieja.jpg" },
  { nombre: "YERBA PLAYADITO", valor: 1000, descripcion: "La yerba de siempre, la que nunca te abandona.", img: "recursos/playadito-amarillo.jpg" },
  { nombre: "YERBA ROSA MONTE ", valor: 940, descripcion: "La yerba con los cortes justos de hoja, un blend muy bueno.", img: "recursos/rosamonte-brillosa.jpg" },
  { nombre: "YERBA SOL Y LLUVIA ", valor: 450, descripcion: "Es la yerba ideal para acompañar unas tortas fritas en un dia gris.", img: "recursos/sol-y-lluvia.jpg" },
  { nombre: "YERBA TARAGUI AZUL ", valor: 980, descripcion: "Yerba elaborada sin palo, ideal para que no se te desarme la montañita", img: "recursos/taragui-azul.jpg" },
];

function agregarAlCarrito(nombre, valor) {
  carrito.push({ nombre, valor });
  actualizarListaCarrito();
  mostrarModal();
  guardarCarritoEnLocalStorage();
  actualizarTotales(); // Actualizar totales al agregar un producto al carrito
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarListaCarrito();
  guardarCarritoEnLocalStorage();
  actualizarTotales(); // Actualizar totales al eliminar un producto del carrito
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  actualizarListaCarrito();
  actualizarTotales();
}

cargarCarritoDesdeLocalStorage();

function mostrarModal() {
  const modalElement = document.getElementById('carritoModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

function actualizarListaCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  listaCarrito.innerHTML = '';

  carrito.forEach(({ nombre, valor }, index) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    item.innerHTML = `
       <span class="d-flex justify-content-between align-items-start">${nombre} - $ ${valor} 
       <span class="badge bg-danger rounded-pill p-2"><span class="text-end mr-0 fas fa-trash-alt" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></span> 
       
       
    `;
    listaCarrito.appendChild(item);
  });
}

function actualizarTotales() {
  const valorTotalCarrito = carrito.reduce((total, { valor }) => total + valor, 0);
  const cantidadProductosEnCarrito = carrito.length;

  const valorTotalCarritoElement = document.getElementById('valorTotalCarrito');
  valorTotalCarritoElement.textContent = `$${valorTotalCarrito.toFixed(2)}`;

  const cantidadProductosEnCarritoElement = document.getElementById('cantidadProductosEnCarrito');
  cantidadProductosEnCarritoElement.textContent = cantidadProductosEnCarrito;

  const totalPagar = productos.reduce((total, { nombre, valor }) => {
    const cantidadEnCarrito = carrito.filter(item => item.nombre === nombre).length;
    return total + cantidadEnCarrito * valor;
  }, 0);

  const totalPagarElement = document.getElementById('totalPagar');
  totalPagarElement.textContent = `$${totalPagar.toFixed(2)}`;
}

function mostrarProductos(productosFiltrados) {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  const elementosProductos = productosFiltrados.map(({ nombre, descripcion, img, valor }) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("col-lg-3");
    divProducto.innerHTML = `
    <div class="card-body p-2">  
    <img src="${img}" class="card-img-top" alt="Imagen de ${nombre}">
    <h5 class="card-title">${nombre}
    </h5>
    <div class="precios_producto">
    <div class="precio_nuevo">$ ${valor}</div>
    <div class="precio_descripcion">${descripcion}
    </div>
      </div>

 <div class="d-grid gap-2">
 <button class="btn btn-dark p-3" onclick="agregarAlCarrito('${nombre}', ${valor})"><i class="fa-solid fa-cart-shopping"></i> Agregar a carrito</button>
</div>
 </div> 
    `;
    return divProducto;
  });

  contenedor.append(...elementosProductos);
}

function filtrarProductos() {
  const textoBusqueda = document.getElementById("buscadorProducto").value.toLowerCase();
  const productosFiltrados = productos.filter(({ nombre }) =>
    nombre.toLowerCase().includes(textoBusqueda)
  );
  mostrarProductos(productosFiltrados);
}

document.getElementById("buscadorProducto").addEventListener("input", filtrarProductos);

mostrarProductos(productos);
actualizarTotales();

function mostrarCarrito() {
  actualizarListaCarrito();
  mostrarModal();
}
