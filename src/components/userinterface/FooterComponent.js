import { useState, useEffect } from "react";
import { Divider, Grid } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import PhoneInTalkTwoToneIcon from '@mui/icons-material/PhoneInTalkTwoTone';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { getData, postData } from "../../services/fetchNodeServices";
import { EmailOutlined } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function FooterComponent(props){

    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

    const [subCategoryData, setSubCategoryData] = useState([])

 
    const fetchAllSubCategory = async() =>{
        var result = await getData('userinterface/display_all_subcategory')
        if(result.status){
            console.log('RRRRRR:',result.message)
            setSubCategoryData(result.data)
        }
    } 


    useEffect(function(){
        fetchAllSubCategory()
    },[])

    // const cid= categoryData.map((item)=>[item.categoryid])
    // console.log(cid)

    var category = props?.data

    const cname= category?.map((item)=>{
            return [item.categoryname]
        })    

       
    const showcategory= ()=>{
        return cname.map((item)=>{
            return <li style={{listStyle:'none',paddingTop:10,fontSize:14,fontWeight:"400",color:'rgb(208, 213, 221)',cursor:'pointer'}}>{item}</li>
        })
    }    

    const scname= subCategoryData.map((item)=>{
        return [item.subcategoryname]
    })
    console.log('scname',scname)

   
const showsubcategory= ()=>{
    return scname.map((item)=>{
        return <div>{item}</div>
    })
}

    return(<div style={{width:'100%', background:'#323a46',color:'#A0ABBB'}}>
        <Grid container spacing={1} >
            <Grid item xs={6} style={{display:'flex', justifyContent:'flex-start', alignItems:'center', width:'80%',flexDirection:'column'}}>
                
                <p style={{width:'64%',fontSize:16,fontWeight:600}}>Follow us</p>

                <div style={{width:'64%'}}>
                <div style={{ width:'40%', cursor:'pointer',display:'flex',justifyContent:'space-between'}}>
                    <FacebookIcon sx={{fontSize:42}}/>
                    <InstagramIcon sx={{fontSize:40}}  />
                    <XIcon sx={{fontSize:40}}/>
                    <LinkedInIcon sx={{fontSize:42,color:'#aac9cc'}}/>
                </div></div>
             <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',paddingTop:15,width:'65%'}}>
            <Grid item xs={3} style={{display:'flex', justifyContent:'flex-start', paddingTop:20, paddingBottom:20}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',fontSize:16,fontWeight:600}}>
                    Categories
                    <ul style={{padding:0}}>
                        {showcategory()}
                    </ul>
                    
                </div>

            </Grid>

            <Grid item xs={3} style={{display:'flex', justifyContent:'flex-start', paddingTop:20, paddingBottom:20,fontSize:16,fontWeight:600}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column'}}>
                    Medicines
                    <ul style={{width:'100%'}}>
                        
                    </ul>
                    
                </div>

            </Grid>

            <Grid item xs={3} style={{display:'flex', justifyContent:'flex-start', paddingTop:20, paddingBottom:20,fontSize:16,fontWeight:600}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                Others
                    <ul style={{width:'100%'}}>
                        
                    </ul>
                    
                </div>

            </Grid>
           
           </div>
                
            </Grid>

            <Grid item xs={6} style={{display:'flex', justifyContent:'left', flexDirection:'column',marginTop:10}}>
                <p style={{width:'60%',fontSize:16,fontWeight:600}}>Download the Mobile App</p>
                <div style={{display:'flex',alignItems:'center', flexDirection:'row', width:'30%', gap:10}}>
                <img src="google-play.png"  style={{cursor: 'pointer',width: 140,height:35}}/>
                <img src="applestore.jpg" style={{cursor: 'pointer',width: 120, borderRadius:'10%'}}/>
                </div>
                
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'30%',height:'25%',marginTop:20}}>
            <EmailOutlined sx={{fontSize:36,color:'#f5f5f5'}}/>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'flex-start',flexDirection:'column',gap:4}}>
            <span style={{fontSize:18,fontWeight:600,}}>Email Us</span>
            <span style={{fontSize:18,color:'#d0d5dd'}}>info@medbazzar.in</span>
            </div>
            </div>

            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'32%',height:'25%',marginTop:30,marginBottom:20}}>
            <PhoneInTalkTwoToneIcon sx={{fontSize:36,color:'#f5f5f5'}}/>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'flex-start',flexDirection:'column',gap:4}}>
            <span style={{fontSize:18,fontWeight:600,}}>Give us a missed call</span>
            <span style={{fontSize:18,color:'#d0d5dd'}}>1800 266 2477</span>
            </div>
            </div>

            <Divider style={{width:'80%',background:"#a0abbb"}}/>

            <div style={{width:'80%'}}>
            <p style={{fontSize:18,fontWeight:600}}> 15 Years of Trust</p>
            <p style={{color:'#d0d5dd'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type 
            and scrambled it to make a type specimen book. It has survived not only five centuries.
            </p>
            </div>

            </Grid>
            
        </Grid>
        <hr color="#fff" align='center'/>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 80}}><p>@2024 MedBazzar.in <CopyrightIcon/></p></div>
    </div>)
}