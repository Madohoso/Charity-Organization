import logoImg from '../../imgs/Logo.png';

export const Header = (props)=>{
    return (
        <div style={{textAlign:"center"}}>
            <img src={logoImg} style={{width:"100px",height:"67px"}} />
            <h4 style={{fontWeight:"600"}}>{props.title}</h4>
        </div>
    )
}