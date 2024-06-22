import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid } from "@mui/material";
import { getData, serverUrl } from "../../services/fetchNodeServices";
import { useState, useEffect, createRef } from "react";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import logo from '../../assets/medbazzar1.png'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Magnifier from "react-magnifier";

export default function ProductPictures(props){
    const sld = createRef()
    var theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: status?3:1,
        slidesToScroll: 1,
        autoplay: true
    };

    var [indexVal,setIndexVal] = useState(0)
    var [status, setStatus] = useState(false)
    var productPics = props?.item
    var images = productPics.multi_picture.split(',')

    const handleClick=(i)=>{
        
        setIndexVal(i)
    }

    const showSlide = () =>{
        return images.map((item,i)=>{
            return( <div style={{marginLeft:3,marginRight:3,width:"100%",display:'flex',justifyContent:'center',borderRadius:10}}>
                {/* <img src={`${serverUrl}/images/${item}`} 
                key={i}
            style={{
                width:"60%",
                height:'auto',
                borderRadius:10,
                marginTop:10,
                marginLeft:'auto',
                marginRight:'auto'}}
            /> */}
            <Magnifier mgShape='square' mgWidth={150} mgHeight={150} src={`${serverUrl}/images/${item}`} width={500} style={{
                width:"60%",
                height:'auto',
                borderRadius:10,
                marginTop:10,
                marginLeft:'auto',
                marginRight:'auto'}} />
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

    const handleForward = () =>{
        sld.current.slickPrev()
    }

    const handleBackward = () =>{
        sld.current.slickNext()
    }

    return (<div style={{ marginRight:'30%', width:'85%'}}>
        
            <Grid container spacing={2} style={{maxWidth:'700px',marginLeft:20}}>
                <Grid item xs={12} style={{width:'60%'}}>
                            <Slider {...settings}>
                            {showSlide()}
                            </Slider>
                    
                       {matchesMd?<></> :<div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',width:'100%',marginTop:20}}>
                        {showPictures()}
                        </div>}
                </Grid>
            </Grid>
        </div>
    )
}