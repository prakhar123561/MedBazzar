import { Grid } from "@mui/material";
import FilterList from "../../components/userinterface/FilterList";
import ProductList from "../../components/userinterface/ProductList";
import { useLocation, useParams } from "react-router-dom";
import { postData } from "../../services/fetchNodeServices";
import { useEffect, useState } from "react";
import Header from "../../components/userinterface/Header";
import MenuBar from "../../components/userinterface/MenuBar";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function FilterPage(props) {
    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))


    var location = useLocation()
    var param = useParams()
   
    // var categoryname = location.state.categoryname


    const [products, setProducts] = useState([])
    const [productsBySub, setProductsBySub] = useState([])
    const [pageRefresh, setPageRefresh] = useState(false)
    const [status, setstatus] = useState(false)

    var categoryid = ''
    // try {
    if (location?.state?.categoryid == undefined)

        categoryid = null
    else
        categoryid = location?.state?.categoryid
    // }
    // catch (e) {

    // }

    var subcategoryid = ''
    // try {
    if (location?.state?.subcategoryid == undefined) {
        subcategoryid = null

    }
    else
        subcategoryid = location?.state?.subcategoryid

    // }
    // catch (e) {

    // }
    // var catid = location?.state?.categoryid
    
    /* var pattern=''
    try
    { 
      if(location?.state?.pattern==undefined)
        pattern=null
      else   
        pattern=location?.state?.pattern
    }
    catch(e){} */

    const fetchAllProductbysubcategoryid = async () => {
        var result = await postData('userinterface/display_all_productdetail_by_subcategory', { 'categoryid': categoryid, 'subcategoryid': subcategoryid })
        if (result.status) {
            setProductsBySub(result.data)
            setstatus(true)   
        }
    }

    useEffect(function () {
        fetchAllProductbysubcategoryid()
    }, [categoryid, subcategoryid])

    const fetchAllProduct = async () => {
        var result = await postData('userinterface/display_all_productdetail_by_category', { 'categoryid': categoryid, 'pattern': param.pattern })
        if (result.status) {
            setProducts(result.data)
            setstatus(false)  
        }
    }

    useEffect(function () {
        fetchAllProduct()

    }, [param.pattern])


    return (<div>
        <Header />
        {matchesMd ? <div></div> : <MenuBar />}
        <Grid container spacing={2} style={{ marginTop: 20 }}>
            <Grid item xs={matchesMd ? 4 : 2}>
                <FilterList categoryid={categoryid} />
            </Grid>
            <Grid item xs={matchesMd ? 6 : 8} style={{ marginLeft: 55, marginBottom: 15 }}>
                <ProductList products={products} status={status} setstatus={setstatus} productsBySub={productsBySub} setPageRefresh={setPageRefresh} pageRefresh={pageRefresh} />
            </Grid>
        </Grid>
    </div>)
}