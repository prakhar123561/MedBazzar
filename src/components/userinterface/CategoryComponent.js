import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData, serverUrl } from "../../services/fetchNodeServices";
import { useState, useEffect, createRef } from "react";
import { Grid } from "@mui/material";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Skeleton} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CategoryComponent(props){
    const sld = createRef()
    const theme = useTheme()
    const navigate = useNavigate()
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

    var category = props?.data || []

    const handleGotoFilterPage=(item)=>{
        navigate('/filter/null',{state:{categoryid:item.categoryid,categoryname:item.categoryname}})
    }

    const showCategorySlideShimmer = () =>{
        return ["", "", "", "", "", "", ""]?.map((item) => {
            return (
              <div>
                <Skeleton height={174} width={174} animation="wave">
                    </Skeleton>
              </div>
            )
          })
    }
    
    const showImages = (item) =>{
        var images = item.picture.split(',')
        return images?.map((image)=>{
        return <div onClick={()=>handleGotoFilterPage(item)} style={{cursor:'pointer'}}>
            
               <div style={{marginLeft:3,marginRight:3,width:"100%",display:'block',borderRadius:10}}>
                <img src={`${serverUrl}/images/${image}`} 
            style={{
                width:"90%",
                height:'auto',
                borderRadius:10,
                marginLeft:'auto',
                marginRight:'auto',
                background:'#e7eaee'}}
                
            /></div>
                
        </div>
        
        })
    }

    var showNames=(item)=>{
        var names = item.categoryname.split(',')
        return names.map((name)=>{
            return <div>
                {name}                    
                    
            </div>
            
            })

    }

    var showcategory=()=>{
        return category?.map((item)=>{
            return(
                <div>
                    <Grid container spacing={2} style={{display:'flex',flexDirection:'column'}}>
                        <Grid item xs={12}>
                            <div
                            style={{
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                flexDirection:'column',
                                gap:2,
                                fontSize:matchesMd?12:16,
                                fontFamily:'kanit',
                                fontWeight:950
                            }}>
                            {showImages(item)}
                            {showNames(item)}
                            </div>
                        </Grid>
                        
                    </Grid>
                </div>
            )
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
            <div style={{zIndex:1, position:'absolute', width:matchesMd?25:40, height:matchesMd?25:40, background:'#95a5a6', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.4, top:'50%', left:'2%', cursor:'pointer'}}>
            <ArrowBackIosOutlinedIcon onClick={handleForward}/>
        </div>
        <div style={{zIndex:1, position:'absolute', width:matchesMd?25:40, height:matchesMd?25:40, background:'#95a5a6', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.4, top:'50%', right:'2%', cursor:'pointer'}}>
        <ArrowForwardIosOutlinedIcon onClick={handleBackward}/>
        </div>
        <Slider ref={sld} {...settings}>
            { category.length? showcategory() : showCategorySlideShimmer()}
        </Slider>
        </div>
    )
}