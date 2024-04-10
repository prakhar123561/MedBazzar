import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid } from "@mui/material";
import { getData, serverUrl } from "../../services/fetchNodeServices";
import { useState, useEffect, createRef } from "react";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import logo from '../../assets/medbazzar1.png'


export default function ProductPictures(props){

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    var [indexVal,setIndexVal] = useState(0)
    var productPics = props?.item
    var images = productPics.multi_picture.split(',')

    const handleClick=(i)=>{
        
        setIndexVal(i)
    }

    const showSlide = () =>{
        return images.map((item,i)=>{
            return( <div style={{marginLeft:3,marginRight:3,width:"100%",display:'flex',justifyContent:'center',borderRadius:10}}>
                <img src={`${serverUrl}/images/${item}`} 
                key={i}
            style={{
                width:"60%",
                height:'auto',
                borderRadius:10,
                marginTop:10,
                marginLeft:'auto',
                marginRight:'auto'}}
            />
            <div style={{marginLeft:'70%',width:'50%'}}><img src={logo} style={{width:50}}/></div>
            </div>)
        })
    }

    const showPictures = () =>{
        return images.map((item,i)=>{
            return(<div style={{marginLeft:3,marginRight:3,width:"100%",display:'flex',justifyContent:'center',borderRadius:10}}>
                <img onClick={()=>{handleClick(i)}} src={`${serverUrl}/images/${item}`} 
            style={{
                width:"60%",
                height:'auto',
                borderRadius:10,
                marginTop:10,
                marginLeft:'auto',
                marginRight:'auto'}}
            />
            </div>)
        })
    }

    return (<div style={{marginRight:10}}>
        <div style={{marginRight:'30%'}}>
            <Grid container spacing={2} style={{maxWidth:'500px',marginLeft:20}}>
                <Grid item xs={12} style={{width:'60%'}}>
                            <Slider {...settings}>
                            {showSlide()}
                            </Slider>
                    
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',width:'100%',marginTop:20}}>
                        {showPictures()}
                        </div>
                </Grid>
            </Grid>
        </div></div>
    )
}