import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_BRANCH } from "../constant/cartConstant";

export const cartReducer = (state = {cartItems:[]}, action) =>{
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            //check if we already have the same item in the cart or not
            const existItem = state.cartItems.find((x) => x.product === item.product);
            // if we already have it we then update the new item and leave the other item that is not related to be the same
            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product? item: x),
                };
            } else {
                //else just add the new item to the cart using concatinate
                return{...state, cartItems: [...state.cartItems, item]};
            }
        case CART_REMOVE_ITEM:
            // if remove then we remove the item from the cartItems using filter
            return{...state, cartItems: state.cartItems.filter((x) => x.product !== action.payload)};
        case CART_SAVE_BRANCH:
            return{...state, branch: action.payload } //payload comes from cartaction and from selectBranchScreen accordingly
        case CART_EMPTY:
            return{...state, cartItems: []} //return an empty cart
        default:
            return state;
    }
}