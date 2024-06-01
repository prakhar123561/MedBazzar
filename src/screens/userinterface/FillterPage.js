import { Grid } from "@mui/material";
import FilterList from "../../components/userinterface/FilterList";
import ProductList from "../../components/userinterface/ProductList";
import { useLocation, useParams } from "react-router-dom";
import { postData } from "../../services/fetchNodeServices";
import { useEffect, useState } from "react";
import Header from "../../components/userinterface/Header";
import MenuBar from "../../components/userinterface/MenuBar";

export default function FilterPage(){
    var location = useLocation()
    var param = useParams()
    // var categoryname = location.state.categoryname
    

    const [products, setProducts] = useState([])
    const [pageRefresh, setPageRefresh] = useState(false)

    var categoryid=''
    try{
      if(location?.state?.categoryid==undefined)
    
   categoryid=null
    else
    categoryid=location?.state?.categoryid
    }
    catch(e){
     
    }
    /* var pattern=''
    try
    { 
      if(location?.state?.pattern==undefined)
        pattern=null
      else   
        pattern=location?.state?.pattern
    
    
}
    catch(e){} */

    const fetchAllProduct=async()=>{
        var result = await postData('userinterface/display_all_productdetail_by_category',{'categoryid':categoryid,'pattern':param.pattern})
        if(result.status){
            setProducts(result.data)
        }
    }

    useEffect(function(){
        fetchAllProduct()
    },[param.pattern])
 

    return(<div>
        <Header/>
        <MenuBar/>
        <Grid container spacing={2} style={{marginTop:20}}>
            <Grid item xs={2.6}>
                <FilterList categoryid={categoryid} />
            </Grid>
            <Grid item xs={8} style={{marginLeft:20}}>
                <ProductList   products={products}/>
            </Grid>
        </Grid>
    </div>)
}