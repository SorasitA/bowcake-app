import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo, loading, error } = userSignIn;

    const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    const dispatch = useDispatch();


    const submitHandler = (e) =>{
        e.preventDefault();
        //sign in action
        dispatch(signin(email,password))
    }

    useEffect(() => {
        //if userInfo have info (sign in is success)
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo]);

    return(
        <div>
            <form className="form" onSubmit = {submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox varient="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor = "email">Email Address</label>
                    <input 
                        type="email" 
                        id ="email" 
                        placeholder ="Enter email" 
                        required 
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor = "password">Password</label>
                    <input 
                        type="password" 
                        id ="password" 
                        placeholder ="Enter Password" 
                        required 
                        onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label/>
                    <div>
                        New customer? {' '} <Link to="/register">Create account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}