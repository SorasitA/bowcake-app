// route to pass admin and user account

import express from 'express';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';


const productRouter = express.Router();

//if we get the url /api/product/ then we respond with the list of product [This is for the homepage]
productRouter.get(
    '/', 
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.send(products);
    })
);
// userRouter.get('/seed', async(req,res) => {
//     const createdUsers = await User.insertMany(data.users);
//     res.send({createdUsers});
// })


//add express async handler to catch error
productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProduct = await Product.insertMany(data.products);
    res.send({ createdProduct });
}))


//this router need to be at the because otherwise the /seed will never get executed (id get executed first)
//for sending only 1 product (for after clicking product on the homepage)
productRouter.get(
    '/:id', 
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if(product){
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found!'});
        }
    })
);

//api to create a new product
productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const product = new Product({
        name: 'sample name ' + Date.now(),
        image: '/images/1.png',
        price: 0,
        category: 'sample category',
        InStock: false,
        description: 'sample description',
      });
      const createdProduct = await product.save();
      res.send({ message: 'Product Created', product: createdProduct });
}))

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res) =>{
    const productId = req.params.id; //getting id from parameters
    const product = await Product.findById(productId); //get product from database
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.InStock = req.body.InStock;
      product.description = req.body.description;
      const updatedProduct = await product.save(); //save the new updated product
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id);
    if(product) {
        const deleteProduct = await product.remove();
        res.send({message: 'Product Deleted', product: deleteProduct})
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
}))

export default productRouter;