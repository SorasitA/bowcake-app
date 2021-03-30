import axios from "axios";
import { CART_EMPTY } from "../constant/cartConstant";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_HISTORY_LIST_FAIL, ORDER_HISTORY_LIST_REQUEST, ORDER_HISTORY_LIST_SCCUESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PREPARED_REQUEST, ORDER_PREPARED_SUCCESS, ORDER_PREPARED_FAIL, ORDER_PICKED_UP_REQUEST, ORDER_PICKED_UP_SUCCESS, ORDER_PICKED_UP_FAIL } from "../constant/orderConstant"

//create order action
export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try{
        const {userSignIn:{userInfo}} = getState();
        const {data} = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
        //cleaning the in local storage and redux state
        dispatch({type: CART_EMPTY})
        localStorage.removeItem("cartItems")
    } catch(error) {
        dispatch({ type: ORDER_CREATE_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
    }
}

//request order action
export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
    const {userSignIn:{userInfo}} = getState();
    try{
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });

        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})

    } catch(error){
        dispatch({ type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
    })
}
}

//request list of order of that one user
export const listOrderHistory = () => async (dispatch, getState) => {
    dispatch({type: ORDER_HISTORY_LIST_REQUEST});
    const {userSignIn: { userInfo }} = getState();
    try{
        const { data } = await axios.get('/api/orders/history',{
            headers: {Authorization: `Bearer ${userInfo.token}`},
        })

        dispatch({type: ORDER_HISTORY_LIST_SCCUESS, payload: data})
    }catch(error){
        dispatch({type: ORDER_HISTORY_LIST_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,})
    }
}

export const listOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };

  export const deleteOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {userSignIn: { userInfo }} = getState();
    try {
      const { data } = axios.delete(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DELETE_FAIL, payload: message });
    }
  };

  export const paidOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: orderId });
    const {userSignIn: { userInfo }} = getState();
    try {
      const { data } = axios.put(
        `/api/orders/${orderId}/pay`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
  };

  export const preparedOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PREPARED_REQUEST, payload: orderId });
    const {userSignIn: { userInfo }} = getState();
    try {
      const { data } = axios.put(
        `/api/orders/${orderId}/prepared`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ORDER_PREPARED_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_PREPARED_FAIL, payload: message });
    }
  };

  export const pickedUpOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PICKED_UP_REQUEST, payload: orderId });
    const {userSignIn: { userInfo }} = getState();
    try {
      const { data } = axios.put(
        `/api/orders/${orderId}/pickedup`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ORDER_PICKED_UP_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_PICKED_UP_FAIL, payload: message });
    }
  };