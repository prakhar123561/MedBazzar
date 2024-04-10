import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    leftBarStyle: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flexDirection: 'column'
    },
    nameStyle: {
        fontFamily:'Kanit',
        fontSize:14,
        fontWeight:'bold',
        marginTop:5,
        marginBottom:2,
        color:'black'
    },
    emailStyle: {
        fontFamily:'Kanit',
        fontSize:14,
        fontWeight:'bold',
        marginTop:5,
        marginBottom:2,
        color:'black'
    },
    phoneStyle: {
        fontFamily:'Kanit',
        fontSize:14,
        fontWeight:'bold',
        marginTop:5,
        marginBottom:2,
        color:'black'
    },
    menuStyle: {
        marginInline: '2px'
    },
    menuItemStyle:{
        fontFamily:'Kanit',
        fontSize:8,
        fontWeight:'bold'
       }
})