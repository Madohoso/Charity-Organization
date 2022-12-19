import { Header } from "./header";
import {FormInput} from './formInput';
import { Login } from "../../features/login_reducer";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ()=>{

    const isLoggedIn = useSelector((state)=>state.login.isLoggedIn)
    const height = window.innerHeight;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [keepmelogin,setKeepmelogin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isLoggedIn){
            navigate({pathname:"/"})
        }
    },[isLoggedIn])

    useEffect(()=>{
        document.title = "Metro Markets | Login"
    },[])

    return (
        <div className='auth-page' style={{height:`${height-3}px`}}>
            <Header title="Login to your account" />
            <div className='form-container'>
                <FormInput onChange={(e) => setEmail(e.target.value)}  type='text' title='Email or Phone*' placeholder="Enter your Email or Phone Number" />
                <FormInput onChange={(e) => setPassword(e.target.value)} type='password' title='Password' placeholder="Enter your Password" />
                <button data-testid="login" onClick={()=> dispatch(Login(email,password,keepmelogin))} className='form-control-submit'>Login</button>
                <div className='pt-3'>
                    <div className="form-check">
                        <input data-testid="keepmelogin" onChange={()=>setKeepmelogin((keepmelogin)=> !keepmelogin)} className="form-check-input" type="checkbox" />
                        <label className="form-check-label">Keep me logged in</label>
                    </div>
                </div>
                <div style={{textAlign:"center"}} className="pt-2">
                    <p>Do not have an account ?<Link to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    )
}


export default LoginPage;
