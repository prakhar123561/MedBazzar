import { Grid } from "@mui/material";
import ProductPictures from "../../components/userinterface/ProductPictures";
import ProductInformation from "../../components/userinterface/ProductInformation";
import { useLocation } from "react-router-dom";
import Header from "../../components/userinterface/Header";
import { useState } from "react";

export default function ProductDetails(){
    var location = useLocation()

    const [pageRefresh, setPageRefresh] = useState(false)

    var item = location?.state?.data
    // alert(JSON.stringify(item))
    return(<div>
        <Header/>
        <Grid container spacing={1} style={{display:'flex',justifyContent:"flex-start",alignItems:"flex-start",marginTop:20,marginLeft:20,marginRight:20, height:'20%'}}>
            {/* <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}> */}
                <Grid item xs={4} >
                    <ProductPictures item={item}/>
                </Grid>
                <Grid item xs={6} style={{width:'20%',marginLeft:5}} >
                    <ProductInformation pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} item={item}/>
                </Grid>
            </Grid>
        {/*  </Grid> */}
        </div>
    )
}