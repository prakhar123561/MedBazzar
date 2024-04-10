import { Grid ,AppBar, Paper, Toolbar, Typography, Box, Divider } from "@mui/material";
import {List, ListItem, ListItemIcon, ListItemText, ListItemButton} from "@mui/material";
import { useStyles } from "./AdminDashboardCss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import DraftsIcon from '@mui/icons-material/Drafts';
import Categories from "./Categories";
import DisplayAllCategory from "./DisplayAllCategory";
import Brands from "./Brands";
import DisplayAllBrand from "./DisplayAllBrand";
import SubCategories from "./SubCategories";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Products from "./Products";
import DisplayAllProduct from "./DisplayAllProduct";
import ProductDetails from "./ProductDetails";
import DisplayAllProductDetail from "./DisplayAllProductDetail";
import Banners from "./Banners"
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../services/fetchNodeServices";
import DisplayAllBanner from "./DisplayAllBanner";
import Concern from "./Concern";

export default function AdminDashboard(){
    var classes = useStyles()
    const navigate = useNavigate()

    const adminData = JSON.parse(localStorage.getItem("ADMIN"))

    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" style={{ background: '#2E3B55' }}>
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    MedBazzar
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container spacing={2} >
            <Grid item xs={2.2}>
                <Paper>
                    <div className={classes.leftBarStyle}>
                        <img src={`${serverUrl}/images/${adminData.picture}`} style={{background: 'linear-gradient(to right bottom, #36EAEF, #6B0AC9)',width:60,height:60,borderRadius:50,padding:10}}/>
                        <div className={classes.nameStyle}>{adminData.adminname}</div>
                        <div className={classes.emailStyle}>{adminData.emailid}</div>
                        <div className={classes.phoneStyle}>{adminData.mobileno}</div>
                    </div>
                    <div>
                    <List >
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                            <ListItemText primary="Category List" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}>
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                            <ListItemText primary="SubCategory List" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrand')}>
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                            <ListItemText primary="Brand List" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/admindashboard/displayallproduct')}>
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                            <ListItemText primary="Product List" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetail')}>
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                            <ListItemText primary="Product Details List" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/admindashboard/displayallbanner')}>
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                            <ListItemText primary="Banners" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/admindashboard/concern')}>
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                            <ListItemText primary="Concern" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                            <ListItemText primary="Sales Report" />
                            </ListItemButton>
                        </ListItem>
                        <Divider/>

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/adminlogin')}>
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                            <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    </div>
                </Paper> 
            </Grid>
            <Grid item xs={9.8}>
                <Routes>
                    <Route element={<Categories/>} path={"/category"} />
                    <Route element={<DisplayAllCategory/>} path={"/displayallcategory"} />
                    <Route element={<Brands/>} path={"/brand"} />
                    <Route element={<DisplayAllBrand/>} path={"/displayallbrand"} />
                    <Route element={<SubCategories/>} path={"/subcategory"} />
                    <Route element={<DisplayAllSubCategory/>} path={"/displayallsubcategory"} />
                    <Route element={<Products/>} path={"/product"}/>
                    <Route element={<DisplayAllProduct/>} path={"/displayallproduct"}/>
                    <Route element={<ProductDetails/>} path={"/productdetail"}/>
                    <Route element={<DisplayAllProductDetail/>} path={"/displayallproductdetail"}/>
                    <Route element={<Banners/>} path={"/banner"}/>
                    <Route element={<DisplayAllBanner/>} path={"/displayallbanner"}/>
                    <Route element={<Concern/>} path={"/concern"}/>
                </Routes>
            </Grid>
        </Grid> 
        </Box>
    )
}