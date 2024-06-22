import { Grid } from "@mui/material";
import { LoginDetails } from "../../components/userinterface/LoginDetails";
import LoginImage from "../../components/userinterface/LoginImage";
import {useTheme} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginOTP from "../../components/userinterface/LoginOTP";
import GetOTP from "../../components/userinterface/GetOTP";


export default function LoginScreen(){
    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

    return(
        <Grid container spacing={1} style={{padding:0, marginLeft: matchesMd? 80: 0, marginTop: matchesMd? 20 :0, width: matchesMd ? '100%':'98%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            
            <Grid item xs={12} style={{display:'flex', flexDirection:'row', alignItems:'flex-end' }}>
            {matchesMd?<div></div>:<Grid item xs={6} style={{marginBottom:80}}>
                {<LoginImage/>}
            </Grid>}
            <Grid item xs={matchesMd?12:6}>
              {<LoginOTP/>}
            </Grid>
            </Grid>
            
        </Grid>
    )
}