import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import { useSelector,useDispatch } from 'react-redux';
import {useStripe , useElements} from '@stripe/react-stripe-js';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

// import {paymentActions} from '../../features/payment_reducer';

const stripePromise = loadStripe('pk_test_51MLOnbBbxPkcPsN00lgLk9TPUEVzdH2YX3FQg8bC8fFlk6kwIxObNTLjfbQIvSIyDQ92CiNdI2eu58xOnUDW2FiD00Ec7meXc3');


const options = {
    style: {
        base:{
            color:'#002575'
        }
    }
}

const StripeCardField = (props) => {
    
    const [processing,setProcessing] = useState(false); 
    const stripe = useStripe()
    const element = useElements()
    const client_secret = props.intent ; // useSelector((state)=>state.payment.intent)
    const userid = useSelector((state)=>state.login.userid);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function pay(){
        const cardElement = element.getElement(CardElement);
        try{
            setProcessing(true)
            const payment = await stripe.createPaymentMethod({
                type:'card',
                card:cardElement,
            })

            const confirmCardPayment = await stripe.confirmCardPayment(client_secret,{
                payment_method:payment.paymentMethod.id
            })
            if(confirmCardPayment.error){
                throw confirmCardPayment.error
            }
            alert('Thank you for your donation')
            navigate({pathname:"/"})
            // dispatch(paymentActions.resetIntent())
        }catch (err){
            alert(err.message)
        }finally{
            setProcessing(false)
        }
    }

    return (
           
        <div className='cart-section' style={{height:'auto'}} >
            <p>Credit Card info</p>
            <CardElement options={options}/>
            <button disabled={processing} onClick={pay} className="add-item" style={{height:'35px',fontSize:'12px',padding:'5px',marginTop:'8px'}}>Pay for order</button>
        </div>
         
    )
}

export const StripeCard = (props) => {
    return (
        <Elements stripe={stripePromise}>
            <StripeCardField intent={props.intent}/>
        </Elements>
    )
}