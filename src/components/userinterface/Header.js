import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Avatar } from "@mui/material";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import logo from '../../assets/medbazzar1.png';
import {Badge} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider} from "@mui/material";
import DraftsIcon from '@mui/icons-material/Drafts';
import { serverUrl } from "../../services/fetchNodeServices";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../screens/userinterface/HomeCss";
import { useSelector} from "react-redux";
import ShowCartProducts from "./ShowCartProducts";
import { deepOrange } from '@mui/material/colors';
import ShowUser from "./ShowUser";
import LoginIcon from '@mui/icons-material/Login';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { postData } from "../../services/fetchNodeServices";
import LogoutIcon from '@mui/icons-material/Logout';


export default function Header(props)
{
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate()
  var classes = useStyles()
  var products = useSelector((state)=>state.data)
  var user=useSelector((state)=>state.user)
  var keys = Object?.keys(products)
 
  var userData=''
  var userInformation={}
  try{
  userData=Object.values(user)[0].username.split(' ')
  userData=userData[0]

  userInformation=Object.values(user)[0]
  
  }catch(e){ }
  var name1 = userInformation?.username?.charAt(0).toUpperCase()

  const num = Object?.values?.(user)[0]
  console.log(num)
  const [status, setStatus] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenUser, setIsOpenUser] = useState(false)
  const [pattern, setPattern] = useState('')
  const [userStatus, setUserStatus] = useState(false)

  const checkUser = async() =>{
    var result = await postData('users/check_userdata',{mobileno:userInformation?.mobileno})
    if(result.status){
      setUserStatus(true)
    }
    else{
      setUserStatus(false)
    }
}

console.log(userInformation?.mobileno)
useEffect(function(){
   checkUser()
});
console.log('usersatus',userStatus)
  const handleDrawer = () =>{
    setStatus(true)
  }

  const handleClose = () =>{
    setStatus(false)
  }

  const showUserDetails =() =>{
    setIsOpen(false)
    setIsOpenUser(true)
  }

  const hideUserDetails =() =>{
    setIsOpenUser(false)
    
  }

  const showCartDetails = () =>{
    setIsOpen(true)
    setIsOpenUser(false)
  }

  const hideCartDetails = () =>{
    setIsOpen(false)
  }

  const handleLogin = () =>{
    setStatus(true)
    navigate('/login')
  }
   
  const handleFilterPage = ()=>{
    navigate(`/filter/${pattern}`)
  }

  const handleEnter = (e) =>{
    if(e.key=='Enter')
    navigate(`/filter/${e.target.value}`)
  }

  const drawerList = () =>{
    return(
      <Paper>
      <div className={classes.leftBarStyle}>
          {/* <img src={`${serverUrl}/images/icon1.png`} style={{background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)',width:60,height:60,borderRadius:50,padding:10}}/> */}
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{name1}</Avatar>
          <div className={classes.nameStyle}>{userInformation?.username}</div>
          <div className={classes.emailStyle}>{userInformation?.emailid}</div>
          <div className={classes.phoneStyle}>+91 {userInformation?.mobileno}</div>
      </div>
      <div>
      <List >
          <Divider/>
          

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/orders')}>
                  <ListItemIcon>
                  <ShoppingBagIcon style={{color:'red'}}/>
                  </ListItemIcon>
              <ListItemText primary="My Order" />
              </ListItemButton>
          </ListItem>
          <Divider/>

          <ListItem disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                  <ListAltIcon style={{color:'#00391c'}}/>
                  </ListItemIcon>
              <ListItemText primary="My Wishlist" />
              </ListItemButton>
          </ListItem>
          <Divider/>
     
          <ListItem disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                  <AnalyticsIcon style={{color:'#00391c'}}/>
                  </ListItemIcon>
              <ListItemText primary="Sales Report" />
              </ListItemButton>
          </ListItem>
          <Divider/>

          <ListItem disablePadding>
              <ListItemButton onClick={handleLogin}>
                  <ListItemIcon>
                  {userStatus ?<LogoutIcon style={{color:'#00391c'}}/>:<LoginIcon style={{color:'#00391c'}}/>}
                  </ListItemIcon>
              <ListItemText primary={userStatus? "Logout": "Login" } />

              </ListItemButton>
          </ListItem>
      </List>
      </div>
  </Paper> 

    )
  }
  const secondrySearchBar = () =>{
    return(<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background:'#fff'}}>
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
          
            <MenuOutlinedIcon onClick={handleDrawer} style={{fontSize:30,color:'#000', cursor:'pointer'}}/>
            <div >
              {searchBarComponent()}
            </div>
            <div style={{color:'#000', width: 70, display:'flex', justifyContent: 'space-between'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

              <PersonOutlineOutlinedIcon style={{fontSize:30,color:'#000',cursor:'pointer'}} onMouseOver={showUserDetails} onClick={handleLogin}/>
              <div style={{fontSize:'1.7vw', fontWeight:'bolder',color:'#000'}}>{userData}</div>
              </div>
              <PhoneOutlinedIcon style={{fontSize:30,color:'#000'}}/>
            
          </div>
        </Toolbar>
      </AppBar>
    </Box>)
  }
  const searchBarComponent = () =>{
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', margin: 1, display: 'flex', alignItems: 'center', width: matches?200:300 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products Here.."
          inputProps={{ 'aria-label': 'Search Products Here..' }}
          onChange={(e)=>setPattern(e.target.value)}
          onKeyDown={(e)=>handleEnter(e)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon onClick={handleFilterPage} />
        </IconButton>
        
      </Paper>
    );
  }

  const handleLeave = () =>{
    hideCartDetails()
    hideUserDetails()
  }

    return(<Box sx={{ flexGrow: 1, position:'relative' }}  onMouseLeave={handleLeave} >
      <AppBar position="static" style={{background:'#fff'}} >
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
          
            <img src={logo} style={{width:150, cursor:'pointer'}} onClick={()=>navigate('/home')}/>
            <div >
              {!matches?searchBarComponent():<div></div>}
            </div>
            <div style={{color:'#000', width: !matches? 130: 50, display:'flex', justifyContent: 'space-between'}}>
              
              {!matches?<div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
              <PersonOutlineOutlinedIcon style={{fontSize:30,color:'#000',cursor:"pointer"}} onMouseOver={showUserDetails} onClick={handleLogin}/>
              <div style={{fontSize:'0.9vw', fontWeight:'bolder',color:'#000'}}>{userData}</div></div>:<div></div>}
              <Badge badgeContent={keys?.length} color="success">
              <ShoppingCartOutlinedIcon style={{fontSize:30,color:'#000',cursor:'pointer'}} onMouseOver={showCartDetails}/>

              </Badge>
              {!matches?<PhoneOutlinedIcon style={{fontSize:30,color:'#000'}}/>:<div></div>}
            </div>
          
        </Toolbar>
      </AppBar>
     
     <div>
      {matches?secondrySearchBar():<div></div>}
      {/* {`xxx ${matches}`} */}
      <Drawer
            anchor={'left'}
            open={status}
            onClose={handleClose}
          >
            {drawerList()}
          </Drawer>
      </div>
          <ShowUser isOpenUser={isOpenUser} />
          <ShowCartProducts isOpen={isOpen}/>
    </Box>
    )
}