import { useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
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

export default function Header(props)
{
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate()
  var classes = useStyles()
  var products = useSelector((state)=>state.data)
  var keys = Object?.keys(products)

  console.log('count:',keys?.length)
  const [status, setStatus] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleDrawer = () =>{
    setStatus(true)
  }

  const handleClose = () =>{
    setStatus(false)
  }

  const showCartDetails = () =>{
    setIsOpen(true)
  }

  const hideCartDetails = () =>{
    setIsOpen(false)
  }

  const drawerList = () =>{
    return(
      <Paper>
      <div className={classes.leftBarStyle}>
          <img src={`${serverUrl}/images/icon1.png`} style={{background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)',width:60,height:60,borderRadius:50,padding:10}}/>
          <div className={classes.nameStyle}>{'alice'}</div>
          <div className={classes.emailStyle}>{'alice@gmail.com'}</div>
          <div className={classes.phoneStyle}>{'+919098276799'}</div>
      </div>
      <div>
      <List >
          <Divider/>
          <ListItem disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                      <DashboardIcon/>
                  </ListItemIcon>
              <ListItemText primary="Dashboard" />
              </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
                  <ListItemIcon>
                      <DraftsIcon/>
                  </ListItemIcon>
              <ListItemText primary="Category List" />
              </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}>
                  <ListItemIcon>
                      <DraftsIcon/>
                  </ListItemIcon>
              <ListItemText primary="SubCategory List" />
              </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrand')}>
                  <ListItemIcon>
                      <DraftsIcon/>
                  </ListItemIcon>
              <ListItemText primary="Brand List" />
              </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/admindashboard/displayallproduct')}>
                  <ListItemIcon>
                      <DraftsIcon/>
                  </ListItemIcon>
              <ListItemText primary="Product List" />
              </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetail')}>
                  <ListItemIcon>
                      <DraftsIcon/>
                  </ListItemIcon>
              <ListItemText primary="Product Details List" />
              </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/admindashboard/displayallbanner')}>
                  <ListItemIcon>
                      <DraftsIcon/>
                  </ListItemIcon>
              <ListItemText primary="Banners" />
              </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/admindashboard/concern')}>
                  <ListItemIcon>
                      <DraftsIcon/>
                  </ListItemIcon>
              <ListItemText primary="Concern" />
              </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                      <DraftsIcon/>
                  </ListItemIcon>
              <ListItemText primary="Sales Report" />
              </ListItemButton>
          </ListItem>
          <Divider/>

          <ListItem disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                      <DraftsIcon/>
                  </ListItemIcon>
              <ListItemText primary="Logout" />
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
          
            <MenuOutlinedIcon onClick={handleDrawer} style={{fontSize:30,color:'#000'}}/>
            <div >
              {searchBarComponent()}
            </div>
            <div style={{color:'#000', width: 70, display:'flex', justifyContent: 'space-between'}}>
              
              <PersonOutlineOutlinedIcon style={{fontSize:30,color:'#000'}}/>
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
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        
      </Paper>
    );
  }

    return(<Box sx={{ flexGrow: 1, position:'relative' }} onMouseLeave={hideCartDetails} >
      <AppBar position="static" style={{background:'#fff'}}>
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
          
            <img src={logo} style={{width:150}}/>
            <div >
              {!matches?searchBarComponent():<div></div>}
            </div>
            <div style={{color:'#000', width: !matches? 110: 50, display:'flex', justifyContent: 'space-between'}}>
              
              {!matches?<PersonOutlineOutlinedIcon style={{fontSize:30,color:'#000'}}/>:<div></div>}
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
          <ShowCartProducts isOpen={isOpen} />
    </Box>
    )
}