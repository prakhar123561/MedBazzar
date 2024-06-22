import { Grid, Divider, Button, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditIcon from '@mui/icons-material/Edit';

export default function DeliveryAddress(props) {
    const theme = useTheme();
    const matcheMd = useMediaQuery(theme.breakpoints.down('md'));

    const showAllAddress = () => {
        
        // return userAddress.map((item) => {
        return <div style={{ display: 'flex', flexDirection: 'column', padding: 10, margin: 10 }}>
            <div>{props?.userAddress?.address}</div>
            <div>{props?.userAddress?.landmark}</div>
            <div>{props?.userAddress?.state} {props?.userAddress?.city} {props?.userAddress?.pincode}</div>
        </div>

        // })
    }

    const handleClick = () => {
        props.setStatus(true)  //addAddress button will work
        props.setEditStatus(false)
        
    }
    const handleEdit = () => {
        props.setStatus(true)   // edit button will work to update
        props.setEditStatus(true)
        
    }
    

    return (<div style={{ display: 'flex', width:matcheMd?'100%': '80%', border: 'solid 1px #00000021', height: '50%', borderRadius: 15, padding: 10, fontFamily: 'kanit', marginTop: 40 }}>
        <Grid container spacing={3}>

            <Grid item xs={12} style={{ fontSize: 14, fontWeight: 'bolder' }}>
                Delivery Address
                <IconButton title="Edit Address" onClick={handleEdit}><EditIcon/></IconButton>
            </Grid>

            <Grid item xs={12} >
                <Divider />
            </Grid>

            <Grid item md={6} xs={12} style={{ fontSize: matcheMd ? 16 : 13, fontWeight: 'bolder', alignItems: 'center', display: 'flex', justifyContent: matcheMd ? 'flex-start' : <></> }}>
                {props?.userAddress?.length == 0 ? <span>
                    Please add your address to continue</span> : <div>
                    <div>{props?.userData?.username}</div>
                    {showAllAddress(props?.userAddress)}
                </div>}
            </Grid>

            <Grid item md={6} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                <Button onClick={handleClick} startIcon={<AddIcon />} size="large" variant="contained" 
                style={{ display: 'flex', borderRadius: 30, padding: matcheMd ? 15 : 10, marginLeft: matcheMd ? <></> : 'auto', fontFamily: 'kanit', fontSize: matcheMd ? '2vw':'.9vw', fontWeight: 'bolder', justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: matcheMd?'25vw':'12vw', height: matcheMd?'3vh': '4vh' }}>
                    Add Address
                </Button>
                

            </Grid>


 
        </Grid>

    </div>)
}