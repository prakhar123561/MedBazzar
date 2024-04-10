import { Button, Divider, Grid, Slide } from "@mui/material";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import parse from 'html-react-parser';
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductInformation(props){

    var navigate = useNavigate()
    const [width, setWidth] = useState(true)

    var productinfo
    var dispatch = useDispatch()

    var productFromRedux=useSelector(state=>state.data)
    var values=Object.values(productFromRedux)

    if(values?.length==0)
    {
        productinfo=props?.item
        productinfo['qty']=0
        
    }
    else
    {
     
       var prd=productFromRedux[props.item?.productdetailid]

       if(prd===undefined)
       {
        productinfo=props?.item
        productinfo['qty']=0
       }
       else
       {
        productinfo=prd
       }     
    
    } 

    const handleChange=(v,productinfo)=>{
        // alert(v)
        if(v>0){
            productinfo['qty']=v
            
            dispatch({type:"ADD_PRODUCT",payload:[productinfo.productdetailid,productinfo]})
        }
        else{
            dispatch({type:"DELETE_PRODUCT",payload:[productinfo.productdetailid]})
        }
        
        props.setPageRefresh(!props.pageRefresh)

    }

    return(
        <div style={{marginTop:10}}>
            <Grid container spacing={0} style={{maxWidth:'70%'}}>
                <Grid item xs={12} >
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%', height: 20}}>
                    
                    <h2>{productinfo.productname}</h2> 
                    
                   <div style={{width:60,display:'flex',justifyContent:'space-between'}}><BookmarkAddOutlinedIcon/>
                   <ShareOutlinedIcon/></div>
                   </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{display:'flex',flexDirection:'row',gap:2,justifyContent:'space-between',alignItems:'center',width:'52%'}}>
                        <h4 style={{fontWeight:400}}>{productinfo.productsubname}</h4>
                        <p style={{width:3,height:3,border:'1px solid #000',borderRadius:'50%',background:'#000',marginLeft:3,marginRight:3}}></p>
                        <h4 style={{fontWeight:400}}>{productinfo.weight}{productinfo.weighttype}</h4>
                        <p style={{width:3,height:3,border:'1px solid #000',borderRadius:'50%',background:'#000',marginLeft:3,marginRight:3}}></p>
                        {/* <span style={{content:'',width:'2%',height:9,left:10,bottom:-10,background:'#000',borderRadius:'50%'}}></span> */}
                        <h4 style={{color:'#DC362E',background:'#FEE4E2',borderRadius:50,padding:'4px 8px',fontWeight:400}}><span>Available</span></h4>
                    </div>
                </Grid>
                <Grid item xs={12}>
                <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'40%'}}>
                        <p style={{fontWeight:'bold',fontSize:24}}>&#x20B9;{productinfo.offerprice}</p>
                        <p><s>MRP &#x20B9;{productinfo.price}</s></p>
                        <h4 style={{color:'#000',background:'orange',borderRadius:50,padding:'4px 8px',fontWeight:600, opacity:0.5, fontWeight:400}}>20% Off</h4>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{display:'flex',justifyContent:"space-between",width:'70%'}}>
                        <div style={{width:'40%', display:'flex', justifyContent:'center'}}>
                        <PlusMinusComponent qty={productinfo?.qty} width={width} onChange={(v)=>handleChange(v,productinfo)}/></div>
                        <Button variant="contained" style={{background:'#00391c',padding:'10px 20px',border:'1px solid #00391c'}} onClick={()=>navigate('/home')} >Continue Shopping</Button>
                        
                    </div>
                </Grid>
                {/* <Grid item xs={12} style={{width:'50%'}}>
                    <div style={{display:'flex', justifyContent:'space-evenly', marginTop:10, border:'1px solid #000', height:'auto'}}>
                        {parse(productinfo.pd_description)}
                    </div>
                </Grid> */}
            </Grid>
        </div>
    )
}