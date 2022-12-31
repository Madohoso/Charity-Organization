import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {OrderItem} from "./orderItem";
import {useNavigate} from 'react-router-dom';
import { orderActions } from "../../features/order_reducer";
import {getPreviousOrders} from "../../features/order_reducer";
import { refreshToken } from "../../features/login_reducer";
// import { navigatorActions,HomeRoute,PrevOrdersRoute } from '../../features/navigator_reducer.js';

const OrdersPage = (props) => {
    
    const orders = useSelector((state) => state.order.prevorders.results ) 
    var sections = (<div>NO previous orders</div>)
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state)=>state.login.isLoggedIn)
    if(orders){
        console.log(orders)
        sections = orders.map((order)=> <OrderItem key={order.id} {...order} />)
    }
    const dispatch = useDispatch();

    const userid = useSelector((state)=>state.login.userid)
    const accessToken = useSelector((state)=>state.login.accessToken)
    async function RefreshCallback(){
        if(userid){
            dispatch(refreshToken((newaccesstoken) =>{
                dispatch(getPreviousOrders(userid,newaccesstoken)); 
            }));
        }
    }

    useEffect(()=>{
        if(!isLoggedIn){
            navigate({pathname:"/login"})
        }else{
            dispatch(getPreviousOrders(userid,accessToken,RefreshCallback))
        }
    },[])


    useEffect(()=>{
        document.title = "Charity Website | Events"
    },[])

    return (
        <div className="container-lg p-3">
            <div className="my-4" style={{color:"#002575"}}>
                <h1>Events</h1>
            </div>
            {sections}
        </div>
    )

}


export default OrdersPage;