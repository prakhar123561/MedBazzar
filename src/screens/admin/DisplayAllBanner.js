import { Button, FormControl, Grid, MenuItem, Select, InputLabel, Avatar } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";
import { useStyles } from "./BannersCss";
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/fetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MaterialTable from "@material-table/core";
import { serverUrl } from "../../services/fetchNodeServices";
import { useNavigate } from "react-router-dom";

export default function DisplayAllBanner(){
    var classes = useStyles()
    var navigate = useNavigate()
    
    const [bannerType, setBannerType] = useState('')
    const [bannerId, setBannerId] = useState('')
    const [bannerData, setBannerData] = useState([])
    const [brandId, setBrandId] = useState('')
    const [brandData, setBrandData] = useState([])
    const [picture, setPicture] = useState({file:[]})
    const [open,setOpen] = useState(false)

    const handlePicture = (event) =>{
        setPicture({file:Object.values(event.target.files)})
    }

    const handleChangeBanner = (event) =>{
        setBannerType(event.target.value)
    }

    const handleChangeBrand = (event) =>{
        setBrandId(event.target.value)
    }

    const fetchAllBrand = async() =>{
        var result = await getData('brand/display_all_brand')
        if(result.status){
            setBrandData(result.data)
        }
    }

    const fetchAllBanner = async() =>{
        var result = await getData('banner/display_all_banner')
        if(result.status){
            setBannerData(result.data)
        }
    }

    useEffect(function(){
        fetchAllBrand()
    },[])

    useEffect(function(){
        fetchAllBanner()
    },[])
    
    const fillAllBrand = () =>{
        if(bannerType == 'Brand'){
            return brandData.map((item)=>{
                return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
            })
        }
        else{
            return <MenuItem value="0">None</MenuItem>
        }
    }

    function showImage(){
        return picture?.file?.map((item)=>{
               return <div style={{margin: 2}}><Avatar src={URL.createObjectURL(item)} variant="circular" /></div> 
            })
    }

    // const handleOpen = (rowData) =>{
    //     setOpen(true)
    //     setBannerId(rowData.bannerid)
    //     setBannerType(rowData.bannertype)
    //     setBrandId(rowData.brandid)
    //     setPicture({file:`${serverUrl}/images/${rowData.picture.split(',')[0]}`})

    // }

    const handleClose = () =>{
        setOpen(false)
    }

    function showBannerForm(){
       return( <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}>
            <DialogContent>
            <div className={classes.box}>
                <TitleComponent logo="medbazzar1.png" title="Add New Banners" listicon="listicon.png"/>
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Banner Type</InputLabel>
                    <Select
                     value={bannerType}
                     label="Banner"
                     onChange={handleChangeBanner}
                    >
                        <MenuItem value="General">General</MenuItem>
                        <MenuItem value="Brand">Brand</MenuItem>
                        <MenuItem value="Trending">Trending</MenuItem>
                        <MenuItem value="Latest">Latest</MenuItem>
                        <MenuItem value="Popular">Popular</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select
                     value={brandId}
                     label="Brand"
                     onChange={handleChangeBrand}
                    >
                       {fillAllBrand()} 
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input type="file" onChange={handlePicture} accept="image/*" multiple hidden/>
                </Button>
            </Grid>
            <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {showImage()}
            </Grid>
        </Grid>
            </div>
            </DialogContent>
            <DialogActions>
                <Button>Edit Data</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
       )
    }

    function showBanner(){
        return (
            <MaterialTable
              title="Main banners"
              columns={[
                { title: 'Banner Id', field: 'bannerid' },
                { title: 'Banner Type', field: 'bannertype' },
                { title: 'Brand Name', field: 'brandname' },
                { title: 'Icon', field: 'picture', render: (rowData) =><img src={`${serverUrl}/images/${rowData.picture.split(",")[0]}`} style={{width:50,height:50,borderRadius:50}} /> },
              ]}
              data={bannerData}

              options={{
                paging:true,
                pageSize:3,       // make initial page size
                emptyRowsWhenPaging: false,   // To avoid of having empty rows
                pageSizeOptions:[3,6,9,12],    // rows selection options
              }}

              actions={[
                
                  {
                    icon: 'add',
                    tooltip: 'Add New Banner',
                    isFreeAction: true,
                    onClick: (event) => navigate('/admindashboard/banner')
                  }
              ]}
            />
          )
    }

    return(
        <div className={classes.root}>
            {showBannerForm()}
            <div className={classes.boxTable}>
                {showBanner()}
            </div>
        </div>
    )
}