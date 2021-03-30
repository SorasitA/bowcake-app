import React, { useEffect, useState } from "react";
//import data from '../data'; used line 4 instead (fetch from backend)
import Product from '../components/Product';
import axios from 'axios';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function HomeScreen() {
  //const [products, setProducts] = useState([]); //products hook
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(false);
  //send request to backend to fetch the products

  // !! getting product list from the Redux store
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const{loading, error, products} = productList
  useEffect(() => {
    // const fetchData = async () =>{
    //   try{
    //     setLoading(true);
    //     const {data} = await axios.get('/api/products'); //requesting products from the backend
    //     setLoading(false);
    //     setProducts(data); //append the fetched products to the products hook create in line 6
    //   } catch (err) {
    //     setError(err.message);
    //     setLoading(false);
    //   }
    // }
    // fetchData(); //run fetch data
    dispatch(listProducts());

  }, [dispatch])
    return(
      //if loading process loading box else if error display error, else render the product
        <div>
          {loading? (
          <LoadingBox></LoadingBox>
          ) : error ? (
          <MessageBox varient ="danger">{error}</MessageBox>
          ) : (
          <div className="row center">
            {products.map(product =>(
                <Product key={product._id} product = {product}></Product>
              ))}
          </div>
          )}
          
        </div>
    )
}