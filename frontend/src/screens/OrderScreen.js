import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, paidOrder, pickedUpOrder, preparedOrder} from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import OrderSteps from "../components/OrderSteps";
import { ORDER_PAY_RESET, ORDER_PICKED_UP_RESET, ORDER_PREPARED_RESET } from "../constant/orderConstant";


export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const {loading, order, error} = orderDetails;

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    const orderPaid = useSelector((state) => state.orderPaid);
    const {loading: loadingPaid, error: errorPaid, success: successPaid} = orderPaid;

    const orderPrepared = useSelector((state) => state.orderPrepared);
    const {loading: loadingPrepared, error: errorPrepared, success: successPrepared} = orderPrepared;

    const orderPickedUp = useSelector((state) => state.orderPickedUp);
    const {loading: loadingPickedUp, error: errorPickedUp, success: successPickedUp} = orderPickedUp;

    const dispatch = useDispatch();
    useEffect(() =>{
        if (
            !order ||
            successPaid ||
            successPrepared ||
            successPickedUp ||
            (order && order._id !== orderId)
          ) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_PREPARED_RESET });
            dispatch({ type: ORDER_PICKED_UP_RESET });
            dispatch(detailsOrder(orderId));
          }
    },[orderId, order, successPaid,successPickedUp,successPrepared])


    const paidHandler = () =>{
        dispatch(paidOrder(order._id))
    }

    const preparedHandler = () =>{
        dispatch(preparedOrder(order._id))
    }

    const pickedUpHandler = () =>{
        dispatch(pickedUpOrder(order._id))
    }

    return loading? (<LoadingBox></LoadingBox>) : error? (<MessageBox varient = "danger">{error}</MessageBox>) : (
        <div>
            <h1>Order {order._id}</h1>
            {order.isPickedUp? <OrderSteps step1 step2 step3></OrderSteps> : order.isPrepared? <OrderSteps step1 step2></OrderSteps> : order.isPaid? <OrderSteps step1></OrderSteps>: <OrderSteps></OrderSteps>}
            {order.isPickedUp? <MessageBox varient="success">Order was picked up at: {order.pickedUpAt.substring(0, 20)}</MessageBox> : <div></div>}
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Branch for pickup</h2>
                                <p>
                                    <strong>Selected branch:</strong> {order.branch.name} <br />
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
                                    {order.orderItems.map((item) => (
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
                                    <div>${order.totalPrice}</div>
                                </div>
                            </li>
                            {userInfo.isAdmin && !order.isPaid && (
                                <li>
                                    <button type ="button" onClick ={paidHandler}>
                                        Order is Paid
                                    </button>
                                </li>
                            )}
                            {userInfo.isAdmin && order.isPaid && !order.isPrepared && (
                                <li>
                                    <button type ="button" onClick ={preparedHandler}>
                                        Order is Prepared
                                    </button>
                                </li>
                            )}
                            {userInfo.isAdmin && order.isPaid && order.isPrepared && !order.isPickedUp && (
                                <li>
                                    <button type ="button" onClick ={pickedUpHandler}>
                                        Order Picked Up
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    )
}