import * as React from 'react';
import TitleComponent from "../../components/admin/TitleComponent";
import { getData, serverUrl, postData } from "../../services/fetchNodeServices";
import {useStyles} from "./ProductsCss";
import MaterialTable from "@material-table/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Swal from 'sweetalert2';
import { Grid, Button, TextField, Avatar } from "@mui/material";
import { Select, FormControl, InputLabel, MenuItem} from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function DisplayAllProduct(){
    var navigate = useNavigate()
    var classes = useStyles()

    const [open,setOpen] = useState(false)
    const [productId,setProductId] = useState('')
    const [productData,setProductData] = useState([])
    const [categoryId,setCategoryId] = useState('')
    const [categoryData,setCategoryData] = useState([])
    const [subCategoryId,setSubCategoryId] = useState('')
    const [subCategoryData,setSubCategoryData] = useState([])
    const [brandId,setBrandId] = useState('')
    const [brandData,setBrandData] = useState([])
    const [description,setDescription] = useState('')
    const [productName,setProductName] = useState('')
    const [picture,setPicture] = useState({file:"icon.png",bytes:""})
    const [error,setError] = useState({})
    const [showBtn,setShowBtn] = useState(false)
    const [tempPicture,setTempPicture] = useState('')

    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const fetchAllProduct = async() =>{
        var result = await getData('product/display_all_product')

        if(result.status){
            setProductData(result.data)
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
            console.log(result.message)
            setSubCategoryData(result.data)
        }
    }

    const fetchAllBrand = async() =>{
        var result = await getData('brand/Display_All_Brand')
        if(result.status){
            console.log(result.message)
            setBrandData(result.data)
        }
    }

    useEffect(function(){
        fetchAllProduct()
    },[])

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

    const handlePicture = (event) =>{
            setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
            setShowBtn(true)
    }

    const handleEditData = async() =>{
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
        if(submit){
            var body = {categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productname:productName,description:description,productid:productId}
            var result = await postData('product/edit_product_data',body)
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
            fetchAllProduct()
        }
    }

    const handleEditPicture = async() =>{
        
        var data = new FormData()
        data.append('productid',productId)
        data.append('picture',picture.bytes)
        var result = await postData('product/edit_product_picture',data)
        if(result.status){
            Swal.fire({
                title: result.message,
                timer: 3000,
                toast: true,
                position: 'top-end'
              });
        }
        else{
            Swal.fire({
                title: result.message,
                timer: 1500,
                toast: true
              });
        } 
        fetchAllProduct()
        setShowBtn(false)     
        
    }

    const handleClose = () =>{
        setOpen(false)
    }

    const handleCancel = () =>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
    }

    const handleDelete = (rowData) =>{
        
        Swal.fire({
            title: "Do you want to Delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */   
            if (result.isConfirmed) {
                var body = {productid:rowData.productid}
                var result = await postData('product/delete_product',body)
                if(result.status){
                    Swal.fire({
                        icon: 'success',
                        title: result.message,
                        timer: 3000,
                        toast: true
                      });
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: result.message,
                        timer: 1500,
                        toast: true
                      });
                }
                fetchAllProduct()

            } else if (result.isDenied) {
                Swal.fire({
                    icon: 'info',
                    title: 'Your Record is safe',
                    timer: 1500,
                    toast: true
                  });            }
          });
    }

    const handleOpen = (rowData) =>{
        setCategoryId(rowData.categoryid)
        setProductId(rowData.productid)
        fetchAllSubCategory(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setBrandId(rowData.brandid)
        setProductName(rowData.productname)
        setDescription(rowData.description)
        setPicture({file:`${serverUrl}/images/${rowData.picture}`,bytes:""})
        setTempPicture(`${serverUrl}/images/${rowData.picture}`)
        setOpen(true)
    }

    function showProductForm(){
        return(
            <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
            maxWidth={'md'}>
                <DialogContent>
            <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent logo='medbazzar2.png' title="Edit Product Data"/>
                </Grid>
                <Grid item xs={4}>
                <FormControl  fullWidth>
                    <InputLabel>Category Name</InputLabel>
                        <Select
                            value={categoryId}
                            label="Category Name"
                            onChange={handleChangeCategory}
                            >
                            {fillAllCategory()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                <FormControl  fullWidth>
                    <InputLabel>SubCategory Name</InputLabel>
                        <Select
                            value={subCategoryId}
                            label="SubCategory Name"
                            onChange={(event)=>setSubCategoryId(event.target.value)}
                            >
                            {fillAllSubCategory()}
                        </Select>
                    </FormControl>
                     </Grid>
                <Grid item xs={4}>
                <FormControl  fullWidth>
                    <InputLabel>Brand Name</InputLabel>
                        <Select
                            value={brandId}
                            label="Brand Name"
                            onChange={(event)=>setBrandId(event.target.value)}
                            >
                            {fillAllBrand()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                <TextField onFocus={()=>handleError('productName',null)} onChange={(event)=>setProductName(event.target.value)} value={productName} label='Product Name' error={error.productName} helperText={error.productName} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                <TextField onFocus={()=>handleError('description',null)} onChange={(event)=>setDescription(event.target.value)} value={description} label='Description' error={error.description} helperText={error.description} fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    {showBtn?<div style={{height:120,display:'flex',justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{height:120,display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Button variant="contained" component="label" fullWidth>
                        Upload
                        <input onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                    </Button></div>}
                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                    <Avatar src={picture.file} style={{width:100,height:100,padding:20}}/>
                </Grid>
                
            </Grid>
            </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditData}>Edit Data</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
            </Dialog>
        )
    }

    function showProduct(){
        return (<MaterialTable
            title="Main Products"
            columns={[
              { title: 'Product ID', field: 'productid' },
              { title: 'Category ID', field: 'categoryname'},
              { title: 'SubCategory ID', field: 'subcategoryname' },
              { title: 'Brand ID', field: 'brandname' },
              { title: 'Product Name', field: 'productname' },
              { title: 'Description', field: 'description' },
              { title: 'Icon', field: 'picture', render: rowData => <img src={`${serverUrl}/images/${rowData.picture}`} style={{width: 60}}/> 
              },
            ]}
            data={productData}
            options={{
                paging:true,
                pageSize:3,       // make initial page size
                emptyRowsWhenPaging: false,   // To avoid of having empty rows
                pageSizeOptions:[3,6,9,12],    // rows selection options
              }}        
            actions={[
              {
                  icon: 'edit',
                  tooltip: 'Edit Product',
                  onClick: (event,rowData) => {handleOpen(rowData)}
                },
                {
                  icon: 'delete',
                  tooltip: 'Delete Product',
                  onClick: (event,rowData) => {handleDelete(rowData)}
                },
              {
                icon: 'add',
                tooltip: 'Add New Product',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/product')
              }
            ]}
          />)
    }

    return(
        <div className={classes.root}>
            <div className={classes.boxTable}>
                {showProduct()}
            </div>
            {showProductForm()}
        </div>
    )
}