import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData, serverUrl } from "../../services/fetchNodeServices";
import { useState, useEffect, createRef } from "react";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Skeleton } from "@mui/material";

export default function BrandComponent(props){
    const sld =  createRef()
    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matchesMd?5:7,
        slidesToScroll: 1,
        autoplay: false
    };

    const brands = props.data || []

    const images = brands.map((item)=>{
        return item.picture
    })

    const showBrandSlideShimmer = () =>{
        return ["", "", "", "", "", "", ""]?.map((item) => {
            return (
              <div>
                <Skeleton height={174} width={174} animation="wave">
                    </Skeleton>
              </div>
            )
          })
    }

    const showSlide = () =>{
        return images.map((item)=>{
            return<div> 
                <div style={{display:'flex',marginLeft:12,marginRight:12,boxShadow:'1px 1px 10px 0px #00000010'}}>
                    <img src={`${serverUrl}/images/${item}`} 
                style={{
                width:"80%",
                padding:3,
                display:'block',
                height:'auto',
                borderRadius:10,
                marginLeft:'auto',
                marginRight:'auto'}}
            /></div></div>
        })
    }

    const handleBackward=()=>{
        sld.current.slickNext()
    }

    const handleForward=()=>{
        sld.current.slickPrev()
    }

    return(<div style={{width:"95%",position:'relative'}}>
    {matchesMd?<div style={{fontSize:17, fontWeight:'650', margin:'5px  0px '}}>{props?.title}</div>:<div style={{fontSize:26, fontWeight:'650', margin:'10px 0px 20px 0px'}}>{props?.title}</div>}
       {matchesMd?<div></div>: <div style={{zIndex:1, position:'absolute', width:40, height:40, background:'#95a5a6', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.4, top:'50%', left:'2%', cursor:'pointer'}}>
            <ArrowBackIosOutlinedIcon onClick={handleForward}/>
        </div>}
        {matchesMd?<div></div>:  <div style={{zIndex:1, position:'absolute', width:40, height:40, background:'#95a5a6', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.4, top:'50%', right:'2%', cursor:'pointer'}}>
        <ArrowForwardIosOutlinedIcon onClick={handleBackward}/>
        </div>}
        <Slider ref={sld} {...settings}>
            {brands.length? showSlide() : showBrandSlideShimmer()}
        </Slider>
        </div>
    )
}