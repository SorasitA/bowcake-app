import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBranch } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Select from 'react-select';

const branches = [
  { id: 0, name: 'Ari' },
  { id: 1, name: 'Nawamin' },
  { id: 2, name: 'Future Park' },
  { id: 3, name: 'Mega Bangna' },
]

export default function SelectBranchScreen(props) {
    //checking if user is signin or not
    const userSignIn = useSelector(state => state.userSignIn)
    const { userInfo } = userSignIn;
    //
    if(!userInfo){
        props.history.push("/signin")
    }

    const [branch,setBranch] = useState('');

    const handleBranchChange = (obj) => {
        console.log('handleBranchChange', obj)
        setBranch(obj)
      }

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveBranch(branch));
        props.history.push('/payment');
    }

    return(
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className = "form" onSubmit={submitHandler}>
                <div><h1>Select Branch</h1></div>
                <div>
                    <label htmlFor="branch">Branch</label>
                    <Select
                        id="branch"
                        name="branch"
                        value={branch}
                        placeholder="select branch"
                        options={branches}
                        onChange={handleBranchChange}
                        getOptionLabel={x => x.name}
                        getOptionValue={x => x.id}
                        required
                    />
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}