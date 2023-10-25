//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = 9000;

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
    // Get all products
  if (req.url === "/api/v1/products" && req.method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify(productsService.getProducts()));
  }else if (req.url.match(/\/api\/v1\/products\/([0-9])/)  && req.method === "GET") {
    // Get a product with specified id
    const id = req.url.split("/")[4]
    const product = productsService.getProductsById(id,done);
    if(!product){
      res.writeHead(404, {
        "content-type": "application/json",
      });
      res.end("Requested product doesn't exist..!");
    }else{
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(JSON.stringify(product));
    }
  }
  else if(req.url === "/api/v1/products" && req.method === "POST") {
    // Create a new product
    let req_body =await getRequestData(req);
    res.writeHead(201, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify(productsService.saveProduct(req_body,done)));
  }

  else if(req.url.match(/\/api\/v1\/products\/([0-9])/)  && req.method === "PUT") {
    // Update a specific product
    const id = req.url.split("/")[4]
    const product = productsService.getProductsById(id,done);
    if(!product){
      res.writeHead(404, {
        "content-type": "application/json",
      });
      res.end("Requested product doesn't exist..!");
    }else{
      let req_body =await getRequestData(req);
      res.writeHead(200 , {
      "content-type": "application/json",
    });
    res.end(JSON.stringify(productsService.updateProduct(id,req_body,done)));
    }
    
  }else if(req.url.match(/\/api\/v1\/products\/([0-9])/)  && req.method === "DELETE") {
    // Delete a specific Product
    const id = req.url.split("/")[4]
    const product = productsService.getProductsById(id,done);
    if(!product){
      res.writeHead(404, {
        "content-type": "application/json",
      });
      res.end("Requested product doesn't exist..!");
    }else{
       res.writeHead(200 , {
      "content-type": "application/json",
    });
    res.end(JSON.stringify(productsService.deleteProduct(id,req_body,done)));
    }
    
  }
  else{
    res.writeHead(404, {
      "content-type": "application/json",
    });
    res.end("API not found");
  }
});
function done(null_param, data){  return data;}  


// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})