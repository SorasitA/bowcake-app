import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/',isAuth, isAdmin, expressAsyncHandler(async(req,res)=> {
    const orders = await Order.find({}).populate('user','username');
    res.send(orders);
}))

orderRouter.get('/history',isAuth, expressAsyncHandler(async(req,res)=> {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}))

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) =>{
    if(req.body.orderItems.length === 0){
        res.status(400).send({ message: 'Cart is empty' });
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            branch: req.body.branch,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).send({ message: 'New Order Create', order: createdOrder });
    }
}))

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req,res) =>{
    const order = await Order.findById(req.params.id) //req.params.id is from the user request (http://{appname}/api/order/{id})

    //if order exist then send the order
    if(order){
        res.send(order);
    } else {
        // if not return error
        res.status(404).send({message: 'Order Not Found'})
    }
}))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        const deleteOrder = await order.remove();
        res.send({ message: 'Order Deleted', order: deleteOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

  orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put('/:id/pay', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt= Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put('/:id/prepared', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPrepared = true;

      const updatedOrder = await order.save();
      res.send({ message: 'Order was prepared', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);


orderRouter.put('/:id/pickedup', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPickedUp = true;
        order.pickedUpAt = Date.now();
  
        const updatedOrder = await order.save();
        res.send({ message: 'Order Was Picked Up', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );




export default orderRouter