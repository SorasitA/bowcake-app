import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_RESET, ORDER_DELETE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_HISTORY_LIST_FAIL, ORDER_HISTORY_LIST_REQUEST, ORDER_HISTORY_LIST_SCCUESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_PICKED_UP_FAIL, ORDER_PICKED_UP_REQUEST, ORDER_PICKED_UP_RESET, ORDER_PICKED_UP_SUCCESS, ORDER_PREPARED_FAIL, ORDER_PREPARED_REQUEST, ORDER_PREPARED_RESET, ORDER_PREPARED_SUCCESS } from "../constant/orderConstant";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload } //success is incase we add more payment method in the future
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_CREATE_RESET:
            return {}
        default: return state
    }
}

export const orderDetailsReducer = (state = { loading: true, order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}

export const orderHistoryListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_HISTORY_LIST_REQUEST:
            return { loading: true }
        case ORDER_HISTORY_LIST_SCCUESS:
            return { loading: false, orders: action.payload }
        case ORDER_HISTORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true }
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loading: true }
        case ORDER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_DELETE_RESET:
            return {}
        default:
            return state;
    }
}

export const orderPaidReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true };
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

export const orderPreparedReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PREPARED_REQUEST:
            return { loading: true };
        case ORDER_PREPARED_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PREPARED_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PREPARED_RESET:
            return {};
        default:
            return state;
    }
};

export const orderPickedUpReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PICKED_UP_REQUEST:
            return { loading: true };
        case ORDER_PICKED_UP_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PICKED_UP_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PICKED_UP_RESET:
            return {};
        default:
            return state;
    }
};