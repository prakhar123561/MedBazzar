import { useState } from "react";
import {Grid,Button,TextField,Avatar} from "@mui/material"
import { useStyles } from "./CategoriesCss";
import Swal from 'sweetalert2'
import TitleComponent from "../../components/admin/TitleComponent";
import { postData } from "../../services/fetchNodeServices";

export default function Categories(){
    const [category,setCategory] = useState('')
    const [picture,setPicture] = useState({file:'icon.png',bytes:''})
    const [error,setError] = useState({})
    
    const handlePicture = (event) => {
        try{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
       
        
        }
        catch(e){
        setPicture({file:'icon.png',bytes:''})
        }
    }
    
    var classes = useStyles()
    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
    }
    const handleSubmit = async() => {
        var submit = true
        if(category.length==0){
            handleError('category','Please input the category name')
            submit = false
        }
        if(picture.bytes.length==0){
            handleError('picture','Please choose icon')
            submit = false
        }
        if(submit){
            var data = new FormData()
            data.append('category',category)
            data.append('picture',picture.bytes)
            var result = await postData('category/submit_category',data)
            if(result.status){
                Swal.fire({
                    icon: "success",
                    title: result.message,
                    timer: 1500,
                    toast: true
                  });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer: 1500
                  });
            }
           
        }
    }
    const handleReset = () => {
        setCategory('')
        setPicture({file:'icon.png',bytes:''})
    }
    return(
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title='Add New Category' path='/admindashboard/displayallcategory' />
                </Grid>
                <Grid item xs={12}>
                    <TextField onFocus={()=>handleError('category',null)} value={category} onChange={(event)=> setCategory(event.target.value)} error={error.category} helperText={error.category}  label='Category Name' fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" component="label" fullWidth>
                       Upload
                       <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type='file' hidden accept="images/*" multiple />
                    </Button>
                    {error.picture?<span style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.picture}</span>:<span></span>}
                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={picture.file} variant="circular" />
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