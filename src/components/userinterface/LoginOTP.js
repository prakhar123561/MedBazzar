import { Grid, Button, Input, Paper, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import {useMediaQuery} from "@mui/material";
import { useState } from "react";
import OtpInput from 'react-otp-input';
import GetOTP from "./GetOTP";
import {postData} from '../../services/fetchNodeServices'
import { LoginDetails } from "./LoginDetails";

export default function LoginOTP(){

    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

    const [otp, setOtp] = useState('')
    const [status, setStatus]= useState(true)
    const [mobileno, setMobileno] = useState('')
    const [valid, setValid] = useState(false)
    const [userStatus, setUserStatus] = useState(true)

    const generateOTP = () =>{
        var myotp = parseInt(Math.random()*8999)+1000; //generate a random  4 digit OTP number between 1000 and 2799
        alert(myotp)
        setOtp(myotp)
    }

    const handleOTP = async() =>{
        var result = await postData('users/check_userdata',{mobileno:mobileno})
        if(result.status==false){
            generateOTP()
            setStatus(!status)
            setUserStatus(false)
        }
        else{
            generateOTP()
            setStatus(!status)
            setUserStatus(true)
        }
    }

    const handleValidation = (e) =>{
        const reg = new RegExp("[0-9]{10}")
        setValid(reg.test(e.target.value))
        setMobileno(e.target.value)
    
    }
    
    return( status?<Paper style={{boxShadow:'0 0 15px 3px #EBEFF2', borderRadius:"5%", width:'55%', height:580, display:'flex', justifyContent:'center', alignItems:'center'}}>

        <Grid container spacing={2} style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"column", width:'100%'}}>
            <Grid item xs={10}>
            
            <Grid item xs={12} >
                <div style={{fontSize:28, fontWeight:'bold'}}>Sign In To MedBazzar</div>
            </Grid>
            <Grid item xs={12} style={{marginTop:10}}>
                <div style={{fontSize:12}}>to access your Addresses, Orders & Wishlist</div>
            </Grid>
            <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:20}}>
            <div style={{marginRight:5,fontWeight:'bold'}} >
                +91</div><TextField style={{fontSize:13,fontWeight:'bold'}} inputMode="numeric" error={!valid} autoComplete="off" onChange={(e)=>handleValidation(e)} inputProps={{maxLength:10}} value={mobileno} required={true} variant="standard" placeholder="Enter Your Mobile Number" fullWidth />
            </Grid>
        
            <Grid item xs={12} style={{marginTop:140}}>
                <Button variant="contained" onClick={handleOTP} disabled={!valid} fullWidth>Get OTP</Button>
            </Grid>
            <Grid item xs={12} style={{marginTop:30}}>
                <p style={{fontSize:12}}>By continuing you agree to our <span style={{color:'#055678'}}>
                    Terms  of Service</span> and <span style={{color:'#055678'}}>Privacy & Legal Policy</span>.</p>
            </Grid>

            </Grid>
        </Grid>
        </Paper>:userStatus==true?<GetOTP mobileno={mobileno} otp={otp}/>:<LoginDetails mobileno={mobileno} otp={otp}/>
    )


}