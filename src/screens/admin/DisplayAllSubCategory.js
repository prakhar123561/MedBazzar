import TitleComponent from "../../components/admin/TitleComponent";
import { useStyles } from "./SubCategoriesCss";
import MaterialTable from "@material-table/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import {FormControl,InputLabel,Select,MenuItem,FormHelperText} from "@mui/material";
import { useEffect, useState } from "react";
import { getData, postData, serverUrl } from "../../services/fetchNodeServices";

export default function DisplayAllSubCategory(){
    var classes = useStyles()
    var navigate = useNavigate()

    const [categoryId,setCategoryId] = useState('')
    const [categoryData,setCategoryData] = useState([])
    const [subCategoryId,setSubCategoryId] = useState('')
    const [subCategoryData,setSubCategoryData] = useState([])
    const [subCategoryName,setSubCategoryName] = useState('')
    const [picture,setPicture] = useState({file:'icon.png',bytes:''})
    const [error,setError] = useState({})
    const [open,setOpen] = useState(false)
    const [showBtn,setShowBtn] = useState(false)
    const [tempPicture,setTempPicture] = useState('')

    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const fetchAllSubCategory = async() =>{
        var result = await getData('subcategory/display_all_subcategory')
        if(result.status){
            setSubCategoryData(result.data)
        }
    }

    const fetchAllCategory = async() =>{
        var result = await getData('category/display_all_category')
        if(result.status){
            setCategoryData(result.data)  
        }
    }

    const fetchAllList = () =>{
        return categoryData.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    useEffect(function(){
        fetchAllSubCategory()
    },[])

    useEffect(function(){
        fetchAllCategory()
    },[])

    const handleOpen = (rowData) =>{
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setSubCategoryName(rowData.subcategoryname)
        setPicture({file:`${serverUrl}/images/${rowData.picture}`,bytes:''})
        setTempPicture(`${serverUrl}/images/${rowData.picture}`)
        setOpen(true)
    }

    const handleEditData = async() =>{
        var submit = true
            if(subCategoryName.length===0){
            handleError('subCategoryName','Please input the SubCategory Name')
            submit = false
        }
        if(submit){
        var body = {categoryid:categoryId,subcategoryname:subCategoryName,subcategoryid:subCategoryId}
        var result = await postData('subcategory/edit_subcategory_data',body)
        if(result.status){
            Swal.fire({
                title: result.message,
                icon: "success",
                toast: true,
                timer: 1500
            });
        }
        else{
            Swal.fire({
                title: result.message,
                icon: "error",
                toast: true,
                timer: 1500
            });
        }
        fetchAllSubCategory()}
    }

    const handleEditPicture = async() =>{
       
        
            var data = new FormData()
            data.append('picture',picture.bytes)
            data.append('subcategoryid',subCategoryId)
            var result = await postData('subcategory/edit_picture',data)
            if(result.status){
            Swal.fire({
                title: result.message,
                icon: "success",
                toast: true,
                timer: 1500
            });
            }
            else{
            Swal.fire({
                title: result.message,
                icon: "error",
                toast: true,
                timer: 1500
            });
            }
        fetchAllSubCategory()
    setShowBtn(false)
    }

    const handleClose = () =>{
        setOpen(false)
    }

    const handleCancel = () =>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
    }

    const handlePicture = (event) =>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setShowBtn(true)
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
                var body = {subcategoryid:rowData.subcategoryid}
                var result = await postData('subcategory/delete_subcategory',body)   
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
                  fetchAllSubCategory()
            } else if (result.isDenied) {
                Swal.fire({
                    icon: "info",
                    text: "Your Record is safe!",
                    toast: true
                  });
            }
          });
    }


    function showSubCategoryForm(){
        return(
            <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}>
                <DialogContent>
                <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TitleComponent logo="medbazzar2.png" title="Edit SubCategory Data" listicon="listicon.png" />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl  onFocus={()=>handleError('categoryId',null)} error={error.categoryId} fullWidth>
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
                    <Grid item xs={6} >
                        {showBtn?<div style={{height:100,display:'flex',justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button><Button onClick={handleCancel} variant="contained">Cancel</Button></div>:<div style={{height:100,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button variant="contained" component="label" fullWidth>
                            Set New Picture
                            <input onClick={()=>handleError('picture',null)} onChange={handlePicture}  type="file" hidden accept="images/*" multiple />
                        </Button></div>}
                    </Grid>
                    <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Avatar src={picture.file} variant="circular" style={{width:100,height:100}}/>
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

    function showSubCategory(){
       return (<MaterialTable
      title="Main SubCategories"
      columns={[
        { title: 'SubCategory ID', field: 'subcategoryid' },
        { title: 'Category Name', field: 'categoryname'},
        { title: 'SubCategory Name', field: 'subcategoryname' },
        { title: 'Icon', field: 'picture', render: rowData => <img src={`${serverUrl}/images/${rowData.picture}`} style={{width: 50, borderRadius: '50%'}}/> 
        },
      ]}
      data={subCategoryData}   
      options={{
        paging:true,
        pageSize:3,       // make initial page size
        emptyRowsWhenPaging: false,   // To avoid of having empty rows
        pageSizeOptions:[3,6,9,12],    // rows selection options
      }}     
      actions={[
        {
            icon: 'edit',
            tooltip: 'Edit SubCategory',
            onClick: (event,rowData) => {handleOpen(rowData)}
          },
          {
            icon: 'delete',
            tooltip: 'Delete SubCategory',
            onClick: (event,rowData) => {handleDelete(rowData)}
          },
        {
          icon: 'add',
          tooltip: 'Add New SubCategory',
          isFreeAction: true,
          onClick: (event) => navigate('/admindashboard/subcategory')
        }
      ]}
    />)
    }

    return(
        <div className={classes.root}>
            <div className={classes.boxTable}>
                {showSubCategory()}
            </div>
            {showSubCategoryForm()}
        </div>
    )

}