import { Grid,Button,TextField, Avatar } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";
import { useStyles } from "./BrandsCss";
import { useState } from "react";
import { postData } from "../../services/fetchNodeServices";
import Swal from "sweetalert2";

export default function Brands(){
    const classes = useStyles()
    const [brandName,setBrandName] = useState('')
    const [picture,setPicture] = useState({file:'icon.png',bytes:''})
    const [error,setError] = useState({})

    const handlePicture = (event) =>{
        try{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        }
        catch(e){
            setPicture({file:'icon.png',bytes:''})
        }
    }

    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleSubmit = async() =>{
        if(brandName.length==0){
            handleError('brandName','Pls input brand...')
        }
        if(picture.bytes.length==0){
            handleError('picture','Pls select picture...')
        }
        var data = new FormData()
        data.append('brandname',brandName)
        data.append('picture',picture.bytes)
        var result = await postData('brand/submit_brand',data)
        if(result.status){
            Swal.fire({
                icon:'success',
                toast: true,
                title: result.message
            })
        } 
        else{
            Swal.fire({
                icon:'error',
                toast: true,
                title: result.message
            })
        }
    }

    const handleReset = () =>{
        setBrandName('')
        setPicture({file:'icon.png',bytes:''})
    }

    return(
        <div className={classes.root}>
            <div className={classes.box}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <TitleComponent logo='medbazzar2.png' title='Add New Brand' listicon='listicon.png' path='/admindashboard/displayallbrand' />
            </Grid>
            <Grid item xs={12}>
                <TextField onFocus={()=>handleError('brandName',null)} onChange={(event)=>setBrandName(event.target.value)} error={error.brandName} helperText=<span>{error.brandName}</span> value={brandName} label='Brand Name' fullWidth />
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" component='label' fullWidth >
                    Upload
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple/>
                </Button>
                {error.picture?<span style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13,fontWeight:600}}>{error.picture}</span>:<span></span>}
            </Grid>
            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar src={picture.file} variant="circular"/>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleReset} variant="contained" fullWidth>Reset</Button>
            </Grid>
            </Grid>
            </div>
        </div>
    )
}