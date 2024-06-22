import { Grid } from "@mui/material";
import ProductPictures from "../../components/userinterface/ProductPictures";
import ProductInformation from "../../components/userinterface/ProductInformation";
import { useLocation } from "react-router-dom";
import Header from "../../components/userinterface/Header";
import { useEffect, useState } from "react";
import ProductDescription from "../../components/userinterface/ProductDescription";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FooterComponent from "../../components/userinterface/FooterComponent"
import { getData, postData } from "../../services/fetchNodeServices";
import ProductComponent from "../../components/userinterface/ProductComponent";

export default function ProductDetails(){
    var location = useLocation()
    var theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))

    const [pageRefresh, setPageRefresh] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [productListOffer2, setProductListOffer2] = useState([])


    var item = location?.state?.data
    // alert(JSON.stringify(item))

    const fetchAllcategory = async() =>{
        var result = await getData('userinterface/show_all_category')
        if(result.status){
            setCategoryList(result.data)
        }
    }

    const fetchAllProductDetails = async(offertype) =>{
        var result = await postData('userinterface/display_all_productdetail_by_offer',{offertype})
        if(result.status){
            setProductListOffer2(result.data)
            
        }
    }

     useEffect(function(){
        fetchAllcategory()
        fetchAllProductDetails('Season Sale')
     },[])
    return(<div>
        <Header/>
        <Grid container spacing={1} style={{display:'flex',justifyContent:"flex-start",alignItems:"flex-start",flexDirection:matchesMd?'column':'row',marginTop:20,marginLeft:20,marginRight:20, height:'20%', width:'98.7%'}}>
            {/* <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}> */}
                <Grid item xs={matchesMd?12:4} >
                    <ProductPictures item={item}/>
                </Grid>
                <Grid item xs={matchesMd?12:6} style={{width:matchesMd?'100%':'20%',marginLeft:5}} >
                    <ProductInformation pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} item={item}/>
                </Grid>
            </Grid>
            <div style={{padding:1,background:'#e7eaee', marginTop:30}}/>
            <Grid item xs={10} style={{display:'flex', justifyContent:'flex-start'}}>
                <ProductDescription title="Product Desctription" item={item}/>
            </Grid>
            <div style={{padding:2,background:'#e7eaee', marginTop:30}}/>

            <div style={{display:'flex', justifyContent:'center', marginTop:20,marginBottom:25}}>
            <ProductComponent title="Trending Products" pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={productListOffer2}/>
        </div>
        {/*  </Grid> */}
        {matchesMd?<div></div>:<div style={{display:'flex', justifyContent:'center', marginTop:20}}>
            <FooterComponent data={categoryList}/>
        </div>}
        </div>
    )
}