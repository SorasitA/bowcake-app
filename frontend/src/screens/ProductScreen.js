import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//import data from '../data';

export default function ProductScreen(props) {
  //const product = data.products.find((x) => x._id === props.match.params.id); using line 12 and 13 to get product from the redux store instead of static 
  //if (!product) {
  //  return <div> Product Not Found</div>;
  //}
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails
  const [qty, setQty] = useState(1);


  useEffect(() => {
    dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${product._id}?qty=${qty}`);
  }
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varient="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={`/${product.image}`} alt={product.name}></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>Pirce : ${product.price}</li>
                <li>
                  Description:
              <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">{product.price}THB</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {/* check if the product is instock or not */}
                        {product.InStock ? (<span className="success">In Stock</span>) : (<span className="error">Unavailable</span>)}
                      </div>
                    </div>
                  </li>
                  {product.InStock && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select value={qty} onChange={(e) => setQty(e.target.value)}>
                              {[...Array(10).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                      </li>
                    </>
                  )}

                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>


  );
}