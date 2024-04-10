import TitleComponent from '../../components/admin/TitleComponent'
import { useStyles } from '../../screens/admin/ProductDetailsCss'
import MaterialTable from '@material-table/core'
import { Grid, Button, TextField, Avatar } from '@mui/material'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useEffect } from 'react'
import { getData, postData, serverUrl } from '../../services/fetchNodeServices'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2'

export default function DisplayAllProductDetail() {
    var classes = useStyles()
    var navigate = useNavigate()

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
    const [picture, setPicture] = useState({ file: [], bytes: '' })
    const [open, setOpen] = useState(false)
    const [productDetailId, setProductDetailId] = useState('')
    const [productDetailData, setProductDetailData] = useState([])
    const [showBtn, setShowBtn] = useState(false)
    const [tempPicture, setTempPicture] = useState('')
    const [error, setError] = useState({})

    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }))
    }
    console.log('productdetaildata:', productDetailData)
    const handlePicture = (event) => {
        if (Object.values(event.target.files).length >= 3) {
            try {
                setPicture({ file: Object.values(event.target.files), bytes: event.target.files })
                setShowBtn(true)
            }
            catch (e) {
                setPicture({ file: [], bytes: '' })

            }
            // setPicture({file:`${serverUrl}/images/${tempPicture.split(",")[0]}`,bytes:""})

        }
        else {
            alert('Please upload 3 or more files')
        }
    }

    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        if (result.status) {
            console.log(result.message)
            setCategoryData(result.data)
        }
    }

    const fetchAllSubCategory = async (cid) => {
        var result = await postData('subcategory/fetch_all_subcategory_by_categoryid', { categoryid: cid })
        if (result.status) {
            console.log(result.message)
            setSubCategoryData(result.data)
        }
    }

    const fetchAllBrand = async () => {
        var result = await getData('brand/display_all_brand')
        if (result.status) {
            setBrandData(result.data)
        }
    }

    const fetchAllProduct = async (bid) => {
        var result = await postData('product/fetch_all_product_by_brandid', { brandid: bid })
        if (result.status) {
            setProductData(result.data)
        }
    }

    const fetchAllConcern = async () => {
        var result = await getData('concern/display_all_concern')
        if (result.status) {
            setConcernData(result.data)
        }
    }

    const handleChangeCategory = (event) => {
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])
    console.log('dataaaa of category', categoryData)

    useEffect(function () {
        fetchAllSubCategory()
    }, [])
    console.log('dataaaa of subcategory', subCategoryData)

    useEffect(function () {
        fetchAllBrand()
    }, [])
    console.log('dataaaa of brand', brandData)

    useEffect(function () {
        fetchAllProduct()
    }, [])
    console.log('dataaaa of product', productData)

    useEffect(function () {
        fetchAllConcern()
    }, [])

    const fillAllCategory = () => {
        return categoryData.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const fillAllSubCategory = () => {
        return subCategoryData.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const fillAllBrand = () => {
        return brandData.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleChangeBrand = (event) => {
        setBrandId(event.target.value)
        fetchAllProduct(event.target.value)
    }

    const fillAllProduct = () => {
        return productData.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    const fillAllConcern = () => {
        return concernData.map((item) => {
            return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>
        })
    }

    const fetchAllProductDetail = async () => {
        var result = await getData('productdetail/display_all_productdetail')
        if (result.status) {
            setProductDetailData(result.data)
        }
    }

    useEffect(function () {
        fetchAllProductDetail()
    }, [])

    const handleEditData = async () => {
        var submit = true
        if (categoryId.length == 0) {
            handleError("categoryId", "pls input category")
            submit = false
        }
        if (subCategoryId.length == 0) {
            handleError("subcategoryId", "pls input subcategory")
            submit = false
        }
        if (brandId.length == 0) {
            handleError("brandId", "pls input category")
            submit = false
        }
        if (productSubName.length == 0) {
            handleError("ProductSubName", "pls input Productsubname")
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
        if (submit) {
            var body = {
                categoryid: categoryId, subcategoryid: subCategoryId, brandid: brandId, productid: productId, productsubname: productSubName, concernid: concernId, description: description,
                weight: weight, weighttype: weightType, type: type, packaging: packaging, qty: quantity, price: price, offerprice: offerPrice, offertype: offerType, productdetailid: productDetailId
            }
            var result = await postData('productdetail/edit_productdetail_data', body)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: result.message,
                    timer: 1500,
                    toast: true,
                })
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer: 1500,
                    toast: true,
                })
            }
            fetchAllProductDetail()
        }
    }

    const handleEditPicture = async () => {
        var data = new FormData()
        picture.file.map((item, i) => {
            return data.append('picture' + i, item)
        })
        data.append('productdetailid', productDetailId)
        var result = await postData('productdetail/edit_picture', data)
        if (result.status) {
            Swal.fire({
                icon: "success",
                title: result.message,
                timer: 1500,
                toast: true,
            })
        }
        else {
            Swal.fire({
                icon: "error",
                title: result.message,
                timer: 1500,
                toast: true,


            })
        }
        fetchAllProductDetail()
        setShowBtn(false)
    }
    console.log('productdetaildata', productDetailData)
    const handleClose = () => {
        setOpen(false)
    }

    const handleCancel = () => {
        setShowBtn(false)
        setPicture({ file: [] })
    }

    const handleOpen = (rowData) => {
        setOpen(true)
        setProductDetailId(rowData.productdetailid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        fetchAllSubCategory(rowData.categoryid)
        setBrandId(rowData.brandid)
        fetchAllProduct(rowData.brandid)
        setProductId(rowData.productid)
        setProductSubName(rowData.productsubname)
        setConcernId(rowData.concernid)
        setDescription(rowData.description)
        setWeight(rowData.weight)
        setWeightType(rowData.weighttype)
        setType(rowData.type)
        setPackaging(rowData.packaging)
        setQuantity(rowData.qty)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setOfferType(rowData.offertype)
        // setPicture({ file: `${serverUrl}/images/${rowData.picture}` })
        setTempPicture(rowData.picture)
        
    }

    const handleDelete = async (rowData) => {
        Swal.fire({
            title: "Do you want to Delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var body = { productdetailid: rowData.productdetailid }
                var result = await postData('productdetail/delete_productdetail', body)
                if (result.status) {
                    Swal.fire({
                        icon: 'success',
                        title: result.message,
                        timer: 3000,
                        toast: true
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: result.message,
                        timer: 1500,
                        toast: true
                    });
                }
                fetchAllProductDetail()

            } else if (result.isDenied) {
                Swal.fire({
                    icon: 'info',
                    title: 'Your Record is safe',
                    timer: 1500,
                    toast: true
                });
            }
        });
    }



    function ShowProductsDetailForm() {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'md'}
            >
                <DialogContent>
                    <div className={classes.box}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TitleComponent logo="medbazzar2.png" title="Edit ProductsDetail" />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Category Name</InputLabel>
                                    <Select
                                        label="Category Name"
                                        value={categoryId}
                                        onChange={handleChangeCategory}
                                    >
                                        {fillAllCategory()}
                                    </Select>
                                    <FormHelperText style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 400, fontSize: 13 }}>{error.categoryId}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>SubCategory Name</InputLabel>
                                    <Select
                                        label="SubCategory Name"
                                        value={subCategoryId}
                                        onChange={(event) => setSubCategoryId(event.target.value)}
                                    >
                                        {fillAllSubCategory()}
                                    </Select>
                                    <FormHelperText style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 400, fontSize: 13 }}>{error.subCategoryId}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Brand Name</InputLabel>
                                    <Select
                                        label="Brand Name"
                                        value={brandId}
                                        onChange={handleChangeBrand}
                                    >
                                        {fillAllBrand()}
                                    </Select>
                                    <FormHelperText style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 400, fontSize: 13 }}>{error.brandId}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Product Name</InputLabel>
                                    <Select
                                        label="Product Name"
                                        value={productId}
                                        onChange={(event) => setProductId(event.target.value)}
                                    >
                                        {fillAllProduct()}
                                    </Select>
                                    <FormHelperText style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 400, fontSize: 13 }}>{error.productId}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onFocus={() => handleError('productSubName', null)} onChange={(event) => setProductSubName(event.target.value)} error={error.productSubName} helperText={error.productSubName} label="Product SubName" value={productSubName} fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Concern</InputLabel>
                                    <Select
                                        label="Concern"
                                        value={concernId}
                                        onChange={(event) => setConcernId(event.target.value)}
                                        onFocus={() => handleError('concernId', null)}>
                                        {fillAllConcern()}
                                    </Select>

                                    <FormHelperText style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 400, fontSize: 13 }}>{error.concernId}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <ReactQuill theme="snow" placeholder='Description' value={description} onChange={(event) => setDescription(event)} />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField onFocus={() => handleError('weight', null)} onChange={(event) => setWeight(event.target.value)} error={error.weight} helperText={error.weight} label="Weight" value={weight} fullWidth />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Weight Type</InputLabel>
                                    <Select
                                        label="Weight Type"
                                        value={weightType}
                                        onChange={(event) => setWeightType(event.target.value)}>
                                        <MenuItem value="mg">MiliGram</MenuItem>
                                        <MenuItem value="gm">Gram</MenuItem>
                                        <MenuItem value="ml">MiliLeter</MenuItem>
                                        <MenuItem value="l">Leter</MenuItem>
                                    </Select>
                                    <FormHelperText style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 400, fontSize: 13 }}>{error.weightType}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        label="Type"
                                        value={type}
                                        onChange={(event) => setType(event.target.value)}>
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
                                    <FormHelperText style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 400, fontSize: 13 }}>{error.type}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Packaging</InputLabel>
                                    <Select
                                        label="Packaging"
                                        value={packaging}
                                        onChange={(event) => setPackaging(event.target.value)}>
                                        <MenuItem value="Box">Box</MenuItem>
                                        <MenuItem value="Bottle">Bottle</MenuItem>
                                        <MenuItem value="Strip">Strip</MenuItem>
                                    </Select>
                                    <FormHelperText style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 400, fontSize: 13 }}>{error.packaging}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField onFocus={() => handleError('quantity', null)} onChange={(event) => setQuantity(event.target.value)} label="Quantity" error={error.quantity} helperText={error.quantity} value={quantity} fullWidth />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField onFocus={() => handleError('price', null)} onChange={(event) => setPrice(event.target.value)} label="Price" error={error.price} helperText={error.price} value={price} fullWidth />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField onFocus={() => handleError('offerPrice', null)} onChange={(event) => setOfferPrice(event.target.value)} label="Offer Price" error={error.offerPrice} helperText={error.offerPrice} value={offerPrice} fullWidth />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Offer Type</InputLabel>
                                    <Select
                                        label="Offer Type"
                                        value={offerType}
                                        onChange={(event) => setOfferType(event.target.value)}>
                                        <MenuItem value="Bonanza Sale">Bonanza Sale</MenuItem>
                                        <MenuItem value="Season Sale">Season Sale</MenuItem>
                                        <MenuItem value="Winter Sale">Winter Sale</MenuItem>
                                    </Select>
                                    <FormHelperText style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 400, fontSize: 13 }}>{error.offerType}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                {showBtn ? <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}><Button onClick={handleEditPicture} variant='contained'>Save</Button><Button onClick={handleCancel} variant='contained'>Cancel</Button></div> : <div>
                                    <Button variant="contained" component="label" fullWidth>
                                        Upload
                                        <input id='file-input' onClick={() => handleError('picture', null)} onChange={handlePicture} type="file" hidden accept="image/*" multiple />
                                    </Button></div>}
                                {error.picture ? <span style={{ color: '#d32f2f', marginLeft: '4%', fontWeight: 500, fontSize: 13 }}>{error.picture}</span> : <span></span>}
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', height: 100, overflowY: 'scroll' }}>
                                {/* {showImage()} */}
                                {showBtn == true ? showImage() : showImages()}
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

    const handleRemove = (index) => {
        const newImages = [...picture.file];
        newImages.splice(index, 1);
        if (newImages.length >= 3) {
            setPicture({ file: newImages })
        }
        else {
            setPicture({ file: [], bytes: '' });
            alert('Please upload 3 or more files')
        }
        //Reset file input value to clear selected files
        const fileInput = document.getElementById('file-input')
        if (fileInput) {
            fileInput.value = ''
        }
    };

    function showImage() {
        return picture?.file?.map((item, index) => {
            return <div style={{ margin: 2 }}><Avatar src={URL.createObjectURL(item)} alt={`URL.createObjectURL(item)${index}`} variant="circular" />
                <button className="remove-btn" onClick={() => handleRemove(index)}>
                    &#10006;
                </button>
            </div>
        })
    }
    console.log("tempPitcure", tempPicture)
    function showImages() {
        return tempPicture.split(",").map((item, index) => {
            return <div style={{ margin: 2 }}>
<Avatar src={`${serverUrl}/images/${item}`} variant="circular" />
                {/* <img src={`${serverUrl}/images/${item}`} width='50' /> */}
            </div>

        })
    }


    function ShowProductsDetail() {
        return (
            <MaterialTable

                title="Main Products Detail"
                columns={[
                    { title: 'Product ID', field: 'productdetailid' },
                    { title: 'Category ', render: (rowData) => <div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div> },
                    { title: 'Product ', render: (rowData) => <div><div>{rowData.brandname}</div><div>{rowData.productname} {rowData.productsubname} {rowData.weight} {rowData.weighttype}</div></div> },
                    { title: 'Concern', field: 'concernname' },
                    { title: 'Type', render: (rowData) => <div><div>{rowData.qty} {rowData.type}</div><div>{rowData.packaging}</div></div> },
                    { title: 'Price', render: (rowData) => <div><div><s>&#8377; {rowData.price}</s></div><div>&#8377; {rowData.offerprice}</div></div> },
                    { title: 'Offer Type', field: 'offertype' },
                    { title: 'Icon', field: 'picture', render: (rowData) => <img src={`${serverUrl}/images/${rowData.picture.split(",")[0]}`} width='50' /> }
                ]}
                data={productDetailData}
                options={{
                    paging: true,
                    pageSize: 3,       // make initial page size
                    emptyRowsWhenPaging: false,   // To avoid of having empty rows
                    pageSizeOptions: [3, 6, 9, 12],    // rows selection options
                }}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Detail',
                        onClick: (event, rowData) => { handleOpen(rowData) }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Detail',
                        onClick: (event, rowData) => { handleDelete(rowData) }
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add New Detail',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/productdetail')
                    }
                ]}
            />
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.boxTable}>
                {ShowProductsDetail()}
            </div>
            {ShowProductsDetailForm()}
        </div>
    )
}