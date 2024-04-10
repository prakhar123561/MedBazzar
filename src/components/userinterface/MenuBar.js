import { Box, Toolbar, AppBar, Button, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { serverUrl, getData, postData } from "../../services/fetchNodeServices";

export default function MenuBar(){

    const [categoryData, setCategoryData] = useState([])
    const [subCategoryData, setSubCategoryData] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const fetchAllcategory = async() => {
        var result = await getData('userinterface/show_all_category')
        if(result.status){
            setCategoryData(result.data)
        }
      }

      const fetchAllSubCategory = async(cid) =>{
        var result = await postData('userinterface/fetch_all_subcategory_by_categoryid',{categoryid:cid})
        if(result.status){
            console.log(result.message)
            setSubCategoryData(result.data)
        }
    }  
    
    useEffect(function(){
        fetchAllcategory()
    },[])

    useEffect(function(){
        fetchAllSubCategory()
    },[])

    const handleClick = (event, categoryid) =>{
        fetchAllSubCategory(categoryid)
        setAnchorEl(event.currentTarget)
    }

    const showAllCategory = () =>{
        return categoryData.map((item)=>{
            return <Button onClick={(event)=>handleClick(event, item.categoryid)} style={{color:'#000'}}>{item.categoryname}</Button>
        })
    }

    const showAllSubCategory = () =>{
        return subCategoryData.map((item)=>{
            return <MenuItem style={{color:'#000'}} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const handleClose = () =>{
        setAnchorEl(null)
    }

    return(
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{background:'#fff'}}>
          <Toolbar style={{display:'flex', justifyContent:'center'}}>
            {showAllCategory()}
            <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            >
                {showAllSubCategory()}
            </Menu>
          </Toolbar>
        </AppBar>
    </Box>)
}