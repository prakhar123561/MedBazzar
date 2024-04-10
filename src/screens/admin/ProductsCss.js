import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles({
    root: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'kanit',
        backgroundColor: '#32aeb1'
    },
    box: {
        height: 450,
        width: 600,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10
    },
    boxTable: {
        background: '#fff',
        width: 1000,
        height: 'auto',
        borderRadius: 10,
        padding: 10,
    }
})