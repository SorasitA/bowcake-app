import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    const dispatch = useDispatch();


    const submitHandler = (e) =>{
        e.preventDefault();
        //sign in action
        if(password !== confirmPassword){
            alert("Password does not match")
        }else{
            dispatch(register(username,email,password))
        }
        
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
                    <h1>Create an Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox varient="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor = "username">Username</label>
                    <input 
                        type="text" 
                        id ="username" 
                        placeholder ="username" 
                        required 
                        onChange={e => setUsername(e.target.value)}>
                    </input>
                </div>
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
                    <label htmlFor = "confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id ="confirmPassword" 
                        placeholder ="Confirm Password" 
                        required 
                        onChange={e => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an acoount? {' '} <Link to="/signin">Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}