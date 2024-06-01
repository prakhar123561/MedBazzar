import {Grid, Button, TextField, Paper} from '@mui/material'
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from "react-router-dom";
import LoginOTP from './LoginOTP';
import { useDispatch } from 'react-redux';

export default function GetOTP(props){
    
    var navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [status, setStatus] = useState(true) // false means not submitted yet. true means otp has been sent 
    const [valid, setValid] = useState(false)  // Valid OTP or not

    var dispatch=useDispatch()

    const handleVerifyOtp=()=>{
        if(otp==props.otp){
        dispatch({type:'ADD_USER',payload:[props?.mobileno,props?.userData]})
        navigate('/cart')}
        else{
            alert('Invalid OTP')
        }
    }

    
    
    return(status?<Paper style={{boxShadow:'0 0 15px 3px #EBEFF2', borderRadius:"5%", width:'55%', height:580, display:'flex', justifyContent:'center', alignItems:'center'}}>

    <Grid container spacing={2} style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"column", width:'100%'}}>
        <Grid item xs={10}>
        
        <Grid item xs={12} >
            <div style={{fontSize:28, fontWeight:'bold'}}>Verify Phone Number</div>
        </Grid>
        <Grid item xs={12} style={{marginTop:10}}>
            <div style={{fontSize:14, fontWeight:'bold'}}><span style={{color:'grey'}}>An SMS with 6-digit OTP was sent to  </span> +91 {props.mobileno} <span style={{color:'#055678', cursor:'pointer'}} onClick={()=>setStatus(!status)}>Change</span></div>
        </Grid>
        <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:20, flexDirection:'column'}}>
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputStyle={{ width:40, height:40, margin:5}}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
       />
       <p style={{color:'#055678', fontWeight:'bold', fontSize:12, cursor:'pointer'}}>Resend OTP</p>
       </Grid>
        <Grid item xs={12} style={{marginTop:30}}>
       
        </Grid>
        <Grid item xs={12} style={{marginTop:100}}>
            <Button variant="contained" onClick={handleVerifyOtp} fullWidth style={{borderRadius:20, padding:10, fontWeight:'bold'}}>Verify </Button>
        </Grid>
        <Grid item xs={12} style={{marginTop:30}}>
            <p style={{fontSize:12}}>By continuing you agree to our <span style={{color:'#055678'}}>
                Terms  of Service</span> and <span style={{color:'#055678'}}>Privacy & Legal Policy</span>.</p>
        </Grid>

        </Grid>
    </Grid>
    </Paper>:<LoginOTP/>)
}