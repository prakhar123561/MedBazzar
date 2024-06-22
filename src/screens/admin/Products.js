import { useEffect, useState } from "react";
import { Avatar, Button, Grid, TextField } from "@mui/material";
import { FormControl, Select, InputLabel, MenuItem, FormHelperText } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";
import { useStyles } from "./ProductsCss";
import Swal from "sweetalert2";
import { getData, postData } from "../../services/fetchNodeServices";



export default function Products(){
    var classes = useStyles()

    const [categoryId,setCategoryId] = useState('')
    const [categoryData,setCategoryData] = useState([])
    const [subCategoryId,setSubCategoryId] = useState('')
    const [subCategoryData,setSubCategoryData] = useState([])
    const [brandId,setBrandId] = useState('')
    const [brandData,setBrandData] = useState([])
    const [productName,setProductName] = useState('')
    const [description,setDescription] = useState('')
    const [picture,setPicture] = useState({file:'icon.png',bytes:''})
    const [error,setError] = useState({})

    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
    }

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

    const handleChangeCategory = (event) =>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    const fetchAllSubCategory = async(cid) =>{
        var result = await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
        if(result.status){
            
            setSubCategoryData(result.data)
        }
    }

    const fetchAllBrand = async() =>{
        var result = await getData('brand/Display_All_Brand')
        if(result.status){
           
            setBrandData(result.data)
        }
    }


    useEffect(function(){
        fetchAllCategory()
    },[])

    useEffect(function(){
        fetchAllSubCategory()
    },[])

    useEffect(function(){
        fetchAllBrand()
    },[])

    const fillAllCategory = () =>{
        return categoryData.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const fillAllSubCategory = () =>{
        return subCategoryData.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const fillAllBrand = () =>{
        return brandData.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleSubmit = async() =>{
        var submit = true

        if(categoryId.length===0){
            handleError('categoryId','Please Select Category')
            submit = false
        }
        if(subCategoryId.length===0){
            handleError('subCategoryId','Please Select SubCategory')
            submit = false
        }
        if(brandId.length===0){
            handleError('brandId','Please Select Brand')
            submit = false
        }
        if(productName.length===0){
            handleError('productName','Please fill Product Name')
            submit=false
        }
        if(description.length===0){
            handleError('description','Please fill Description')
            submit=false
        }
        if(picture.bytes.length===0){
            handleError('picture','Please Select Icon')
            submit = false
        }
        
        if(submit){
            var data = new FormData()
            data.append('categoryid',categoryId)
            data.append('subcategoryid',subCategoryId)
            data.append('brandid',brandId)
            data.append('productname',productName)
            data.append('description',description)
            data.append('picture',picture.bytes)

        var result = await postData('product/submit_product',data)
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
        }}
    }

    const handleReset = () =>{
        setCategoryId('')
        setSubCategoryId('')
        setBrandId('')
        setProductName('')
        setDescription('')
        setPicture({file:'icon.png',bytes:''})
    }

    return(
        <div className={classes.root} >
            <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent logo='medbazzar2.png' listicon="listicon.png" title="Add New Product" path='/admindashboard/displayallproduct'/>
                </Grid>
                <Grid item xs={4}>
                <FormControl  fullWidth>
                    <InputLabel>Category Name</InputLabel>
                        <Select
                            value={categoryId}
                            label="Category Name"
                            onChange={handleChangeCategory}
                            onFocus={()=>handleError('categoryId',null)}
                            >
                            {fillAllCategory()}
                        </Select>
                        <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.categoryId}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                <FormControl  fullWidth>
                    <InputLabel>SubCategory Name</InputLabel>
                        <Select
                            value={subCategoryId}
                            label="SubCategory Name"
                            onChange={(event)=>setSubCategoryId(event.target.value)}
                            onFocus={()=>handleError('subCategoryId',null)}
                            >
                            {fillAllSubCategory()}
                        </Select>
                        <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.subCategoryId}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                <FormControl  fullWidth>
                    <InputLabel>Brand Name</InputLabel>
                        <Select
                            value={brandId}
                            label="Brand Name"
                            onChange={(event)=>setBrandId(event.target.value)}
                            onFocus={()=>handleError('brandId',null)}
                            >
                            {fillAllBrand()}
                        </Select>
                        <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.brandId}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                <TextField onFocus={()=>handleError('productName',null)} onChange={(event)=>setProductName(event.target.value)} value={productName} label='Product Name' error={error.productName} helperText={error.productName} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                <TextField onFocus={()=>handleError('description',null)} onChange={(event)=>setDescription(event.target.value)} value={description} label='Description' error={error.description} helperText={error.description} fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" component="label" fullWidth>
                        Upload
                        <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                    </Button>
                    {error.picture?<span style={{color:'#d32f2f',marginLeft:'4%',fontWeight:500,fontSize:13}}>{error.picture}</span>:<span></span>}
                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                    <Avatar src={picture.file} />
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