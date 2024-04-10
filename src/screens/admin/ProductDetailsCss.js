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
        height: 650,
        width: 800,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    boxTable: {
        height: 'auto',
        width: 1000,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    }
})