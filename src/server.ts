 


import express from 'express';

const app = express();

const PORT = 3000;

app.use(express.json());

const products=[
  {
    "id": 1,
    "name": "Keyboard",
    "price": 250
  },
  {
    "id": 2,
    "name": "Mouse",
    "price": 100
  },{
    "id": 3,
    "name": "Wire",
    "price": 25
  }

];


// GET all products
app.get('/products', (req, res) => {
    res.send(products);
});

// GET one product 
app.get('/products/:id', (req,res)=>{
  const id= Number(req.params.id);
  const product = products.find(product => product.id === id);

  if(!product){
        return res.status(404).send('Product not found');  }
  res.send(product);

});

// POST new product
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price
    };

    products.push(newProduct);

    res.status(201).send(newProduct);
});

// DELETE a product
app.delete('/products/:id', (req,res)=>{
   const id = Number(req.params.id);

    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return res.status(404).send('Product not found');
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.send(deletedProduct);
});

// Update a product
app.put('/products/:id', (req, res) => {

    const id = Number(req.params.id);

    const productIndex = products.findIndex(
        product => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).send('Product not found');
    }

    const { name, price } = req.body;

    const updatedProduct = {
        id: products[productIndex].id,
        name: name,
        price: price
    };

    products[productIndex] = updatedProduct;

    res.send(updatedProduct);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});