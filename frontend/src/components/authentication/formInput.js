import {  useState } from "react"


export const FormInput = (props) =>{
    const [selected,setSelected]  = useState(false);
    return (
        <div style={{position:"relative"}}>
            <input onChange={props.onChange} type={props.type} onBlur={()=>setSelected(false)} onFocus={()=>setSelected(true)} className='form-control-input' placeholder={selected?props.placeholder:props.title} />
            {selected && <div className="form-control-title"><span>{props.title}</span></div>}
        </div>
    )
}