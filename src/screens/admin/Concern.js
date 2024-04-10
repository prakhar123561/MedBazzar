import { Button, FormControl, Grid, MenuItem, Select, InputLabel, Avatar, FormHelperText, TextField } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";
import { useStyles } from "./ConcernCss";
import { useState } from "react";
import { postData } from "../../services/fetchNodeServices";

export default function Concern(){
    var classes = useStyles()

    const [concernName, setConcernName] = useState('')
    const [picture, setPicture] = useState({file:'icon.png',bytes:''})
    const [error, setError] = useState({})

    const handlePicture = (event) =>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleSubmit = async() =>{
        var submit = true
        if(concernName.length == 0){
            handleError('concernName','Pls Input Concern Name')
            submit = false
        }
    
        if(picture.bytes.length == 0){
            handleError('picture','Pls Select Picture')
            submit = false
        }
        if(submit){
        var data = new FormData()
        data.append('concernname',concernName)
        data.append('picture',picture.bytes)
        
        var result = await postData('concern/submit_concern',data)
        if(result.status){
            alert(result.message)
        }else{
            alert(result.message)
        }}
    }

    const handleReset = () =>{
        setConcernName('')
        
        setPicture({file:'icon.png',bytes:''})
    }

    return(
        <div className={classes.root}>
            <div className={classes.box}>
                <TitleComponent  title="Add New Concern" />
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField onFocus={()=>handleError('category',null)} value={concernName} onChange={(event)=> setConcernName(event.target.value)} error={error.concernName} helperText=<span style={{color:'#d32f2f',fontFamily:'kanit',fontSize:13}}>{error.concernName}</span>  label='Concern Name' fullWidth />
            </Grid>
            
            <Grid item xs={6} >
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input type="file" onChange={handlePicture} onClick={() => handleError('picture',null)} accept="image/*" multiple hidden/>
                </Button>
                {error.picture?<span style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13,fontWeight:600}}>{error.picture}</span>:<span></span>}
            </Grid>
            <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                <div><Avatar src={picture.file} variant="circular" /></div>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleSubmit} variant="contained" color="success" fullWidth>Submit</Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleReset} variant="contained" color="error" fullWidth>Reset</Button>
            </Grid>
        </Grid>
            </div>
        </div>
        
    )
}