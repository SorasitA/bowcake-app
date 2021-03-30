import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBranch } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Select from 'react-select';

export default function PaymentMethodScreen(props) {

    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push('/placeorder');
    }

    return(
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className = "form" onSubmit={submitHandler}>
                <div><h1>Select Payment Method</h1></div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>

    )
}