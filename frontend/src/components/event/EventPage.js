import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DOMAIN } from '../../constants';
import { refreshToken } from '../../features/login_reducer';
import {StripeCard} from '../payment/stripe';
import { loadingActions } from '../../features/loading_reducer';
import { Link } from 'react-router-dom';

const EventPage = () => {
    
    const event = useSelector((state)=>state.event.event);
    const token = useSelector((state)=>state.login.accessToken);
    const [searchInput, setSearchInput] = useState('');
    const [intent , setIntent] = useState('');

    const dispatch = useDispatch();

    async function getIntent(auth_obj,token,refreshcallback=null){
        
        await fetch(DOMAIN+'/event/DonateReq/',{
            method:'POST',
            body:JSON.stringify(auth_obj),
            headers:{
                'Content-Type':'application/json',
                'Authorization':"Bearer "+ token
            } 
        }).then(async (res)=>{
            if(res.ok){
                return await res.json()
            }else if (res.status ===401){
                if(refreshcallback){
                    refreshcallback()
                }
            }else{
                alert("some error happens please try again")
            }
        }).then((data)=>{
            console.log(data)
            setIntent(data.paymentIntent);
        }).catch((err)=>alert(err))
    }

    async function onClick(){
        
        if(searchInput && event.id){
            const amount = parseInt(searchInput);
            const auth_obj = {
                event:event.id,
                amount:amount,
            }
            async function RefreshCallback(){
                
                dispatch(refreshToken((newaccesstoken) =>{
                    dispatch(getIntent(auth_obj,newaccesstoken)); 
                }));
            }
            dispatch(loadingActions.setLoading({value:true}));
            await getIntent(auth_obj,token,RefreshCallback);
            dispatch(loadingActions.setLoading({value:false}));
        }else{
            alert('error in input')
        }
    }

    return(
        <div>
            <div className="small-cart-sections p-3">
                <div className="cart-section">
                    <p>Event Name:</p>
                    <span>{event.name}</span>
                </div>
                <div className="cart-section">
                    <p>Event Description:</p>
                    <span>{event.description}</span>
                </div>
                <div className="cart-section">
                    <p>Current amount:</p>
                    <span>{event.current_amount}</span>
                </div>
                <div className="cart-section">
                    <p>Desired amount:</p>
                    <span>{event.desired_amount}</span>
                </div>
                
                {intent ? <StripeCard intent={intent} /> : (<div className="cart-section" style={{height:"100%"}}>
                    <p>donation amount:</p>

                    <div className="input-group bg-light p-2 search-bar" style={{width:"100%"}}>
                        <input style={{width:"100%"}} onChange={(e) => setSearchInput(e.target.value)} value={searchInput} className="form-control bg-light no-border" type="text" placeholder="Enter amount you want to donate" id="search" name="search" />    
                    </div>
                    <button onClick={onClick} className="add-item">Donate</button>
                    <Link to="/">
                        <button className="mt-2 p-2 red-button">Back to Events</button>
                    </Link>
                    
                    {/* <Link to={{pathname:'/'}} className="mt-2 p-2 red-button">Back to Events</Link> */}
                </div>)  }        
            </div>
            
    </div>        
    )
}

export default EventPage;