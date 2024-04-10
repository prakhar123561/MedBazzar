import MaterialTable from "@material-table/core";
import { useStyles } from "./BrandsCss";
import { Grid,Button,TextField, Avatar } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { postData,getData, serverUrl } from "../../services/fetchNodeServices";

export default function DisplayAllBrand(){
    var classes = useStyles()
    var navigate = useNavigate()

    const [brandData,setBrandData] = useState([])
    const [picture,setPicture] = useState({file:'icon.png',bytes:''})
    const [open,setOpen] = useState(false)
    const [brandId,setBrandId] = useState('')
    const [brandName,setBrandName] = useState('')
    const [error,setError] = useState({})
    const [showBtn,setShowBtn] = useState(false)
    const [tempPicture,setTempPicture] = useState('')

    const fetchAllBrand = async() =>{
        var result = await getData('brand/display_all_brand')
        if(result.status){
            setBrandData(result.data)
        }
    }

    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handlePicture = (event) => {
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setShowBtn(true)
    }

    const handleEditPicture = async() =>{
       
        var data = new FormData()
        data.append('brandid',brandId)
        data.append('picture',picture.bytes)
        var result = await postData('brand/edit_brand_picture',data)
        if(result.status){
            Swal.fire({
                title: result.message,
                toast: true,
                position: 'top-end',
                timer: 1500
              });
        }
        else{
            Swal.fire({
                title: result.message,
                timer: 1500,
                position: 'top-end',
                toast: true
              });
        }
        fetchAllBrand()
        setShowBtn(false)
    }

    const handleEditData = async() =>{
        var submit = true
        if(brandName.length==0){
            handleError('brandName','Pls Input Brand Name')
            submit = false
        }
        if(submit){ 
            var body = {brandid:brandId,brandname:brandName}
            var result = await postData('brand/edit_brand_data',body)
            if(result.status){
                Swal.fire({
                    title: result.message,
                    toast: true,
                    position: 'top-end',
                    timer: 1500
                  });
        }
        else{
            Swal.fire({
                title: result.message,
                toast: true,
                position: 'top-end',
                timer: 1500
              });
        }
        fetchAllBrand()}
    }

 
    useEffect(function(){
        fetchAllBrand()
    },[])

    const handleClose = () =>{
        setOpen(false)
    }

    const handleCancel = () =>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
    }

    const handleOpen = (rowData) =>{
        setOpen(true)
        setBrandId(rowData.brandid)
        setBrandName(rowData.brandname)
        setPicture({file:`${serverUrl}/images/${rowData.picture}`,bytes:''})
        setTempPicture(`${serverUrl}/images/${rowData.picture}`)
    }

    const handleDelete = async(rowData) =>{
        
            Swal.fire({
                title: "Do you want to delete?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't Delete`
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    var body = {brandid:rowData.brandid}
                    var result = await postData('brand/delete_brand',body)   
                    if(result.status){         
                    Swal.fire({
                        icon: "success",
                        text: "Deleted!",
                        toast: true
                      });}
                      else{
                        Swal.fire({
                            icon: "error",
                            text: "Failed to delete record!",
                            toast: true
                          });
                      }
                      fetchAllBrand()
                } else if (result.isDenied) {
                    Swal.fire({
                        icon: "info",
                        text: "Your Record is safe!",
                        toast: true
                      });
                }
              });
        
        
    }

    function showBrandForm(){
        return(
            <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}>
                <DialogContent>
                
            <div className={classes.box}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent logo='medbazzar2.png' title='Add New Brand' listicon='listicon.png'/>
            </Grid>
            <Grid item xs={12}>
                <TextField onFocus={()=>handleError('brandName',null)} onChange={(event)=>setBrandName(event.target.value)} error={error.brandName} helperText=<span>{error.brandName}</span> value={brandName} label='Brand Name' fullWidth />
            </Grid>
            <Grid item xs={6} >
                {showBtn?<div style={{height:120,display:'flex',justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<div style={{height:100,display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'column'}}>
                <Button variant="contained" component='label' fullWidth >
                    Set New Picture
                    <input onChange={handlePicture} type="file" hidden accept="images/*" multiple/>
                </Button>
                </div>}
            </Grid>
            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center',height:160}}>
                <Avatar src={picture.file} variant="circular" style={{width:120,height:120}}/>
            </Grid>
            
            </Grid>
            </div>
        
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditData}>Edit Data</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>)
    }

    function showBrand(){
        return (
            <MaterialTable
              title="Main Brands"
              columns={[
                { title: 'Brand Id', field: 'brandid' },
                { title: 'Brand Name', field: 'brandname' },
                { title: 'Icon', field: 'picture', render: (rowData) =><img src={`${serverUrl}/images/${rowData.picture}`} style={{width:50,height:50,borderRadius:50}} /> },
              ]}
              data={brandData}

              options={{
                paging:true,
                pageSize:3,       // make initial page size
                emptyRowsWhenPaging: false,   // To avoid of having empty rows
                pageSizeOptions:[3,6,9,12,15],    // rows selection options
              }}

              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Brand',
                  onClick: (event, rowData) => {handleOpen(rowData)}
                },
                {
                    icon: 'delete',
                    tooltip: 'delete Brand',
                    onClick: (event, rowData) => {handleDelete(rowData)}
                  },
                  {
                    icon: 'add',
                    tooltip: 'Add New Brand',
                    isFreeAction: true,
                    onClick: (event) => navigate('/admindashboard/brand')
                  }
              ]}
            />
          )
    }

    return(
        <div className={classes.root}>
            <div className={classes.boxTable}>
                {showBrand()}
            </div>
            {showBrandForm()}
        </div>
    )
}