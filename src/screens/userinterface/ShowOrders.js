import { useEffect, useState } from "react";
import { postData } from "../../services/fetchNodeServices";
import { useSelector } from "react-redux";
import { Typography, Grid, Divider, IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { serverUrl } from "../../services/fetchNodeServices";
import { useDispatch } from "react-redux";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export default function ShowOrders(props) {

    var dispatch = useDispatch()
    var navigate = useNavigate()
    var user = useSelector((state) => state.user)
    var userInformation = {}
    userInformation = Object.values(user)[0]
    var mobileno = userInformation?.mobileno

    const [orderlist, setOrderlist] = useState([])
    const [paymentStatus, SetPaymentStatus] = useState([])
    var pay = paymentStatus['paymentstatus']

    var len = orderlist.length
    const fetchAllOrder = async () => {
        var result = await postData('userinterface/show_all_orders', { 'mobileno': mobileno })
        if (result.status) {
            setOrderlist(result.data)

        }
    }

    var amountpaid = orderlist.reduce((p1, p2) => {
        var amt = p2.quantity * (p2.offerprice > 0 ? p2.offerprice : p2.price)
        return p1 + amt
    }, 0)

    const fetchOrderStatus = async () => {
        var result = await postData('users/show_order_status', { 'mobileno': mobileno })
        if (result.status) {
            SetPaymentStatus(result.data)

        }
        else if (paymentStatus == undefined || paymentStatus == '') {

            {
                pay = "no Payment available"
            }
        }
    }
    useEffect(function () {
        fetchAllOrder()
        fetchOrderStatus()
    }, [])



    const showCartDetails = () => {
        return orderlist.map((item) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '20px', flexDirection: 'column', gap: 10, marginBottom: 20, marginRight: 20, width: '95%' }}>
                    <div style={{ fontSize: 12, display: 'flex', justifyContent: 'center', gap: 4 }} ><span>Prescription is not required</span> <InfoIcon sx={{ fontSize: 14, fill: 'rgb(100, 116, 139)' }} /></div>
                    <Grid container spacing={1} style={{ maxWidth: '900px', minWidth: '450px', borderBlockWidth: '1px', borderLeftWidth: '1px', borderRightWidth: '1px', borderColor: 'rgb(231 234 238)', borderStyle: 'solid', padding: '16px 16px', boxShadow: '1px 1px 5px 0px #00000010' }}>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-evenly', display: "flex", flexDirection: 'row', gap: 20, paddingRight: 10 }}>
                            <Grid item xs={2}>
                                <div>
                                    <img src={`${serverUrl}/images/${item.single_picture}`} style={{ height: 80 }} />
                                </div>
                            </Grid>

                            <Grid item xs={10} >

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <Typography component="h3" style={{ fontSize: 20, fontWeight: 600 }}>{item.productname}, {item.weight}{item.weighttype}</Typography>
                                        <Typography component="h3" style={{ opacity: 0.7, fontSize: 12, paddingTop: 8 }}>{item.productsubname}|{item.weight}{item.weighttype}</Typography>
                                        <Typography component="h3" style={{ fontSize: 22, fontWeight: 700, paddingTop: 16, paddingBottom: 8 }}>&#x20B9;{item.offerprice}  <s style={{ fontSize: 14, fontWeight: 500, color: 'grey' }}>MRP &#x20B9;{item.price}</s></Typography>
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
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 4, color: 'red', cursor: 'pointer' }}>

                                    <div style={{ padding: 5, background: "Green", color: '#fff', letterSpacing: 5 }}>Payment:{pay}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                                    <div style={{ padding: 5, background: "red", color: '#fff' }}>Qty:{item.quantity}</div>
                                </div>
                            </div>

                        </Grid>

                    </Grid>

                </div>
            )

        })
    }


    return (<div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <h1><IconButton onClick={() => navigate('/home')} title="Back to Home"><ArrowBackIcon /></IconButton></h1>
            <h2 style={{ fontWeight: 600, paddingLeft: 30 }}>{len} Items in your Cart</h2>
        </div>
        <div style={{ paddingLeft: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>{showCartDetails().reverse()}
            <div style={{ padding: 5, background: "red", color: '#fff', width: 100 }}>Paid:{amountpaid} only</div>
        </div>
    </div>
    )
}