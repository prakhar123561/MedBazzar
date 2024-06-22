import { Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/fetchNodeServices";
import { MenuItem } from "@mui/material";
import { Paper, InputBase, IconButton } from "@mui/material";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

export default function FilterList(props) {

  var navigate = useNavigate()
  const [subCategoryList, setSubCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [productData, setProductData] = useState([])


  const fetchAllSubCategory = async () => {
    var result = await postData('userinterface/fetch_all_subcategory_by_categoryid', { categoryid: props.categoryid })
    if (result.status) {
      setSubCategoryList(result.data)
    }
  }

  useEffect(function () {
    fetchAllSubCategory()
  }, [])

  const fetchAllBrand = async () => {
    var result = await getData('userinterface/show_all_brand')
    if (result.status) {
      setBrandList(result.data)
    }
  }

  useEffect(function () {
    fetchAllBrand()
  }, [])



  const showAllSubCategory = () => {
    return subCategoryList?.map((item) => {
      return (
        <MenuItem style={{ background: "#F5F5F5", fontSize: 12, marginRight: 12 }} onClick={() => navigate('/filter/null', { state: { subcategoryid: item.subcategoryid, categoryid: props.categoryid}, replace:true })}>{item.subcategoryname}</MenuItem>
      )
    })
  }

  const showAllbrand = () => {
    return brandList?.map((item) => {
      return (<div style={{ background: "#F5F5F5", width: '90%', boxShadow: '0 0 0 #F5F5F5', marginLeft: 20 }}>

        <FormGroup style={{}}>
          <FormControlLabel control={<Checkbox />} checked sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} label={item.brandname} >

          </FormControlLabel>
        </FormGroup>

      </div>
      )
    })

  }

  const searchBarComponent = () => {
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', margin: 1, display: 'flex', border: '1px solid #A5AFBF', fontWeight: 'bold', borderRadius: 50, height: 25, alignItems: 'center', width: '80%', background: '#ffff', opacity: 0.5 }}
      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search SubCategory.."
          inputProps={{ 'aria-label': 'search google maps' }}
          style={{ color: '#0D0F11' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon style={{ color: 'black' }} />
        </IconButton>

      </Paper>)
  }

  const searchBarComponent2 = () => {
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', margin: 1, display: 'flex', border: '1px solid #A5AFBF', fontWeight: 'bold', borderRadius: 50, height: 25, alignItems: 'center', width: '80%', background: '#ffff', opacity: 0.5 }}
      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Brand.."
          inputProps={{ 'aria-label': 'search google maps' }}
          style={{ color: '#0D0F11' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon style={{ color: 'black' }} />
        </IconButton>

      </Paper>)
  }


  return (
    <div style={{width: '120%', marginLeft: 20, background: '#f5f5f5', boxShadow: '0 0 5px 3px #EBEFF2', borderRadius: 10, marginBottom: 20 }}>
      <p style={{ fontSize: 18, marginLeft: 25, color: 'black', fontWeight: 600 }}>Filters</p>
      <Divider />
      <div style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 15, color: 'grey' }}>Category</div>
      {searchBarComponent()}
      <p style={{ color: 'green', marginLeft: 15 }}>{props.categoryname}</p>
      <div style={{ marginLeft: 30 }}>{showAllSubCategory()}</div>
      <Divider />
      <div style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 15, color: 'grey' }}>Brands</div>

      {searchBarComponent2()}
      {showAllbrand()}
    </div>)
}