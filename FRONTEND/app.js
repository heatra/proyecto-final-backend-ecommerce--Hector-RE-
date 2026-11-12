const API_URL = "http://localhost:8080/api/componentes";
const LIMITE_STOCK_BAJO = 5;
let listaComponentes = [];
let carrito = [];

async function cargarComponentes() {
    try {
        const respuesta = await fetch(API_URL);
        listaComponentes = await respuesta.json();
        filtrarTabla();
    } catch (error) {
        console.error("Error al cargar:", error);
    }
}

function filtrarTabla() {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const tabla = document.getElementById("tablaCuerpo");
    tabla.innerHTML = "";

    const filtrados = listaComponentes.filter(c => 
        c.nombre.toLowerCase().includes(texto) || c.categoria.toLowerCase().includes(texto)
    );

    if (filtrados.length === 0) {
        tabla.innerHTML = '<tr><td colspan="6" style="text-align:center;">Sin resultados.</td></tr>';
        return;
    }

    filtrados.forEach(comp => {
        const sinStock = comp.stock <= 0;
        const stockBajo = comp.stock > 0 && comp.stock <= LIMITE_STOCK_BAJO;

        let etiquetaStock = `${comp.stock} u.`;
        if (sinStock) etiquetaStock = `<span class="sin-stock">Agotado (0)</span>`;
        else if (stockBajo) etiquetaStock = `<span class="stock-bajo">⚠️ Bajo (${comp.stock} u.)</span>`;

        tabla.innerHTML += `
            <tr>
                <td>${comp.id}</td>
                <td><strong>${comp.nombre}</strong><br><small class="texto-gris">${comp.descripcion || ''}</small></td>
                <td>${comp.categoria}</td>
                <td>$${comp.precio.toFixed(2)}</td>
                <td>${etiquetaStock}</td>
                <td class="acciones">
                    <button class="btn-cart" onclick="agregarAlCarrito(${comp.id})" ${sinStock ? 'disabled' : ''}>+ Carrito</button>
                    <button class="btn-edit" onclick="prepararEdicion(${comp.id})">Editar</button>
                    <button class="btn-delete" onclick="eliminarComponente(${comp.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function agregarAlCarrito(id) {
    const prod = listaComponentes.find(c => c.id === id);
    if (!prod) return;
    const item = carrito.find(i => i.id === id);
    const cantActual = item ? item.cantidad : 0;

    if (cantActual + 1 > prod.stock) {
        alert(`Stock insuficiente. Máximo: ${prod.stock}`);
        return;
    }
    if (item) item.cantidad++;
    else carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: 1 });
    renderizarCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(i => i.id !== id);
    renderizarCarrito();
}

function renderizarCarrito() {
    const contenedor = document.getElementById("carritoLista");
    const totalEl = document.getElementById("carritoTotal");
    const btn = document.getElementById("btnFinalizar");

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="texto-gris">El carrito está vacío.</p>';
        totalEl.innerText = "Total: $0.00";
        btn.disabled = true;
        return;
    }

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const sub = item.precio * item.cantidad;
        total += sub;
        contenedor.innerHTML += `
            <div class="cart-item">
                <div><strong>${item.nombre}</strong><br><small>${item.cantidad} x $${item.precio.toFixed(2)} = <strong>$${sub.toFixed(2)}</strong></small></div>
                <button class="btn-delete" onclick="quitarDelCarrito(${item.id})">X</button>
            </div>
        `;
    });

    totalEl.innerText = `Total: $${total.toFixed(2)}`;
    btn.disabled = false;
}

async function finalizarCompra() {
    if (carrito.length === 0) return;
    const btn = document.getElementById("btnFinalizar");
    btn.disabled = true;
    btn.innerText = "Procesando...";

    try {
        for (const item of carrito) {
            const orig = listaComponentes.find(c => c.id === item.id);
            if (orig) {
                const res = await fetch(`${API_URL}/${item.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...orig, stock: orig.stock - item.cantidad })
                });
                if (!res.ok) throw new Error("Fallo al actualizar stock");
            }
        }
        alert("¡Compra confirmada y stock actualizado!");
        carrito = [];
        renderizarCarrito();
        await cargarComponentes();
    } catch (error) {
        alert("Error al sincronizar compra.");
    } finally {
        btn.innerText = "Confirmar Compra y Descontar Stock";
    }
}

function prepararEdicion(id) {
    const comp = listaComponentes.find(c => c.id === id);
    if (!comp) return;
    document.getElementById("componenteId").value = comp.id;
    document.getElementById("nombre").value = comp.nombre;
    document.getElementById("categoria").value = comp.categoria;
    document.getElementById("precio").value = comp.precio;
    document.getElementById("stock").value = comp.stock;
    document.getElementById("descripcion").value = comp.descripcion || "";
    document.getElementById("formTitulo").innerText = `Editando #${comp.id}`;
    const btn = document.getElementById("btnGuardar");
    btn.innerText = "Actualizar Componente";
    btn.style.backgroundColor = "#007bff";
    document.getElementById("btnCancelar").style.display = "inline-block";
}

function cancelarEdicion() {
    document.getElementById("componenteForm").reset();
    document.getElementById("componenteId").value = "";
    document.getElementById("formTitulo").innerText = "Añadir Nuevo Componente";
    const btn = document.getElementById("btnGuardar");
    btn.innerText = "Guardar Componente";
    btn.style.backgroundColor = "#28a745";
    document.getElementById("btnCancelar").style.display = "none";
}

document.getElementById("componenteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("componenteId").value;
    const datos = {
        nombre: document.getElementById("nombre").value,
        categoria: document.getElementById("categoria").value,
        precio: parseFloat(document.getElementById("precio").value),
        stock: parseInt(document.getElementById("stock").value),
        descripcion: document.getElementById("descripcion").value
    };

    const res = await fetch(id ? `${API_URL}/${id}` : API_URL, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    if (res.ok) { cancelarEdicion(); cargarComponentes(); }
    else alert("Error de validación: verifica precio y campos obligatorios.");
});

async function eliminarComponente(id) {
    if (confirm("¿Eliminar componente?")) {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (res.ok) { quitarDelCarrito(id); cargarComponentes(); }
    }
}

cargarComponentes();
