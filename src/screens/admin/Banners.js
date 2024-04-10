import { Button, FormControl, Grid, MenuItem, Select, InputLabel, Avatar, FormHelperText } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";
import { useStyles } from "./BannersCss";
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/fetchNodeServices";

export default function Banners(){
    var classes = useStyles()

    const [bannerType, setBannerType] = useState('')
    const [brandId, setBrandId] = useState('')
    const [brandData, setBrandData] = useState([])
    const [picture, setPicture] = useState({file:[]})
    const [error, setError] = useState({})

    const handlePicture = (event) =>{
        try{
        setPicture({file:Object.values(event.target.files)})
        }
        catch(e){
            setPicture({file:[]})
        }
    }

    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
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

    useEffect(function(){
        fetchAllBrand()
    },[])
    
    const fillAllBrand = () =>{
        if(bannerType == 'Brand'){
            return brandData.map((item)=>{
                return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
            })
        }
        else{
            return <MenuItem value={0}>None</MenuItem>
        }
    }

    function showImage(){
        return picture?.file?.map((item)=>{
               return <div style={{margin: 2}}><Avatar src={URL.createObjectURL(item)} variant="circular" /></div> 
            })
    }

    const handleSubmit = async() =>{
        var submit = true
        if(bannerType.length == 0){
            handleError('bannerType','Pls Input Banner Type')
            submit = false
        }
        if(brandId.length == 0){
            handleError('brandId','Pls Input Brand Name')
            submit = false
        }
        if(picture.file.length == 0){
            handleError('picture','Pls Select Picture')
            submit = false
        }
        if(submit){
        var data = new FormData()
        data.append('bannertype',bannerType)
        data.append('brandid',brandId)
        picture.file.map((item,i)=>{
            data.append('picture'+i,item)
        })
        var result = await postData('banner/submit_banner',data)
        if(result.status){
            alert(result.message)
        }else{
            alert(result.message)
        }}
    }

    const handleReset = () =>{
        setBannerType('')
        setBrandId('')
        setPicture({file:[]})
    }

    return(
        <div className={classes.root}>
            <div className={classes.box}>
                <TitleComponent  title="Add New Banners"  path="/admindashboard/displayallbanner"/>
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Banner Type</InputLabel>
                    <Select
                     value={bannerType}
                     label="Banner Type"
                     onChange={handleChangeBanner}
                     onFocus={() => handleError('bannerType',null)}
                    >
                        <MenuItem value="General">General</MenuItem>
                        <MenuItem value="Brand">Brand</MenuItem>
                        <MenuItem value="Trending">Trending</MenuItem>
                        <MenuItem value="Latest">Latest</MenuItem>
                        <MenuItem value="Popular">Popular</MenuItem>
                    </Select>
                    <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.bannerType}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select
                    defaultValue={0}
                     value={brandId}
                     label="Brand"
                     onChange={handleChangeBrand}
                     onFocus={() => handleError('brandId',null)}
                    >
                       {fillAllBrand()} 
                    </Select>
                    <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.brandId}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={6} style={{height: 120, display: 'flex', alignItems: 'center'}}>
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input type="file" onChange={handlePicture} onClick={() => handleError('picture',null)} accept="image/*" multiple hidden/>
                </Button>
                {error.picture?<span style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13,fontWeight:600}}>{error.picture}</span>:<span></span>}
            </Grid>
            <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', height: 120, overflowY: 'scroll'}} >
                {showImage()}
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