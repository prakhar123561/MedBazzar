import { Grid } from "@mui/material";
import ShowCart from "../../components/userinterface/ShowCart";
import PaymentDetails from "../../components/userinterface/PaymentDetails";
import FooterComponent from "../../components/userinterface/FooterComponent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from "react";
import { getData, postData } from "../../services/fetchNodeServices";
import { useSelector } from "react-redux";
import Header from "../../components/userinterface/Header";
import DeliveryAddress from "../../components/userinterface/DeliveryAddress";
import AddAddress from "../../components/userinterface/AddAddress";

export default function Cart() {

    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))


    const [categoryList, setCategoryList] = useState([])
    const [pageRefresh, setPageRefresh] = useState(false)
    const [status, setStatus] = useState(false)
    const [userAddress, setUserAddress] = useState({})
    const [editStatus, setEditStatus] = useState(false)

    var products = useSelector(state => state.data)
    var userData = Object.values(useSelector(state => state.user))[0]
    

    const fetchAllcategory = async() =>{
        var result = await getData('userinterface/show_all_category')
        if(result.status){
            setCategoryList(result.data)
        }
    }

    const check_user_address = async () => {

        if (userData?.mobileno == undefined) { setStatus(false) }
        else {
            var result = await postData('users/check_user_address', { 'mobileno': userData?.mobileno })
            
            if (result.status == false) {
                setStatus(true)
                
            }
            else {
                setStatus(false)
                setUserAddress(result.data)
               
            }
        }
    }

    useEffect(function () {
        check_user_address()
    }, [userData?.mobileno, pageRefresh])

   useEffect(function(){
    fetchAllcategory()
   },[])

   

    return (<div >
        <Header pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
        {/* <div style={{maxWidth:'100vw',display:'flex',justifyContent:'center',alignItems:'center',marginTop:50,flexDirection:'column'}}> */}
        

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10, margin: 20, width: '90%' }}>
            <Grid container spacing={2} style={{ display: 'flex', flexDirection: matchesMd ? 'column' : 'row' }}>
                <Grid item xs={12} md={8}>
                    <div style={{ margin: 10, display: 'flex' }} >
                        <DeliveryAddress editStatus={editStatus} setEditStatus={setEditStatus} status={status}   userData={userData} userAddress={userAddress} setStatus={setStatus} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: 10, width: '100%' }}>
                        <ShowCart products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: 10, width: '100%' }}>
                        <PaymentDetails userData={userData} userAddress={userAddress} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} products={products} />
                    </div>
                </Grid>
            </Grid>
        </div>

        {matchesMd ? <div></div> : <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <FooterComponent data={categoryList} />
            </div>

        </div>}
        {/* </div> */}
        <AddAddress editStatus={editStatus} setEditStatus={setEditStatus} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userData={userData} status={status} setStatus={setStatus} />

    </div>
    )
}