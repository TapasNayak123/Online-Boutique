const express = require('express');
const route = express.Router();
const checkJwt = require('../util/checkJwt');
const userController = require('../controller/user.controller');
const productController = require('../controller/product.controller');

//Login Controller
route.post('/login', userController.loginUser);
route.post('/register', userController.registerUser);
route.get('/getDetail', checkJwt, userController.getUserDetails);

//From Product Controller
route.post('/addProduct', checkJwt, productController.addProduct);
route.get('/getProduct:productId', checkJwt, productController.getProductDetail);
route.get('/getProduct', checkJwt, productController.getProducts);
route.post('/editProduct', checkJwt, productController.editProduct);
route.delete('/delete:productId', checkJwt, productController.deleteProduct);

module.exports = route;