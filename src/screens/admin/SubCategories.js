import TitleComponent from "../../components/admin/TitleComponent";
import { useStyles } from "./SubCategoriesCss";
import { useEffect, useState } from "react";
import { Grid,TextField,Button, Avatar } from "@mui/material";
import {FormControl,InputLabel,Select,MenuItem,FormHelperText} from "@mui/material";
import { getData, postData } from "../../services/fetchNodeServices";
import Swal from "sweetalert2";

export default function SubCategories(){
    var classes = useStyles()

    const [categoryId,setCategoryId] = useState('')
    const [subCategoryName,setSubCategoryName] = useState('')
    const [picture,setPicture] = useState({file:'icon.png',bytes:''})
    const [error,setError] = useState({})
    const [categoryData,setCategoryData] = useState([])

    const handlePicture = (event) =>{
        try{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        }
        catch(e){
            setPicture({file:'icon.png',bytes:''})
        }
    }

    const fetchAllCategory = async() =>{
        var result = await getData('category/display_all_category')
        
        if(result.status){
            setCategoryData(result.data)  
        }
    }

    useEffect(function(){
        fetchAllCategory()
    },[])

    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const fetchAllList = () =>{
        return categoryData.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleSubmit = async() =>{
        var submit = true
        if(categoryId.length===0){
            handleError('categoryId','Please Select Category Name')
            submit = false
        }
        if(subCategoryName.length===0){
            handleError('subCategoryName','Please Input SubCategory name')
            submit = false
        }
        if(picture.bytes.length===0){
            handleError('picture','Please select icon')
            submit = false
        }
        if(submit){
            var data = new FormData()
            data.append('categoryid',categoryId)
            data.append('subcategoryname',subCategoryName)
            data.append('picture',picture.bytes)
            var result = await postData('subcategory/submit_subcategory',data)
        if(result.status){
            Swal.fire({
                icon: "success",
                title: result.message,
                timer: 1500,
                toast : true
              });
        }
        else{
            Swal.fire({
                icon: "error",
                title: result.message,
                timer: 1500,
                toast : true
              });
        }
        }
    }

    const handleReset = () =>{
        setCategoryId('')
        setSubCategoryName('')
        setPicture({file:'icon.png',bytes:''})
    }

    return(
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TitleComponent logo="medbazzar2.png" title="Add New SubCategory" listicon="listicon.png" path='/admindashboard/displayallsubcategory' />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl onFocus={()=>handleError('categoryId',null)} error={error.categoryId} fullWidth>
                            <InputLabel>Category Name</InputLabel>
                            <Select
                             value={categoryId}
                             label="Category Name"
                             onChange={(event)=>setCategoryId(event.target.value)}
                             >
                               {fetchAllList()}
                            </Select>
                            <FormHelperText>{error.categoryId}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onFocus={()=>handleError('subCategoryName',null)} onChange={(event)=>setSubCategoryName(event.target.value)} value={subCategoryName} label='SubCategory Name' error={error.subCategoryName} helperText={error.subCategoryName} fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" component="label" fullWidth>
                            Upload
                            <input onClick={()=>handleError('picture',null)} onChange={handlePicture}  type="file" hidden accept="images/*" multiple />
                        </Button>
                        {error.picture?<span style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.picture}</span>:<span></span>}
                    </Grid>
                    <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Avatar src={picture.file} variant="circular" style={{width:50,height:50}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleSubmit} color="success" fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleReset} color="error" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}