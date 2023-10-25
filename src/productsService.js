// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
}

const getProductsById = (productId,done) => {
  // get a product by ID
  let product = productsList.filter(p => {return (p.id == productId)})
  let err = null
  if(product[0] == null){
    err = "Requested product doesn't exist..!"
  }
    return done(err, JSON.stringify(product[0] ));

}

const saveProduct = (newProduct,done) => {
 // save a product
 let product = productsList.filter(p => {return (p.id == newProduct.id)})
 let err = null
 if(product[0] != null){
   err = "Product already exists..!"
 }else{
  productsList.push(newProduct)
 }
  return done(err, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
      // update the product list
  let updatedProductList = productsList;
  let product = productsList.filter(p => {return (p.id == productId)})
  let err = null
  if(product[0] == null){
    err = "Requested product doesn't exist..!"
  }else{
    for(let i = 0; i <= productsList.length;i++){
      if(productsList[i]?.id == productId){
        productsList[i].name = updateData.name ;
        productsList[i].description = updateData.description ;
        productsList[i].price = updateData.price ;
        productsList[i].quantity = updateData.quantity ;
        break;
      }
    }
    updatedProductList = productsList 
  }
  done(err, JSON.stringify(updatedProductList));
}

const deleteProduct = (productId, done) => {
  // delete a product    
  let updatedProductList = productsList;
  let product = productsList.filter(p => {return (p.id == productId)})
  let err = null
  if(product[0] == null){
    err = "Requested product doesn't exist..!"
  }else{
    for(let i = 0; i <= productsList.length;i++){
      if(productsList[i].id == productId){
        productsList.splice(i,1);
        break;
      }
    }
    updatedProductList = productsList 
  }
    // update the product list
  done(err, JSON.stringify(updatedProductList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}