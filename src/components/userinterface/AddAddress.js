import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { postData } from "../../services/fetchNodeServices";
import Swal from "sweetalert2";

export default function AddAddress(props) {



    const [open, setOpen] = useState(false)
    const [addressOne, setAddressOne] = useState('')
    const [addressTwo, setAddressTwo] = useState('')
    const [landmark, setLandmark] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    


    const handleClose = () => {
        props.setStatus(false)

    }

    const handleSubmit = async () => {
        var body = { mobileno: props?.userData?.mobileno, address: addressOne + ";" + addressTwo, landmark, state, city, pincode }
        var result = await postData('users/submit_user_address', body)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                toast: true,
                title: result.message,
                timer: 1500,
                position: 'top-end'
              })


        }
        else { alert("Fail") }
        props.setStatus(false)
        props.setPageRefresh(!props.pageReferesh)
    }

    

    const fetchAddress = async () => {
        var body = { mobileno: props?.userData?.mobileno }
        var result = await postData('users/show_user_address', body)
        if (result.status) {
            // Swal.fire({
            //     icon: 'success',
            //     toast: true,
            //     title: result.message,
            //     timer: 1500,
            //     position: 'top-end'
            //   })
            
            setAddressOne(result.data.address?.split(';')[0])
            setAddressTwo(result.data.address?.split(';')[1])
            setCity(result.data?.city)
            setState(result.data?.state)
            setLandmark(result.data?.landmark)
            setPincode(result.data?.pincode)
        }
    }

    useEffect(function () {
        fetchAddress()
    }, [props.pageReferesh])

  

    const handleEdit = async () => {
        var body = { mobileno: props?.userData?.mobileno, address: addressOne + ";" + addressTwo, landmark, state, city, pincode }
        var result = await postData('users/edit_user_address', body)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                toast: true,
                title: result.message,
                timer: 1500,
                position: 'top-end'
              })
        }
        else { alert("Fail") }
        props.setStatus(false)
        props.setPageRefresh(!props.pageReferesh)
        props.setEditStatus(false)
    }



    const DrawerList = () => {
        return (<Box sx={{ width: 400 }}>
            <div style={{ fontSize: 26, fontWeight: 900, marginLeft: 20, marginTop: 10, display: 'flex', justifyContent: 'space-between', width: '90%' }}>Add Address<div style={{ marginLeft: '30%', cursor: 'pointer' }} onClick={handleClose}><CloseIcon /></div></div>
            <div style={{ fontsize: 14, fontWeight: 900, marginLeft: 20, marginTop: 20 }}>{props?.userData?.username} Enter Your Address Details</div>

            <List>

                <ListItem>
                    <ListItemText><TextField value={addressOne} onChange={(event) => setAddressOne(event.target.value)} label="Address Line One" variant="standard" style={{ width: '90%' }} /></ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemText><TextField value={addressTwo} onChange={(event) => setAddressTwo(event.target.value)} label="Address Line Two" variant="standard" style={{ width: '90%' }} /></ListItemText>
                </ListItem>

                <ListItem style={{ gap: 12 }}>
                    <ListItemText>
                        <TextField value={state} label="State" variant="standard" onChange={(event) => setState(event.target.value)} style={{ width: '41%', marginRight: '5%' }} />
                        <TextField value={city} label="City" onChange={(event) => setCity(event.target.value)} variant="standard" style={{ width: '45%' }} />
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemText><TextField value={landmark} onChange={(event) => setLandmark(event.target.value)} label="Landmark" variant="standard" style={{ width: '90%' }} /></ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemText><TextField value={pincode} onChange={(event) => setPincode(event.target.value)} label="Pincode" variant="standard" style={{ width: '90%' }} /></ListItemText>
                </ListItem>



                <ListItem>
                    <ListItemText>
                        {props.editStatus ? <Button variant="contained" onClick={handleEdit} style={{ borderRadius: 25, padding: 13 }} fullWidth>Edit Address</Button>

                            : <Button variant="contained" onClick={handleSubmit} style={{ borderRadius: 25, padding: 13 }} fullWidth>Save & Proceed</Button>}
                    </ListItemText>
                </ListItem>
            </List>
        </Box>)
    }

    return (<div>

        <Drawer
            anchor={"right"}
            open={props.status}
            onClose={handleClose}>
            {DrawerList()}
        </Drawer>
    </div>)
}