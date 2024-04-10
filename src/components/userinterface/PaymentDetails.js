import { Grid, Typography, Button } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import PercentSharpIcon from '@mui/icons-material/PercentSharp';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import {useNavigate} from 'react-router-dom'

export default function PaymentDetails(props){
    var navigate = useNavigate()

    var productFromRedux = props.products
    
    var product=Object.values(productFromRedux)
    var keys = Object?.keys(productFromRedux)
    var len = keys.length

    
    var totalamount = product.reduce((p1,p2)=>{
        var amt = p2.qty*p2.price
        return p1+amt
    },0)
    
    var amountpaid = product.reduce((p1,p2)=>{
        var amt = p2.qty*(p2.offerprice>0? p2.offerprice : p2.price)
        return p1+amt
    },0)
    
    var benefit = parseInt(13*amountpaid)
    var save = totalamount - amountpaid

    const paymentDetails =()=>{ 
        
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',margin:20,width:'100%', paddingRight:10}}>
            <Grid container spacing={1} style={{maxWidth:'500px', paddingRight:8}}>
                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Typography component="div" style={{width:'100%'}}>
                        <Typography style={{fontSize:16,fontWeight:600,paddingLeft:16}} component="h2">Payment Details</Typography>
                         {/* first about total */}
                        <Typography component="div" style={{display:'block', cursor:'default',padding:'20px 16px'}}>
                            <Typography component="div" style={{padding:'0px 8px 4px 8px'}}>
                                <Typography style={{display:'flex', alignItems:'center', justifyContent:'space-between',paddingBottom:12, fontSize:16,cursor:'default'}}>
                                    <Typography component="p" style={{fontSize:14, fontWeight:400}}>Total Amount</Typography>
                                    <Typography component='p' style={{fontSize:16, fontWeight:600}}>&#x20B9;{totalamount}.00</Typography>
                                </Typography>
                                <Typography component="div" style={{display:'flex', justifyContent:'space-between',paddingBottom:12}}>
                                    <Typography component="div" style={{gap:4, display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <Typography component="p" style={{fontSize:14, fontWeight:400}}>Amount Paid</Typography>
                                        <InfoIcon sx={{fontSize:14, fill:'rgb(100, 116, 139)'}}/>
                                    </Typography>
                                        <Typography component="p" style={{fontSize:12, fontWeight:600, color:'#00522b'}}>&#x20B9;{amountpaid}.0</Typography>
                                </Typography>
                                <Typography component="div" style={{display:'flex', justifyContent:'space-between',paddingBottom:12}}>
                                    <Typography component="p" style={{fontSize:14, fontWeight:400}}>Saving</Typography>
                                    <Typography component="p" style={{fontSize:12, fontWeight:600, color:'#00522b'}}>&#x20B9;{save}.00</Typography>
                                </Typography>
                            </Typography>
                            <Typography component="div" style={{background:'#fff212',display:'flex', alignItems:'center', justifyContent:'space-between',padding:8,borderRadius:5}}>
                                <Typography component="h2" style={{fontSize:14, fontWeight:700}}>Order Total</Typography>
                                <Typography component="h2" style={{fontSize:16, fontWeight:700}}>&#x20B9;{amountpaid}.00</Typography>
                            </Typography>
                            <Typography component="p" style={{fontStyle:'italic', fontSize:12, paddingTop:12, opacity:0.7}}>Price may vary depending on the product batch*</Typography>
                        </Typography>

                         {/* second about coupan */}
                        <Typography component="div" style={{cursor:'pointer',borderTop:1.6,borderBottom:1.6,margin:'8px 0px',borderBottomColor:'rgb(231 234 238)',borderTopColor:'rgb(231 234 238)',borderLeftColor:'rgb(255,255,255)',borderRightColor:'rgb(255,255,255)',borderStyle:'solid'}}>
                        <Typography component='div' style={{paddingTop:16,paddingBottom:8,paddingLeft:16,paddingRight:16}}>

                        <Typography component="div" style={{cursor:'pointer',display:'flex',alignItems:'flex-start', gap:4}}>
                                <Typography component="div" style={{cursor:'pointer',display:'block'}} >
                                    <PercentSharpIcon sx={{fontSize:16,fontWeight:'bold',color:'green',border:'2px solid green',padding:0.5,borderRadius:'50%',cursor:'pointer'}}/>
                                </Typography>
                            <Typography component="div" style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', paddingBottom:8, width:'100%'}}>
                                <Typography component="div">
                                    <Typography component="h2" style={{fontSize:14, fontWeight:600}}>Use Coupons</Typography>
                                    <Typography component="p" style={{fontSize:12, fontWeight:400,opacity:1,color:"grey"}}>Also get a coupon code after placing this order</Typography>
                                </Typography>
                                <Typography component="div">
                                    <NavigateNextOutlinedIcon/>
                                </Typography>
                            </Typography>
                            </Typography>
                        </Typography>
                        </Typography>
                        {/*Get delivered and login*/}
                        <Typography component="div" style={{marginTop:10}}>
                            <Typography component="div" style={{height:20, padding:" 16px 12px", background:"#ffc43d", display:'flex', justifyContent:'flex-start', alignItems:'center', borderTopRightRadius:10, borderTopLeftRadius:10, gap:10}}>
                            <InfoIcon sx={{fontSize:24}}/><p style={{fontSize:12}}>Shop for {benefit}.00 more to get free delivery</p>
                            </Typography>
                            <Typography component="div" style={{borderBlockWidth:"1px", borderLeftWidth: '1px', borderRightWidth: '1px', borderColor: 'rgb(231 234 238)', borderBottomLeftRadius:10, borderBottomRightRadius:10, borderStyle: 'solid'}}>
                                <Typography component="div" style={{padding:"16px 8px",  height:25, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <Typography component="div">
                                        <Typography component="p" style={{fontSize:10, opacity:0.8}}>{len} ITEM</Typography>
                                        <Typography component="h2" style={{fontSize:12, fontWeight:600}}>&#x20B9;{amountpaid}.00</Typography>
                                    </Typography>
                                    <Typography component="div">
                                        {props.status}
                                        {props.status?<Button>Address</Button>:<Button style={{background:"#00391c", fontWeight:'bold', color:'#fff', padding:"10px 38px", fontSize:12}} onClick={()=>navigate('/login')}>Login to proceed</Button>}
                                    </Typography>
                                </Typography>
                            </Typography>
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

return(
    <div>
        {paymentDetails()}
    </div>
)
}