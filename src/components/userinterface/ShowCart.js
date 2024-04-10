import { Button, Divider, Grid, Typography } from "@mui/material";
import { serverUrl } from "../../services/fetchNodeServices";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useDispatch } from "react-redux";
import InfoIcon from '@mui/icons-material/Info';
import PlusMinusComponent from "./PlusMinusComponent";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useNavigate } from "react-router-dom";

export default function ShowCart(props) {

    var dispatch = useDispatch()
    var navigate = useNavigate()
    var productFromRedux = props.products

    var productDetail = Object.values(productFromRedux)

    var keys = Object?.keys(productFromRedux)
    var len = keys.length

    const handleChange = (v, item) => {
        // alert(v)
        if (v > 0) {
            item['qty'] = v

            dispatch({ type: "ADD_PRODUCT", payload: [item.productdetailid, item] })
        }
        else {
            dispatch({ type: "DELETE_PRODUCT", payload: [item.productdetailid] })
        }
        props.setPageRefresh(!props.pageRefresh)
    }

    const handleDelete = (item) => {
        alert(item.productdetailid)

        dispatch({ type: "DELETE_PRODUCT", payload: [item.productdetailid] })
        props.setPageRefresh(!props.pageRefresh)
    }



    const showCartDetails = () => {
        return productDetail.map((item) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: "flex-start", marginTop: '20px', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: 12, display: 'flex', justifyContent: 'center', gap: 4 }} ><span>Prescription is not required</span> <InfoIcon sx={{ fontSize: 14, fill: 'rgb(100, 116, 139)' }} /></div>
                    <Grid container spacing={1} style={{ maxWidth: '900px', minWidth: '450px', borderBlockWidth: '1px', borderLeftWidth: '1px', borderRightWidth: '1px', borderColor: 'rgb(231 234 238)', borderStyle: 'solid', padding: '16px 16px', boxShadow: '1px 1px 5px 0px #00000010' }}>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-evenly', display: "flex", flexDirection: 'row', gap: 20, paddingRight: 10 }}>
                            <Grid item xs={2}>
                                <div>
                                    <img src={`${serverUrl}/images/${item.picture}`} style={{ height: 80 }} />
                                </div>
                            </Grid>

                            <Grid item xs={10} >

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <Typography component="h3" style={{ fontSize: 20, fontWeight: 600 }}>{item.productname}, {item.weight}{item.weighttype}</Typography>
                                        <Typography component="h3" style={{ opacity: 0.7, fontSize: 12, paddingTop: 8 }}>{item.brandname} | {item.weight}{item.weighttype}</Typography>
                                        <Typography component="h3" style={{ fontSize: 22, fontWeight: 700, paddingTop: 16, paddingBottom: 8 }}>&#x20B9;{item.offerprice}  <s style={{ fontSize: 14, fontWeight: 500, color: 'grey' }}>MRP &#x20B9;{item.price}</s></Typography>
                                    </div>

                                    <div>
                                        <PlusMinusComponent size={true} qty={item?.qty} onChange={(v) => handleChange(v, item)} />
                                    </div>
                                </div>


                            </Grid></Grid>

                        <Grid item xs={2}></Grid>

                        <Grid item xs={10} >

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 5, paddingBottom: 16, marginLeft: 15 }}>
                                <AccessTimeOutlinedIcon sx={{ fontSize: 14, color: 'red' }} />
                                <Typography style={{ fontSize: 12, opacity: 0.8, fontWeight: 500 }} component='p'>Delivery within <strong>2hrs</strong></Typography>
                            </div>

                            <Divider />

                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 30, paddingTop: 16, paddingBottom: 8, marginLeft: 15 }}>
                                <div onClick={() => handleDelete(item)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 4, color: 'red', cursor: 'pointer' }}>

                                    <DeleteOutlinedIcon /><Typography style={{ fontSize: 12 }} component='p'>Remove</Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                                    <BookmarkAddOutlinedIcon /><Typography style={{ fontSize: 12 }} component='p'>Add to Favourites</Typography>
                                </div>
                            </div>

                        </Grid>

                    </Grid>
                </div>
            )

        })
    }



    return (<div>
        <h2 style={{ fontWeight: 600 }}>{len} Items in your Cart</h2>
        <div>{showCartDetails().reverse()}</div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/home')}><AddBoxOutlinedIcon /><h4>Add More Items</h4></div>

    </div>
    )

}