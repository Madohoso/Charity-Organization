import { Header } from "./header";
import {FormInput} from './formInput';
import { Login } from "../../features/login_reducer";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import {register} from '../../features/register'


const RegistrationPage = () =>{


    const isLoggedIn = useSelector((state)=>state.login.isLoggedIn)
    const height = window.innerHeight;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    // const [terms,setTerms] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isLoggedIn){
            navigate({pathname:"/"})
        }
    },[isLoggedIn])

    useEffect(()=>{
        document.title = "Charity organization | Register"
    },[])

    function OnCLick(){

        const onSuccess = ()=>{
            navigate({pathname:"/login"})
        }
        
        dispatch(register(email,name,password,confirmPassword,onSuccess));

    }

    return (
        <div className='auth-page' style={{minHeight:`${height-3}px`}}>
            <Header title="Login to your account" />
            <div style={{marginBottom:`30px`}} className='form-container'>
                <FormInput onChange={(e) => setEmail(e.target.value)}  type='text' title='Email*' placeholder="Enter your Email" />
                <FormInput onChange={(e) => setName(e.target.value)}  type='text' title='Name*' placeholder="Enter your Name" />
                <FormInput onChange={(e) => setPassword(e.target.value)} type='password' title='Password*' placeholder="Enter your Password" />
                <FormInput onChange={(e) => setConfirmPassword(e.target.value)}  type='password' title='Confirm Password*' placeholder="Confirm your Password" />
                <button onClick={OnCLick} className='form-control-submit'>Register</button>
                <div style={{textAlign:"center"}} className="pt-2">
                    <p>Already have an account ?<Link to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}


export default RegistrationPage;