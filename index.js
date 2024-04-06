const express = require('express');
const app = express();
app.use(express.json());

const clientes = [
    { id: 1, nombre: 'Miguel Flores', contacto: 'miguel.flores.v@tecsup.edu.pe' },
    { id: 2, nombre: 'Donnel Villarroel', contacto: 'donnel.villarroel@tecsup.edu.pe' },
    { id: 3, nombre: 'Ashly Peña', contacto: 'ashly.peña@tecsup.edu.pe' }
];

const productos = [
    { id: 1, nombre: 'Celular Honor X', precio: 800 },
    { id: 2, nombre: 'TableT Sansung Y', precio: 1600 },
    { id: 3, nombre: 'Laptop Hp Z', precio: 2200 }
];

app.get('/', (req, res) => res.send('Bienvenido a TareaNube'));

// Clientes
app.get('/clientes', (req, res) => res.json(clientes));

app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body;
    nuevoCliente.id = clientes.length + 1;
    clientes.push(nuevoCliente);
    res.status(201).send(nuevoCliente);
});

app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = clientes.findIndex(c => c.id === id);
    if (indice !== -1) {
        clientes[indice] = {...clientes[indice], ...req.body};
        res.send(clientes[indice]);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = clientes.findIndex(c => c.id === id);
    if (indice !== -1) {
        clientes.splice(indice, 1);
        res.status(200).send(`Cliente con id ${id} eliminado`);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// Productos
app.get('/productos', (req, res) => res.json(productos));

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length + 1;
    productos.push(nuevoProducto);
    res.status(201).send(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = productos.findIndex(p => p.id === id);
    if (indice !== -1) {
        productos[indice] = {...productos[indice], ...req.body};
        res.send(productos[indice]);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = productos.findIndex(p => p.id === id);
    if (indice !== -1) {
        productos.splice(indice, 1);
        res.status(200).send(`Producto con id ${id} eliminado`);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
