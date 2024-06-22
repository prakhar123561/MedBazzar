import { Paper, Avatar } from "@mui/material"
import { useSelector } from "react-redux"
import {List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider} from "@mui/material";
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import { useState, useEffect } from "react";
import { useStyles } from "../../screens/userinterface/HomeCss";
import { postData } from "../../services/fetchNodeServices";

export default function ShowUser(props){
    var classes = useStyles()
    const navigate = useNavigate()
    const theme = useTheme()
    var user=useSelector((state)=>state.user)
    var  userInformation=Object.values(user)[0]
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const [status, setStatus] = useState(false)

    const checkUser = async() =>{
        var result = await postData('users/check_userdata',{mobileno:userInformation?.mobileno})
        if(result.status){
            setStatus(true)
        }
        else{
            setStatus(false)
        }
    }

console.log(userInformation?.mobileno)
    useEffect(function(){
       checkUser()
    });
    

    const handleLogin=()=>{
        navigate('/login')
        
    }
    console.log(status)


    return(
        <Paper elevation={2} style={{display:props.isOpenUser?'flex':'none', position:'absolute', right:matchesMd?70:60, top:matchesMd?110:60, zIndex:3, padding:5}}>
      
      <div style={{width:200}}>
        
      {status ?<div className={classes.nameStyle} style={{display:'flex', justifyContent:'center',fontSize:18, fontWeight:'bold'}}>✨ Hi, {userInformation?.username}</div>:<></>}
     
      <List >
          <Divider/>
          

          <ListItem disablePadding >
              <ListItemButton style={{height:30}} onClick={()=>navigate('/orders')}>
                  <ListItemIcon>
                      <ShoppingBagIcon style={{color:'red'}}/>
                  </ListItemIcon>
              <ListItemText primary="My Order" />
              </ListItemButton>
          </ListItem>
          <Divider/>

          <ListItem disablePadding>
              <ListItemButton style={{height:30}}>
                  <ListItemIcon>
                      <ListAltIcon style={{color:'#00391c'}}/>
                  </ListItemIcon>
              <ListItemText primary="My Wishlist" />
              </ListItemButton>
          </ListItem>
          <Divider/>
     
          <ListItem disablePadding>
              <ListItemButton style={{height:30}}>
                  <ListItemIcon>
                      <AnalyticsIcon style={{color:'#00391c'}}/>
                  </ListItemIcon>
              <ListItemText primary="Sales Report" />
              </ListItemButton>
          </ListItem>
          <Divider/>

          <ListItem disablePadding >
              <ListItemButton style={{height:30}} onClick={handleLogin}>
                  <ListItemIcon>
                     {status ?<LogoutIcon style={{color:'#00391c'}}/>:<LoginIcon style={{color:'#00391c'}}/>}
                  </ListItemIcon>
              <ListItemText primary={status? "Logout": "Login" } />

              </ListItemButton>
          </ListItem>
      </List>
      </div>
  </Paper>
    )
}