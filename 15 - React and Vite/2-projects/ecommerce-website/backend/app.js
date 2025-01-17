const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const products = require("./products")
const cartItems = require("./cart")

// Middleware
app.use(express.json())
// Cors
app.use(
    cors({
        origin: "http://localhost:5173"
    })
)

// app.get()
// app.post()
// app.put()
// app.delete()

// This will return products array and cartItems array
// console.log("Products:", products)
// console.log("Cart:", cartItems)

// .get(Route/URL, Callback(Route Handler))
app.get("/products", (request, response) => {
    // Status Code 200: Successful
    response.status(200).json(products);
})

// Route Parameter: placeholder
// .post(Route/URL, Callback(Route Handler))
app.post("/products", (request, response) => {
    // This will return the same value as desctructuring objects.
    // const name = request.body.name
    // const price = request.body.price
    const { name, price } = request.body
    if (!name || !price) {
        return response.status(400).json({ message: "Name and price is required"})
    }
    const newProduct = {
        id: generateUniqueId(),
        name,
        price,
    }
    products.push(newProduct)
    response.status(201).json({ 
        message: "Product added to the product list.",
        product: newProduct,
        successful: true,
    })
})

function generateUniqueId(){
    if (products.length === 0){
        // No product object inside of the products array.
        return 1;
    }

    const lastProductObject = products[products.length - 1]
    return lastProductObject.id + 1
}

// .post(Route/URL, Callback(Route Handler))
app.post("/products", (request, response) => {
    // This will return the same value as desctructuring objects.
    // const name = request.body.name
    // const price = request.body.price
    const { name, price } = request.body

    if (!name || !price) {
        return response.status(400).json({ message: "Name and price is required"})
    }

    const newProduct = {
        id: generateUniqueId(),
        name,
        price,
    }

    products.push(newProduct)

    response.status(201).json({ message: "Product added to the product list."})
})

app.put("/products/:productId", (request, response) => {
    const productId = parseInt(request.params.productId)
    const { name, price } = request.body

    if (!name || !price) {
        return response.status(400).json({ message: "Name and price is required"})
    }

    const product = products.find((productObject) => productObject.id === productId)

    if (product){
        product.name = name;
        product.price = price;
        response.status(200).json({ message: "Product updated successfully."})
    } else {
        response.status(404).json({ message: "Product not found"})
    }
})

app.delete("/products/:productId", (request, response) => {
    const productId = parseInt(request.params.productId)
    
    const productIndex = products.findIndex((productObject) => productObject.id === productId)

    if (productIndex !== -1){
        // .splice(start, deleteCount?, element/s)
        products.splice(productIndex, 1)
        response.status(200).json({ message: "Product deleted successfully"})
    } else {
        response.status(404).json({ message: "Product not found"})
    }
})

// 1. Add a new product Object to the cartItems array. 
// 2. Delete a product Object from the cartItems array.

app.listen(port, () => {
    console.log(`Server listening on port: ${port}...`)
})

// Run the Express app
// 1. Open "/shopping-cart-api" in the terminal.
// 2. node "name of main file.(app.js)"
// 3. Restart the server everytime there is a change.

// Nodemon
// 1. Open "/shopping-cart-api" in the terminal.
// 2. nodemon "name of main file.(app.js)"
// 3. This will automatically refresh the server everytime there is a change.