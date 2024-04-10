import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    root: {
        backgroundColor: '#32aeb1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Kanit',
        height: '100vh',
        width: '100%'
    },
    box: {
        backgroundColor: '#fff',
        height: 350,
        width: 600,
        borderRadius: 10,
        padding: 10
    },
    boxTable: {
        backgroundColor: '#fff',
        height: 'auto',
        width: 800,
        borderRadius: 10,
        padding: 10
    }
})