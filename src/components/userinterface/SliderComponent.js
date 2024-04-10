import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { createRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { serverUrl } from "../../services/fetchNodeServices";


export default function SliderComponent(props){
    const sld = createRef()
    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: matchesMd?1:3,
        slidesToScroll: 1,
        autoplay: true
    };

    const banners = props?.data
    const images = Object.values(banners)[0]?.picture.split(',')
    
    const showSlide = () =>{
        return images?.map((item)=>{
            return <div ><img src={`${serverUrl}/images/${item}`} 
            style={{
                width:"95%",
                height:200,
                borderRadius:10,
                marginLeft:'auto',
                marginRight:'auto'}}
            /></div>
        })
    }
    const handleBackward=()=>{
        sld.current.slickNext()
    }
    const handleForward=()=>{
        sld.current.slickPrev()
    }
    return(<div style={{width:'95%', position:'relative'}}>
        {matchesMd?<div></div>:<div style={{zIndex:1, position:'absolute', width:40, height:40, background:'#95a5a6', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.4, top:'40%', left:'2%', cursor:'pointer'}}>
            <ArrowBackIosOutlinedIcon onClick={handleForward}/>
        </div>}
        {matchesMd?<div></div>:<div style={{zIndex:1, position:'absolute', width:40, height:40, background:'#95a5a6', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.4, top:'40%', right:'2%', cursor:'pointer'}}>
            <ArrowForwardIosOutlinedIcon onClick={handleBackward}/>
        </div>}
        <Slider ref={sld} {...settings}>
            {showSlide()}
        </Slider>
    
    </div>
    )
}