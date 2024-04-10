import MaterialTable from "@material-table/core"
import { useStyles } from "./CategoriesCss"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useEffect } from "react"
import TitleComponent from "../../components/admin/TitleComponent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getData, postData, serverUrl } from "../../services/fetchNodeServices"
import { Button, Grid, TextField, Avatar } from "@mui/material";

export default function DisplayAllCategory(){
  var classes = useStyles()
  var navigate = useNavigate()

  const [categoryData,setCategoryData] = useState([])
  const [categoryId,setCategoryId] = useState('')
  const [category,setCategory] = useState('')
  const [open,setopen] = useState(false)
  const [picture,setPicture] = useState({file:'icon.png',bytes:''})
  const [error,setError] = useState({})
  const [showBtn,setShowBtn] = useState(false)
  const [tempPicture,setTempPicture] = useState('')

  const fetchAllcategory = async() => {
    var result = await getData('category/display_all_category')
    if(result.status){
      setCategoryData(result.data)
    }
  }

  useEffect(function(){
      fetchAllcategory()
  },[])

  const handlePicture = (event) => {
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setShowBtn(true)
    
}

const handleError = (label,msg) =>{
    setError((prev)=>({...prev,[label]:msg}))
}

const handleClose = () =>{
  setopen(false)
}

const handleEditPicture = async() =>{
  
  var data = new FormData()
  data.append('categoryid',categoryId)
  data.append('picture',picture.bytes)
  var result = await postData('category/edit_category_picture',data)
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

  fetchAllcategory()
  setShowBtn(false)
  
}

  const handleEditData = async() =>{
    var submit = true
    if(category.length===0){
        handleError('category','Please input the category name')
        submit = false
    }
    if(submit){
    var body = {categoryid:categoryId,categoryname:category}
    var result = await postData('category/edit_category_data',body)
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
 
    fetchAllcategory()
    }
  }

  const handleDelete = (rowData) =>{
    
    Swal.fire({
      title: "Do you want to delete the category?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body = {categoryid:rowData.categoryid}
        var result = await postData('category/delete_category',body)
        if(result.status){
          Swal.fire({
              title: 'Deleted!', 
              toast: true,
              icon: "success"});
        }
        else{
          Swal.fire({
            title: 'Fail to Delete Record!', 
            toast: true,
            icon: "error"});
        }
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Your Record is Safe!', 
          toast: true,
          icon: "info"});
      }
      fetchAllcategory()

    });
  }

  const handleCancel = () =>{
    setPicture({file:tempPicture,bytes:''})
    setShowBtn(false)
  }

  const handleOpen = (rowData) =>{
    setopen(true)
    setCategoryId(rowData.categoryid)
    setCategory(rowData.categoryname)
    setPicture({file:`${serverUrl}/images/${rowData.picture}`,bytes:''})
    setTempPicture(`${serverUrl}/images/${rowData.picture}`)
  }

  const showCategoryForm = () =>{
    return(
      <Dialog
       open={open}
       onClose={handleClose}
       maxWidth={'md'}>
        <DialogContent>
        
            <div className={classes.box}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent logo='medbazzar2.png' title='Edit Category Data' />
                </Grid>
                <Grid item xs={12}>
                    <TextField onFocus={()=>handleError('category',null)} value={category} onChange={(event)=> setCategory(event.target.value)} error={error.category} helperText=<span style={{color:'#d32f2f',fontFamily:'kanit',fontSize:13}}>{error.category}</span>  label='Category Name' fullWidth />
                </Grid>
                <Grid item xs={6}>
                  {showBtn ? <div style={{height:100,display:'flex',justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{height:100,display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'column'}}>
                    <Button variant="contained" component="label" fullWidth>
                       SET NEW PICTURE
                       <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type='file' hidden accept="images/*" multiple />
                    </Button>
                    {error.picture?<span style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13,textAlign:'left'}}>{error.picture}</span>:<span></span>}
                    </div>}
                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={picture.file} variant='rounded' style={{width:100,height:100}} />
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

    function showCategory() {
        return (
          <MaterialTable
            title="Main Categories"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'Category Name', field: 'categoryname', render: rowData => <>{rowData.categoryname === 'Medicine' ? <div style={{color:'red'}}>{rowData.categoryname}</div>:<div>{rowData.categoryname}</div>}</> },
              { title: 'Icon', field: 'picture', render: rowData =>  <img src={`${serverUrl}/images/${rowData.picture}`} alt="" style={{width:60,height:60}} /> }
            ]}

            data={categoryData}

            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,6,9,12],    // rows selection options
            }}

            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => {handleOpen(rowData)}
              },
              {
                icon: 'delete',
                tooltip: 'Delete Category',
                onClick: (event, rowData) => {handleDelete(rowData)}
              },
              {
                icon: 'add',
                tooltip: 'Add New Category',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/category')
              }
            ]}
          />
        )
      }
      return(
        <div className={classes.root}>
          <div className={classes.boxTable}>
            {showCategory()}
          </div>
          {showCategoryForm()}
        </div>
      )
}