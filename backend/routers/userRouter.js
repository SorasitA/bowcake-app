// route to pass admin and user account

import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import { generateToken, isAdmin, isAuth } from '../utils.js';


const userRouter = express.Router();

// userRouter.get('/seed', async(req,res) => {
//     const createdUsers = await User.insertMany(data.users);
//     res.send({createdUsers});
// })


//add express async handler to catch error
userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
}))


userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    //search if user exist of not
    const user = await User.findOne({ email: req.body.email });
    // if exist
    if (user) {
        //if the password match
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                //generate user token
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid username or password' })
}))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        //generate user token
        token: generateToken(createdUser),
    });
}))

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.send(user)
    } else {
        res.status(404).send({ message: 'User Not Found' })
    }
}))

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        //getting user from the database
        const user = await User.findById(req.user._id);
        // if user exist 
        if (user) {
            // set user name and email to the be the new data, if empty new username/email the same username/email 
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            // if there is also a password to be change decrypt it
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            // save the database with the updated user
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        }
    })
);


userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req,res) => {
    const users = await User.find({});
    res.send(users);
}))

userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        if (user.email === 'admin@example.com') {
          res.status(400).send({ message: 'Can Not Delete Admin User' });
          return;
        }
        const deleteUser = await user.remove();
        res.send({ message: 'User Deleted', user: deleteUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

export default userRouter;