import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { postData } from "../../services/fetchNodeServices";

export default function AddAddress(props){

    const [open, setOpen] = useState(false)
    const [addressOne,setAddressOne]=useState('')
    const [addressTwo,setAddressTwo]=useState('')
    const [landmark,setLandmark]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [pincode,setPincode]=useState('')

    const handleClose = () =>{
        props.setStatus(false)
       
    }

    const handleSubmit = async() =>{
        var body={mobileno:props?.userData?.mobileno,address:addressOne+";"+addressTwo,landmark,state,city,pincode}
        var result=await postData('users/submit_user_address',body)
        if(result.status)
        {alert("ok")
      
       
    }
    else{alert("Fail")}
    props.setStatus(false)
        props.setPageRefresh(!props.pageReferesh)
    }

    const DrawerList = () =>{
    return(<Box sx={{ width: 400 }}>
        <div style={{fontSize:26, fontWeight:900, marginLeft:20, marginTop:10, display: 'flex', justifyContent:'space-between', width:'90%'}}>Add Address<div style={{marginLeft:'30%',cursor:'pointer'}} onClick={handleClose}><CloseIcon/></div></div>
        <div style={{fontsize:14, fontWeight:900, marginLeft:20, marginTop:20}}>{props?.userData?.username} Enter Your Address Details</div>
        <List>

            <ListItem>
                <ListItemText><TextField onChange={(event)=>setAddressOne(event.target.value)} label="Address Line One" variant="standard" style={{width:'90%'}} /></ListItemText>
            </ListItem>

            <ListItem>
                <ListItemText><TextField onChange={(event)=>setAddressTwo(event.target.value)} label="Address Line Two" variant="standard" style={{width:'90%'}} /></ListItemText>
            </ListItem>

            <ListItem style={{gap:12}}>
                <ListItemText>
                    <TextField label="State" variant="standard"  onChange={(event)=>setState(event.target.value)} style={{width:'41%',marginRight: '5%'}}/>
                    <TextField label="City" onChange={(event)=>setCity(event.target.value)} variant="standard" style={{width:'45%'}}/>
                </ListItemText>
            </ListItem>

            <ListItem>
                <ListItemText><TextField onChange={(event)=>setLandmark(event.target.value)} label="Landmark" variant="standard" style={{width:'90%'}}/></ListItemText>
            </ListItem>

            <ListItem>
                <ListItemText><TextField  onChange={(event)=>setPincode(event.target.value)} label="Pincode" variant="standard" style={{width:'90%'}}/></ListItemText>
            </ListItem>


            <ListItem>
                <ListItemText>
                    <Button variant="contained" onClick={handleSubmit} style={{borderRadius:25, padding:13}} fullWidth>Save & Proceed</Button>
                </ListItemText>
            </ListItem> 
        </List>
        </Box>)}

        return( <div>
            
            <Drawer 
            anchor={"right"}
            open={props.status} 
            onClose={handleClose}>
                {DrawerList()}
          </Drawer>
          </div>)
}