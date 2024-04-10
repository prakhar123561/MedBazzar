import { useNavigate } from "react-router-dom"
import mainlogo from '../../assets/medbazzar1.png'
import list from '../../assets/listicon.png'
export default function TitleComponent({title,path}){

    var navigate = useNavigate()
    return(
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',padding:10}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <img src={mainlogo} width='140' />
                <div style={{color:'#636e72',fontSize:16,fontWeight:"bolder"}}>{title}</div>
        </div>
        <div style={{cursor:'pointer'}} onClick={()=>navigate(path)}>
            <img src={list} width='40'  />
        </div>
        </div>
    )
}