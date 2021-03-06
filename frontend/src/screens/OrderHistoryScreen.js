import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { listOrderHistory } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props){
    const orderHistoryList = useSelector((state) => state.orderHistoryList);
    const {loading,error, orders} = orderHistoryList;

    const dispatch = useDispatch();

    useEffect(()=> {
      dispatch(listOrderHistory());

    },[])

    return(
        <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>PREPARED</th>
              <th>PICKED UP</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>{order.isPrepared ? 'Yes' : 'No'}</td>
                <td>
                  {order.isPickedUp
                    ? order.pickedUpAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )
}