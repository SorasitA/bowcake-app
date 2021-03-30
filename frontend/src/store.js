//import data from "./data";
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderHistoryListReducer, orderListReducer, orderPickedUpReducer, orderPreparedReducer, orderPaidReducer} from './reducers/orderReducer';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer} from './reducers/productReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducer';

const iniitalState = {
    //loading the cart info from local storage
    userSignIn: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    cart:{
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')) // if there is cartItems in local storage we then convert the string to array
        : [], // else the cart is an empty array
    }
};
//const reducer = (state, action) =>{
//   return {products: data.products}
//}

//reducer
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignIn: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderHistoryList: orderHistoryListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderPaid: orderPaidReducer,
    orderPrepared: orderPreparedReducer,
    orderPickedUp: orderPickedUpReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,iniitalState, composeEnchancer(applyMiddleware(thunk)));

export default store;