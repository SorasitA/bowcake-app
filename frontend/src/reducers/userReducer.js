import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNOUT, USER_SIGNIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_RESET } from "../constant/userConstant";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload }; //action.payload is from the "dispatch({type: USER_SIGNIN_SUCCESS, payload: data});"
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {}; //by returning empty object data in the userInfo should be automatically removed
        default:
            return state;
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }; //action.payload is from the "dispatch({type: USER_REGISTER_SUCCESS, payload: data});"
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}


export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
}

export const userListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true };
        case USER_DELETE_SUCCESS:
            return { loading: false, success:true };
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case USER_DELETE_RESET:
            return {}
        default:
            return state;
    }
};