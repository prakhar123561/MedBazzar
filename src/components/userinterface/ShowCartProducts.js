import { Divider, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ShowCartProducts(props){

    var products = useSelector((state)=>state.data)
    var keys = Object?.keys(products)
    var values = Object?.values(products)
    var navigate = useNavigate()

    const showProducts = () =>{
       return( values.map((item)=>{
            return <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                <div style={{overflow: "hidden",
                textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical"}}>{item.productname}</div>
                  <div>Qty:{item.qty}</div>
                </div>
        })
       )
    }

    return(<Paper elevation={2} style={{display:props.isOpen?'flex':'none', position:'absolute', right:40, top:50, zIndex:3, padding:5}}>
        <div style={{width:250, height:'auto', display:'flex', flexDirection:'column',justifyContent:'space-between',padding:5, gap:5}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{fontsize:16, fontWeight:'bold'}}>Order Summary</div>
                <div style={{fontsize:16, fontWeight:'bold'}}>{keys.length} item</div>
                
            </div>
                <Divider/>
            {showProducts()}
            <div onClick={()=> navigate('/cart')} style={{display:'flex',background:'#00391c',height:40,color:'#fff',justifyContent:'center',alignItems:'center',fontWeight: 600, borderRadius:5, cursor:'pointer'}}>
                Proceed to cart
            </div>
        </div>
    </Paper>)
}