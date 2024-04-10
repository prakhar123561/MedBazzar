import { Button, IconButton, Typography } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState, useEffect } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function PlusMinusComponent(props) {

    const [value, setValue] = useState(props.qty)
 useEffect(function () {
    setValue(props.qty)
  }, [props.qty,value])
  const handlePlus = () => {
    setValue((prev) => prev + 1)
    var v = value
    v = v + 1
    props.onChange(v)

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
                : <Typography component="div" style={{ color: props.size ? '#00391c' : "#f2f2f2", background: props.size ? '#fff' : '#00391c', border: props.size ? '1px solid #00391c' : '', borderRadius: 5, width: props.width ? 140 : 85, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: props.width ? 46 : 28.5 }}>
                    <IconButton style={{ color: props.size ? '#00391c' : "#f2f2f2" }} onClick={handleMinus}>
                        {props.size ? <DeleteOutlinedIcon sx={{ fontSize: 22 }} /> : <RemoveOutlinedIcon sx={{ fontSize: 22 }} />}
                    </IconButton>
                    <span style={{ cursor: 'default', marginLeft: 5, marginRight: 5, fontSize: 16 }}>{value}</span>
                    <IconButton style={{ color: props.size ? '#00391c' : "#f2f2f2" }} onClick={handlePlus}>
                        <AddOutlinedIcon sx={{ fontSize: 22 }} />
                    </IconButton>
                </Typography>}
        </Typography>)
}