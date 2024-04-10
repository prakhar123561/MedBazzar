import { useEffect, useState } from "react";
import TitleComponent from "../../components/admin/TitleComponent";
import { useStyles } from "./ProductDetailsCss";
import { Avatar, Button, Grid, TextField } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { getData, postData } from "../../services/fetchNodeServices";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ProductDetails(){
    var classes = useStyles()

    const [categoryId, setCategoryId] = useState('')
    const [categoryData, setCategoryData] = useState([])
    const [subCategoryId, setSubCategoryId] = useState('')
    const [subCategoryData, setSubCategoryData] = useState([])
    const [brandId, setBrandId] = useState('')
    const [brandData, setBrandData] = useState([])
    const [productId, setProductId] = useState('')
    const [productData, setProductData] = useState([])
    const [productSubName, setProductSubName] = useState('')
    const [concernId, setConcernId] = useState('')
    const [concernData, setConcernData] = useState([])
    const [description, setDescription] = useState('')
    const [weight, setWeight] = useState('')
    const [weightType, setWeightType] = useState('')
    const [type, setType] = useState('')
    const [packaging, setPackaging] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [offerType, setOfferType] = useState('')
    const [picture, setPicture] = useState({file:[],bytes:''})
    const [error, setError] = useState({})

    const handleError = (label,msg) =>{
        setError((prev) => ({...prev, [label] : msg}))
    }

    const handlePicture = (event) =>{
        if(Object?.values(event.target.files).length >= 3){
            try{
                setPicture({file:Object?.values(event.target.files),bytes:event.target.files})
            }
            catch(e){
                setPicture({file:[],bytes:''})
            }
        }
        else{
            alert('Please upload 3 or more files')
        }
    }

    const handleRemove = (index) => {
        const newImages = [...picture.file];
        newImages.splice(index, 1);
        if(newImages.length >=3  ){
            setPicture({file: newImages})
        }
        else{
            setPicture({file:[], bytes: ''});
            alert('Please upload 3 or more files')
        }
        //Reset file input value to clear selected files
        const fileInput = document.getElementById('file-input')
        if(fileInput){
            fileInput.value=''
        }
      };

    function showImage(){
        return picture?.file?.map((item, index)=>{
            return <div style={{margin: 2}}><Avatar src={URL.createObjectURL(item)} alt={`URL.createObjectURL(item)${index}`} variant="rounded" />
            <button className="remove-btn" onClick={() => handleRemove(index)}>
              &#10006;
            </button></div>
        })
    }
    
    const fetchAllCategory = async() =>{
        var result = await getData('category/display_all_category')
        if(result.status){
            console.log(result.message)
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
        var result = await getData('brand/display_all_brand')
        if(result.status){
            setBrandData(result.data)
        }
    }

    const handleChangeBrand = (event) =>{
        setBrandId(event.target.value)
        fetchAllProduct(event.target.value)
    }

    const fetchAllProduct = async(bid) =>{
        var result = await postData('product/fetch_all_product_by_brandid',{brandid:bid})
        if(result.status){
            setProductData(result.data)
        }
    }

    const fetchAllConcern = async() =>{
        var result = await getData('concern/display_all_concern')
        if(result.status){
            setConcernData(result.data)
        }
        
    }

    useEffect(function(){
        fetchAllCategory()
    },[])
    console.log('dataaaa of category',categoryData)

    useEffect(function(){
        fetchAllSubCategory()
    },[])
    console.log('dataaaa of subcategory',subCategoryData)

    useEffect(function(){
        fetchAllBrand()
    },[])
    console.log('dataaaa of brand',brandData)

    useEffect(function(){
        fetchAllProduct()
    },[])
    console.log('dataaaa of product',productData)

    useEffect(function(){
        fetchAllConcern()
    },[])
    console.log('dataaaa of concern',concernData)

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

    const fillAllProduct = () =>{
        return productData.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    const fillAllConcern = () =>{
        return concernData.map((item)=>{
            return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>
        })
    }

    const handleSubmit = async() =>{
        var submit = true
        if (categoryId.length == 0) {
            handleError("categoryId", "pls input category")
            submit = false
        }
        if (subCategoryId.length == 0) {
            handleError("subCategoryId", "pls input subcategory")
            submit = false
        }
        if (brandId.length == 0) {
            handleError("brandId", "pls input category")
            submit = false
        }
        if (productId.length == 0) {
            handleError("productId", "pls input Productname")
            submit = false
        }
        if (productSubName.length == 0) {
            handleError("productSubName", "pls input Productsubname")
            submit = false
        }
        if (concernId.length == 0) {
            handleError("concernId", "pls input concern")
            submit = false
        }
        if (description.length == 0) {
            handleError("description", "pls input Description")
            submit = false
        }
        if (weight.length == 0) {
            handleError("weight", "pls input weight")
            submit = false
        }
        if (quantity.length == 0) {
            handleError("quantity", "pls input qty")
            submit = false
        }
        if (price.length == 0) {
            handleError("price", "pls input price")
            submit = false
        }
        if (offerPrice.length == 0) {
            handleError("offerPrice", "pls input offerPrice")
            submit = false
        }
        if (weightType.length == 0) {
            handleError("weightType", "pls input weightType")
            submit = false
        }
        if (type.length == 0) {
            handleError("type", "pls input type")
            submit = false
        }
        if (packaging.length == 0) {
            handleError("packaging", "pls input packaging")
            submit = false
        }

        if (offerType.length == 0) {
            handleError("offerType", "pls input offerType")
            submit = false
        }
        if(picture.file.length === 0){
            handleError('picture','Please Select Icon')
            submit = false
        }
        if(submit){
        var data = new FormData()
        data.append('categoryid',categoryId) 
        data.append('subcategoryid',subCategoryId)
        data.append('brandid',brandId)
        data.append('productid',productId)
        data.append('productsubname',productSubName)
        data.append('concernid',concernId)
        data.append('description',description)
        data.append('weight',weight)
        data.append('weighttype',weightType)
        data.append('type',type)
        data.append('packaging',packaging)
        data.append('qty',quantity)
        data.append('price',price)
        data.append('offerprice',offerPrice)
        data.append('offertype',offerType)
        picture.file.map((item,i)=>{
           return data.append('picture'+i,item)
        })
        var result = await postData('productdetail/submit_productdetail',data)
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
        setProductId('')
        setProductSubName('')
        setConcernId('')
        setDescription('')
        setWeight('')
        setWeightType('')
        setType('')
        setPackaging('')
        setQuantity('')
        setPrice('')
        setOfferPrice('')
        setOfferType('')
        setPicture({file:[],bytes:''})
    }

    return(
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TitleComponent logo="medbazzar2.png" title="Add New ProductDetails" listicon="listicon.png" path="/admindashboard/displayallproductdetail"/>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Category Name</InputLabel>
                            <Select
                            label = "Category Name"
                            value = {categoryId}
                            onChange={handleChangeCategory}
                            onFocus={()=>handleError('categoryId',null)}
                            >
                                {fillAllCategory()}
                            </Select>
                            <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.categoryId}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>SubCategory Name</InputLabel>
                            <Select
                            label = "SubCategory Name"
                            value = {subCategoryId}
                            onChange={(event) => setSubCategoryId(event.target.value)}
                            onFocus={()=>handleError('subCategoryId',null)}
                            >
                                {fillAllSubCategory()}
                            </Select>
                            <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.subCategoryId}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Brand Name</InputLabel>
                            <Select
                            label = "Brand Name"
                            value = {brandId}
                            onChange={handleChangeBrand}
                            onFocus={()=>handleError('brandId',null)}
                            >
                                {fillAllBrand()}
                            </Select>
                            <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.brandId}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Product Name</InputLabel>
                            <Select
                            label = "Product Name"
                            value = {productId}
                            onChange={(event) => setProductId(event.target.value)}
                            onFocus={()=>handleError('productId',null)}
                            >
                                {fillAllProduct()}
                            </Select>
                            <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.productId}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onFocus={() => handleError('productSubName',null)} onChange={(event) => setProductSubName(event.target.value)} label="Product SubName" error={error.productSubName} helperText={error.productSubName}  value={productSubName} fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Concern</InputLabel>
                            <Select
                            label="Concern"
                            value={concernId}
                            onChange={(event)=>setConcernId(event.target.value)}
                            onFocus={() => handleError('concernId',null)}
                            >
                                {fillAllConcern()}
                            </Select>
                            <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.concernId}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <ReactQuill theme="snow" placeholder="Description" value={description} onChange={(event)=>setDescription(event)} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField onFocus={() => handleError('weight',null)} onChange={(event) => setWeight(event.target.value)} error={error.weight} helperText={error.weight} label="Weight"  value={weight} fullWidth/>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Weight Type</InputLabel>
                            <Select
                            label="Weight Type"
                            value={weightType}
                            onChange={(event)=>setWeightType(event.target.value)}
                            onFocus={() => handleError('weightType',null)}>
                                <MenuItem value="mg">mg</MenuItem>
                                <MenuItem value="gm">gm</MenuItem>
                                <MenuItem value="ml">ml</MenuItem>
                                <MenuItem value="litre">litre</MenuItem>
                            </Select>
                            <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.weightType}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                            label="Type"
                            value={type}
                            onChange={(event)=>setType(event.target.value)}
                            onFocus={() => handleError('type',null)}>
                                <MenuItem value={"Syrup"}>Syrup</MenuItem>
                                <MenuItem value={"Lotion"}>Lotion</MenuItem>
                                <MenuItem value={"Scheche"}>Scheche</MenuItem>
                                <MenuItem value={"Tablet"}>Tablet</MenuItem>
                                <MenuItem value={"Capsule"}>Capsule</MenuItem>
                                <MenuItem value={"Powder"}>Powder</MenuItem>
                                <MenuItem value={"Spray"}>Spray</MenuItem>
                                <MenuItem value={"Packet"}>Packet</MenuItem>
                                <MenuItem value={"Cream"}>Cream</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select>
                            <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.type}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Packaging</InputLabel>
                            <Select
                            label="Packaging"
                            value={packaging}
                            onChange={(event)=>setPackaging(event.target.value)}
                            onFocus={() => handleError('packaging',null)}>
                                <MenuItem value="Box">Box</MenuItem>
                                <MenuItem value="Bottle">Bottle</MenuItem>
                                <MenuItem value="Strip">Strip</MenuItem>
                            </Select>
                            <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.packaging}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField onFocus={() => handleError('quantity',null)} onChange={(event) => setQuantity(event.target.value)} label="Quantity" error={error.quantity} helperText={error.quantity}  value={quantity} fullWidth/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField onFocus={() => handleError('price',null)} onChange={(event) => setPrice(event.target.value)} label="Price" error={error.price} helperText={error.price}  value={price} fullWidth/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField onFocus={() => handleError('offerPrice',null)} onChange={(event) => setOfferPrice(event.target.value)} label="Offer Price" error={error.offerPrice} helperText={error.offerPrice}  value={offerPrice} fullWidth/>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Offer Type</InputLabel>
                            <Select
                            label="Offer Type"
                            value={offerType}
                            onChange={(event)=>setOfferType(event.target.value)}
                            onFocus={() => handleError('offerType',null)}>
                                <MenuItem value="Bonanza Sale">Bonanza Sale</MenuItem>
                                <MenuItem value="Season Sale">Season Sale</MenuItem>
                                <MenuItem value="Winter Sale">Winter Sale</MenuItem>
                            </Select>
                            <FormHelperText style={{color:'#d32f2f',marginLeft:'4%',fontWeight:400,fontSize:13}}>{error.offerType}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" component="label" fullWidth>
                            Upload
                            <input id='file-input' onClick={() => handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="image/*" multiple/>
                        </Button>
                        {error.picture?<span style={{color:'#d32f2f',marginLeft:'4%',fontWeight:500,fontSize:13}}>{error.picture}</span>:<span></span>}
                    </Grid>
                    <Grid item xs={6} style={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap: 'wrap', height: 100, overflowY: 'scroll'}}>
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