import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData, serverUrl } from "../../services/fetchNodeServices";
import { useState, useEffect, createRef } from "react";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import logo from '../../assets/medbazzar1.png'
import { Button, Divider, Grid, IconButton } from "@mui/material";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";

export default function ProductComponent(props){
    const sld = createRef()
    const navigate = useNavigate()
    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matchesMd?3:6,
        slidesToScroll: 2,
        autoplay: false
    };   

   var dispatch = useDispatch() 
   var product = props?.data

   var productFromRedux=useSelector(state=>state.data)
  var productRedux=Object.values(productFromRedux)
  console.log('productFromRedux;',productFromRedux)

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
    console.log(product)

    const handleProductDetail = (item) =>{
        navigate('/productdetails',{state:{data:item}})
    }

    const ProductDetail=()=>{
       return product?.map((item)=>{
        return( <div >
            <div>
        <Grid container spacing={1} style={{maxWidth:'220px'}} >
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

    const handleForward = () =>{
        sld.current.slickPrev()
    }

    const handleBackward = () =>{
        sld.current.slickNext()
    }

    return(<div style={{width:"95%",position:'relative'}}>
    {matchesMd?<div style={{fontSize:17, fontWeight:'650', margin:'5px  0px '}}>{props?.title}</div>:<div style={{fontSize:26, fontWeight:'650', margin:'10px 0px 20px 0px'}}>{props?.title}</div>}
        {matchesMd?<div></div>:<div style={{zIndex:1, position:'absolute', width:40, height:40, background:'#95a5a6', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.4, top:'50%', left:'2%', cursor:'pointer'}}>
            <ArrowBackIosOutlinedIcon onClick={handleForward}/>
        </div>}
        {matchesMd?<div></div>:<div style={{zIndex:1, position:'absolute', width:40, height:40, background:'#95a5a6', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.4, top:'50%', right:'2%', cursor:'pointer'}}>
        <ArrowForwardIosOutlinedIcon onClick={handleBackward}/>
        </div>}
            <Slider ref={sld} {...settings}>
                {ProductDetail()}
                {/* {data()} */}
            </Slider>
        </div>
    )
}