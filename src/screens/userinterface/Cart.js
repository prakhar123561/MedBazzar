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

export default function Cart(){

    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

    var products = useSelector(state=>state.data)

    const [categoryList, setCategoryList] = useState([])
    const [pageRefresh, setPageRefresh] = useState(false)

    const fetchAllcategory = async() =>{
        var result = await getData('userinterface/show_all_category')
        if(result.status){
            setCategoryList(result.data)
        }
    }

    useEffect(function(){
        fetchAllcategory()
        
    },[])

    return(<div >
        <Header/>
        {/* <div style={{maxWidth:'100vw',display:'flex',justifyContent:'center',alignItems:'center',marginTop:50,flexDirection:'column'}}> */}
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', padding:10,margin:20, width:'90%'}}>
            <Grid container spacing={2} style={{display:'flex',flexDirection:matchesMd?'column':'row'}}>
                <Grid item xs={12} md={8}>
            <div style={{display:'flex', justifyContent:'center', margin:10,width:'100%'}}>
                <ShowCart products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
            </div>
            </Grid>
                <Grid item xs={12} md={4}>
            <div style={{display:'flex', justifyContent:'center', margin:10, width:'100%'}}>
                <PaymentDetails products={products}/>
            </div>
            </Grid>
            </Grid>
        </div>
        {matchesMd?<div></div>:<div>
        <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
        <FooterComponent data={categoryList}/>
        </div>
            
            </div>}
            {/* </div> */}
            </div>
    )
}