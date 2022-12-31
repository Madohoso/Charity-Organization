import { Link } from 'react-router-dom'
import cartPhoto from '../../imgs/donation.jpg' 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { eventActions } from '../../features/EventReducer';

const TitleSection = (props)=>{
    return (
        <div style={{textAlign:"center"}}>
            <h6>{props.title}</h6>
            <span style={{fontSize:"15px",fontWeight:"500",color:"#002575"}}>{props.text}</span>
        </div>
    )
}

export const OrderItem = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    function onClick(){
        dispatch(eventActions.setEvent({event:props}))
        navigate({pathname:'/event/'+props.id})
    }

    var text = props.description.length > 30 ? props.description.slice(0,30) + '...' : props.description;

    return (
        <div onClick={onClick} className='hovered' style={{textDecoration:"none",pointer:'cursor'}}>
            <div className="cart-item">
                <img className="cart-item-img" src={cartPhoto}/>
                <div style={{textAlign:"center",margin:"30px",width:"100%"}} >
                    <div className="d-flex p-2 justify-content-between">
                        <TitleSection title={"Name"} text={props.name} />
                        <TitleSection title={"Description"} text={text}/>
                        <TitleSection title={"Current Amount"} text={props.current_amount}/>
                        <TitleSection title={"Desired Amount"} text={props.desired_amount}/>
                    </div>
                </div>
            </div>
        </div>
    )
}