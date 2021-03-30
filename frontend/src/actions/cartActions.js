

import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_BRANCH } from "../constant/cartConstant";
import Axios from 'axios'

export const addToCart = (productId,qty) => async(dispatch, getState) => {
    const {data} = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            inStock: data.inStock,
            product: data._id,
            qty,
        },
    });
    //save the cart info into the local storage so we don't lose it when refreshing the page
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch,getState) => {
    dispatch({type:CART_REMOVE_ITEM, payload: productId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveBranch = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_BRANCH, payload: data})
    localStorage.setItem('selectedBranch', JSON.stringify(data))
}