import Header from "../../components/userinterface/Header"
import MenuBar from "../../components/userinterface/MenuBar"
import SliderComponent from "../../components/userinterface/SliderComponent"
import CategoryComponent from "../../components/userinterface/CategoryComponent"
import BrandComponent from "../../components/userinterface/BrandComponent"
import ProductComponent from "../../components/userinterface/ProductComponent"
import ProductComponent2 from "../../components/userinterface/ProductComponent2"
import ConcernComponent from "../../components/userinterface/ConcernComponent"
import FooterComponent from "../../components/userinterface/FooterComponent"
import { Divider } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from "react";
import { getData ,postData, serverUrl } from "../../services/fetchNodeServices";

export default function Home()
{
    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

    const [bannerList, setBannerList] = useState('')
    const [bannerList2, setBannerList2] = useState('')

    const [brandList, setBrandList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [productListOffer, setProductListOffer] = useState([])
    const [productListOffer2, setProductListOffer2] = useState([])

    const [concernList, setConcernList] = useState([])
    const [pageRefresh, setPageRefresh] = useState(false)

    const fetchAllcategory = async() =>{
        var result = await getData('userinterface/show_all_category')
        if(result.status){
            setCategoryList(result.data)
        }
    }

    const fetchAllBrand = async() =>{
        var result = await getData('userinterface/show_all_brand')
        if(result.status){
            setBrandList(result.data)
        }
    }

    const fetchAllBanner = async() =>{
        var result = await postData('userinterface/show_all_banner',{bannertype:'Popular'})
        if(result.status){
            setBannerList(result.data)
        }
    }

    const fetchAllBanner2 = async() =>{
        var result = await postData('userinterface/show_all_banner',{bannertype:'Latest'})
        if(result.status){
            setBannerList2(result.data)
        }
    }

    const fetchAllProductDetails = async(offertype) =>{
        var result = await postData('userinterface/display_all_productdetail_by_offer',{offertype})
        if(result.status){
            setProductListOffer(result.data)
        }
    }

    const fetchAllProductDetails2 = async(offertype) =>{
        var result = await postData('userinterface/display_all_productdetail_by_offer',{offertype})
        if(result.status){
            setProductListOffer2(result.data)
        }
    }

    const fetchAllConcern = async() =>{
        var result = await getData('userinterface/display_all_concern')
        if(result.status){
            setConcernList(result.data)
        }
    }

    useEffect(function(){
        
            fetchAllcategory()
            fetchAllBrand()
            fetchAllBanner()
            fetchAllBanner2()
            fetchAllProductDetails('Winter Sale')
            fetchAllProductDetails2('Season Sale')
            fetchAllConcern()
        
    },[])



    return(<div >
        <Header/>
        {matchesMd?<div></div>:<MenuBar/>}
        
        <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
            <SliderComponent data={bannerList}/>
        </div>

        <div style={{padding:2,background:'#e7eaee', marginTop:30}}/>

        <div style={{display:'flex', justifyContent:'center', marginTop:20, marginBottom:20}}>
            <BrandComponent data={brandList} title="Brands"/>
        </div>

        <div style={{padding:2,background:'#e7eaee'}}/>

        <div style={{display:'flex', justifyContent:'center', marginTop:'20px', marginBottom:20}}>
            <CategoryComponent data= {categoryList} title="Browse by category"/>
        </div>

        <div style={{padding:2,background:'#e7eaee'}}/>

        <div style={{display:'flex', justifyContent:'center', marginTop:20,marginBottom:25}}>
            <ProductComponent title="Month End Sale" pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={productListOffer}/>
        </div>

        <div style={{padding:2,background:'#e7eaee'}}/>

        <div style={{display:'flex', justifyContent:'center', marginTop:20,marginBottom:25}}>
            <ProductComponent2 title="Trending Products" pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={productListOffer2}/>
        </div>

        <div style={{padding:2,background:'#e7eaee'}}/>
       
        <div style={{display:'flex', justifyContent:'center', marginTop:20,marginBottom:25}}>
            <SliderComponent data={bannerList2}/>
        </div>

        <div component="p" style={{padding:2,background:'#e7eaee'}}/>

        <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
            <ConcernComponent title="Shop by concern" data={concernList}/>
        </div>
        
        {matchesMd?<div></div>:<div style={{display:'flex', justifyContent:'center', marginTop:20}}>
            <FooterComponent data={categoryList}/>
        </div>}
    </div>)
}