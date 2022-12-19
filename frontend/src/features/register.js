import { DOMAIN } from "../constants"
import { loadingActions} from './loading_reducer';

export const register = (email,name,password,confirmPassword,onSuccess) => {
    
    return (async (dispatch)=>{
        if(!email || !name || !password || !confirmPassword){
            alert('all fields are mandatory')
            return ;
        }
    
        if(password !== confirmPassword){
            alert('password and confirmPassword doesn\'t match')
            return ; 
        }
    
        const obj = {
            email:email,
            name:name,
            password:password,
            confirmPassword:confirmPassword
        }
        dispatch(loadingActions.setLoading({value:true}));

        await fetch(DOMAIN+'/user/register/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then(async (res) =>{
            if(res.ok){
                alert("account created succesfully")
                if(onSuccess){
                    onSuccess();
                }
            }
            else{
                throw await res.json();  
            }
        }).catch((err)=>{
            alert(err.detail)
        })
        .finally(()=>dispatch(loadingActions.setLoading({value:false})))
    })
    
    
}