import { Button, IconButton, Typography } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState, useEffect } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Swal from "sweetalert2";

export default function PlusMinusComponent(props) {

  const theme = useTheme()
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'))

    const [value, setValue] = useState(props.qty)
 useEffect(function () {
    setValue(props.qty)
  }, [props.qty,value])
  const handlePlus = () => {
    setValue((prev) => prev + 1)
    var v = value
    v = v + 1
    props.onChange(v)

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      background: '#00391c',
      width: matchesMd?'50%':'20%',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Add to cart",
      color: "#fff"
    });

  }
  const handleMinus = () => {
    if(value >= 1){
      setValue((prev) => prev - 1)
    var v = value
    v = v - 1
    props.onChange(v)
    }
  }

    return (
        <Typography componet="div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* {value==0?<div style={{display:'flex',justifyContent:'center'}}> */}
            {/* <Button variant="text"   onClick={handleClick} endIcon={<AddShoppingCartIcon style={{height:15}}/>} style={{fontSize:12,padding: "2px 0px",width:'40%',marginRight:'auto',height:30,width:100}}>ADD</Button> */}
            {/* </div> */}
            {value == 0 ? <Button variant={props.width ? "contained" : "text"} onClick={handlePlus} endIcon={<AddShoppingCartIcon style={{ height: 15 }} />} style={{
                fontSize: 12, background: props.width ? '#00391c' : '', color: props.width ? "#fff" : '#00391c',
                padding: props.width ? "12px 20px" : "2px 0px", width: props.width ? 125 : '40%', marginRight: 'auto'
            }}>ADD</Button>
                : <Typography component="div" style={{ color: props.size ? '#00391c' : "#f2f2f2", background: props.size ? '#fff' : '#00391c', border: props.size ? '1px solid #00391c' : '', borderRadius: 5, width: props.width ? 140 : matchesMd? 63: 85, display: 'flex', justifyContent: matchesMd?'center':'space-evenly', alignItems: 'center', height: props.width ? 46 : 28.5 }}>
                    <IconButton style={{ color: props.size ? '#00391c' : "#f2f2f2" }} onClick={handleMinus}>
                        {props.size ? <DeleteOutlinedIcon sx={{ fontSize: 22 }} /> : <RemoveOutlinedIcon sx={{ fontSize:matchesMd?14: 16 }} />}
                    </IconButton>
                    <span style={{ cursor: 'default', marginLeft: 5, marginRight: 5, fontSize:matchesMd?14: 16 }}>{value}</span>
                    <IconButton style={{ color: props.size ? '#00391c' : "#f2f2f2" }} onClick={handlePlus}>
                        <AddOutlinedIcon sx={{ fontSize: matchesMd?14:16 }} />
                    </IconButton>
                </Typography>}
        </Typography>)
}