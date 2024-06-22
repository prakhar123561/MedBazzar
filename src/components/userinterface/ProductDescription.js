import { Grid, IconButton, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ProductDescription(props){
    var theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))

    var description = props?.item

    return(
        <div style={{marginLeft:20, marginTop:20}}>
            <div style={{ fontWeight:600, marginBottom:20}}>{props?.title}</div>
            <div>{description?.pd_description}</div>
            <div style={{display:'flex', alignItems:'center',justifyContent:'center', background:'rgb(247, 248, 249)', width:matchesMd?'100%':'23%', marginTop:20, gap:7}}>
                <IconButton><CheckCircleIcon style={{color:"rgb(45, 104, 66)", fontSize:30}}/></IconButton><Typography style={{ fontSize: 14, fontWeight:500, color:"rgb(45, 104, 66)" }} component='p'>100% Authentic</Typography>
                <IconButton><ChangeCircleIcon style={{color:"rgb(45, 104, 66)", fontSize:30}}/></IconButton><Typography style={{ fontSize: 14, fontWeight:500, color:"rgb(45, 104, 66)" }} component='p'>Easy Return</Typography>

            </div>
        </div>
    )
}