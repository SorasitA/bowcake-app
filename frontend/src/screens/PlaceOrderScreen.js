import { PromiseProvider } from "mongoose";
import React, { createFactory, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_RESET } from "../constant/orderConstant";

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    cart.totalPrice = cart.cartItems.reduce((a, c) => a + (c.qty * c.price), 0); //calculating the total price
    
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() =>{
        //if the order success redirect user to the order detail page
        if(success){
            props.history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET})
        }
    },[success,order])
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Branch for pickup</h2>
                                <p>
                                    <strong>Selected branch:</strong> {cart.branch.name} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>Bank Transfer<br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>{item.qty} x {item.price}THB = {item.qty * item.price}THB</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className = "col-1">
                    <div className = "card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className = "row">
                                    <div><strong>Total Price</strong></div>
                                    <div>${cart.totalPrice}</div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick ={placeOrderHandler} disabled={cart.cartItems.length === 0}>Place Order</button>
                            </li>
                            {error && <MessageBox varient ="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    )
}