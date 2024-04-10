import { Grid, Button, TextField, Paper } from "@mui/material";
import { useState } from "react";
import {useTheme} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginOTP from './LoginOTP';
import OtpInput from 'react-otp-input';
import {useNavigate} from 'react-router-dom'
import { postData } from "../../services/fetchNodeServices";
import Cart from "../../screens/userinterface/Cart";

export function LoginDetails(props){

    var navigate = useNavigate()

    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState("")
    const [emailId, setEmailId] = useState("")
    const [mobileno, setMobileno] = useState(props.mobileno)
    const [otp, setOtp] = useState('')
    const [status, setStatus] = useState(true)

    const handleSubmit = async() =>{
        if(otp==props.otp){
            const result = await postData('users/submit_user',{mobileno:mobileno, emailid:emailId, username: (userFirstName+ " "+userLastName)})
            if(result.status){
            alert(result.message)
            navigate('/cart',status)
            }
            else{
                alert("Invalid OTP")
            }
         }
          
    }
    
        return(
            status?<Paper style={{boxShadow:'0 0 15px 3px #EBEFF2', borderRadius:"5%", width:'55%', height:750, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Grid container spacing={2} style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"column"}}>
                <Grid item xs={10}> 
                <Grid item xs={12}>
                <div style={{fontSize:28, fontWeight:'bold'}}>Welcome To MedBazzar</div>                
                </Grid>

                <Grid item xs={12} style={{marginTop:10}}>
                <div style={{fontSize:12}}>Please enter your details for a better shopping experience</div>
            </Grid>
                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:5}}>
                   <TextField variant="standard" label="Enter First Name" value={userFirstName} required onChange={(e)=>setUserFirstName(e.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:5}}>
                   <TextField variant="standard" label="Enter Last Name (Optional)" value={userLastName} onChange={(e)=>setUserLastName(e.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:5}}>
                   <TextField variant="standard" label="Enter Email ID (Optional)" value={emailId} onChange={(e)=>setEmailId(e.target.value)} fullWidth/>
                </Grid>


                <Grid item xs={12} >
            <div style={{fontSize:28, fontWeight:'bold', marginTop:40}}>Verify Phone Number</div>
        </Grid>
        <Grid item xs={12} style={{marginTop:10}}>
            <div style={{fontSize:14, fontWeight:'bold'}}><span style={{color:'grey'}}>
                An SMS with 6-digit OTP was sent to  </span > +91 {mobileno} <span style={{color:'#055678',
                 cursor:'pointer'}} onClick={()=>setStatus(!status)}>Change</span></div>
        </Grid>
        <Grid item xs={12} style={{display:'flex', justifyContent:'flex-start', alignItems:'flex-start',
        marginTop:20, flexDirection:'column'}}>
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputStyle={{ width:45, height:45, margin:10}}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
       />
       <p style={{color:'#055678', fontWeight:'bold', fontSize:14}}>Resend OTP</p>
       </Grid>
        <Grid item xs={12} style={{marginTop:30}}>
       
        </Grid>
        <Grid item xs={12} style={{marginTop:20}}>
            <Button variant="contained" onClick={handleSubmit} fullWidth style={{borderRadius:20,
                 padding:10, fontWeight:'bold', background:"#0078ac"}}>Get Started </Button>
        </Grid>
                
                
                <Grid item xs={12} style={{marginTop:30}}>
                <p style={{fontSize:12}}>By continuing you agree to our <span style={{color:'#055678'}}>
                    Terms  of Service</span> and <span style={{color:'#055678'}}>Privacy & Legal Policy</span>.</p>
                </Grid>
                </Grid>
                </Grid>
                </Paper>:<LoginOTP/>
            
        )
    

}