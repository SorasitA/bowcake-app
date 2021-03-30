import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartSceen from './screens/CartScreeen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {useDispatch, useSelector} from 'react-redux'
import SigninScreen from './screens/SignInScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import SelectBranchScreen from './screens/SelectBranchScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';

function App() {
  //getting the cart from Redux Store
  const cart = useSelector((state) => state.cart);
  //get the cartItems from the cart
  const { cartItems } = cart;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  const signOutHandeler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">Bow Cake</Link>
        </div>
        <div>
          <Link to="/cart">Cart
          {cartItems.length > 0 && ( //if there is an item in the cart render a badge on the cart icon correspond to the amount of product (not qty) in the cart
            <span className="badge">{cartItems.length}</span>
          )}
          </Link>

          {
            userInfo ? (
              <div className = "dropdown">
                <Link to="#">
                  {userInfo.username} <i className = "fa-fa-caret-down"></i>
                </Link>
              <ul className="dropdown-content">
              <li>
                  <Link to="/profile">User profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <Link to = "#signout" onClick ={signOutHandeler}>
                  Sign Out
                </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )
          }
          {userInfo && userInfo.isAdmin && (
            <div className = "dropdown">
              <Link to = "#admin">
                Admin<i className = "fa fa-caret-down"></i>
              </Link>
              <ul className = "dropdown-content">
                <li>
                  <Link to ="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to ="/productlist">Products</Link>
                </li>
                <li>
                  <Link to ="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to ="/userlist">Users</Link>
                </li>
              </ul>
            </div>

          )}

        </div>
      </header>
      <main>
        {/* routing to each pag */}
        <Route path="/cart/:id?" component = {CartSceen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
        <Route path="/signin" component = {SigninScreen}></Route>
        <Route path="/register" component = {RegisterScreen}></Route>
        <Route path="/selectbranch" component = {SelectBranchScreen}></Route>
        <Route path="/payment" component = {PaymentMethodScreen}></Route>
        <Route path="/placeorder" component = {PlaceOrderScreen}></Route>
        <Route path="/order/:id" component = {OrderScreen}></Route>
        <Route path="/orderhistory" component = {OrderHistoryScreen}></Route>
        <Route path="/profile" component = {UserProfileScreen}></Route>
        <Route path="/" component = {HomeScreen} exact></Route>
        <AdminRoute path="/productlist" component = {ProductListScreen}></AdminRoute>
        <AdminRoute path="/orderlist" component = {OrderListScreen}></AdminRoute>
        <AdminRoute path="/userlist" component = {UserListScreen}></AdminRoute>
        
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
