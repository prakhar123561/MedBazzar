import { Grid, Divider, Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { serverUrl } from "../../services/fetchNodeServices";
import {IconButton} from "@mui/material";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import logo from '../../assets/medbazzar1.png'
import PlusMinusComponent from "./PlusMinusComponent";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ProductList(props){

    const theme = useTheme()
    const navigate = useNavigate()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

    var products = props.products
    var productFromRedux=useSelector(state=>state.data)
    var dispatch = useDispatch()

    const showSlide = (item) =>{

        
        return <div><img src={`${serverUrl}/images/${item.picture}`} 
        style={{
            width:"70%",
            height:'auto',
            borderRadius:10,
            marginLeft:'auto',
            marginRight:'auto',
            aspectRatio:3/3,
            cursor:'pointer'}}
        />
        {/* <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', fontWeight:'bolder'}}>{item[1]}<img src={logo} width="100"/></div> */}
        </div>
    
}

const handleChange=(v,item)=>{
    // alert(v)
    if(v>0){
        item['qty']=v

        dispatch({type:"ADD_PRODUCT",payload:[item.productdetailid,item]})
    }
    else{
        dispatch({type:"DELETE_PRODUCT",payload:[item.productdetailid]})
    }
    props.setPageRefresh(!props.pageRefresh)

}

const handleAddCart=(item)=>{
    dispatch({type:"ADD_PRODUCT",payload:[item.productdetailid,item]})
    navigate('/cart')
    props.setPageRefresh(!props.pageRefresh)
}
console.log(products)

const handleProductDetail = (item) =>{
    navigate('/productdetails',{state:{data:item}})
}

    const ProductDetail=()=>{
        return products?.map((item)=>{
         return( <div >
             <div style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 auto",
                 
                
                }}>
         <Grid container spacing={1} style={{maxWidth:'240px'}} >
             <Grid item xs={12} style={{marginLeft:8,marginRight:8,cursor:'pointer'}}  onClick={()=>handleProductDetail(item)}>
             <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
             <p style={{fontSize:14,fontWeight:600,background:'#f5a623',padding:'2px 10px',clipPath: "polygon(0% 0%, 100% 0, 90% 48%, 100% 100%, 0% 100%)",marginLeft:10}}>
               10% off</p>
                 <IconButton  aria-label="bookmark"><BookmarkAddOutlinedIcon style={{color:'#000',cursor:"default"}}/></IconButton>
             </div>
                <div style={{padding:5}}>
                     {showSlide(item)}
                </div> 
                <div style={{marginLeft:'auto',width:'50%',cursor:'pointer'}}><img src={logo} style={{width:60}}/></div>
             </Grid>
             <Grid item xs={12} style={{marginLeft:8,marginRight:8,overflow: "hidden",cursor:'pointer',
                   textOverflow: "ellipsis",
                   display: "-webkit-box",
                   WebkitLineClamp: "2",
                   WebkitBoxOrient: "vertical",}}>
                 <div style={{fontWeight:500}}>{item.productname}, {item.weight} {item.weighttype}</div>
             </Grid>
             <Grid item xs={12} style={{marginLeft:8,marginRight:8,cursor:'pointer'}}>
               {item.offerprice==0?<span style={{fontSize:'1.1em',fontWeight:650}}>&#x20B9;{item.price}</span>:
             <div style={{fontSize:'1.1em',fontWeight:650}}>
               <span style={{textDecoration:'line-through',opacity:'0.5'}}>&#x20B9;{item.offerprice}</span>
               <span> &#x20B9;{item.price}</span></div>}
             </Grid>
             <Grid item xs={12} style={{marginLeft:8,marginRight:8}}>
             <Divider style={{background:'#00391c',opacity:0.15}}/>
             </Grid>
             <Grid item xs={12} style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',marginLeft:8,marginRight:8}}>
             <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',width:'95%',fontSize:12}}>
               <PlusMinusComponent qty={productFromRedux[item?.productdetailid]?.qty===undefined?0:productFromRedux[item?.productdetailid]?.qty} onChange={(v)=>handleChange(v,item)}/>
                 {/* <Button variant="text" onClick={()=>navigate('/productdetails')} endIcon={<AddShoppingCartIcon style={{height:15}}/>} style={{fontSize:12,color:'#00391c',padding: "2px 0px",width:'40%',marginRight:'auto'}}>ADD</Button> */}
                 <Button variant="contained" fullWidth  style={{background:'#00391c',padding: "2px 0px",width:'50%'}} onClick={()=>handleAddCart(item)} >Buy</Button>
       
             </div>
             </Grid>
         </Grid></div></div>)
         })
     }

    return(<div>
    {matchesMd?<div style={{fontSize:17, fontWeight:'650', margin:'5px  0px '}}>{props?.title}</div>:<div style={{fontSize:26, fontWeight:'650', margin:'10px 0px 20px 0px'}}>{props?.title}</div>}
    <div  style={{display:'flex', flexDirection:'row',width:'100%', marginLeft:'2%',justifyContent:'flex-start',width:"auto",marginTop:'3%' ,background:"#fff"}}>
        {ProductDetail()}
    </div></div>
    )
}