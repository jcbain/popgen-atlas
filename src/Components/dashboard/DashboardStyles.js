import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

export const dashboardStyle = {
    root: {
        flexGrow: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#f1f0f5',
    },
    addButton: {
        // margin: '1em',
        // color: "white",
        // background: "#4b23b0", 
    },
    appBar: {
        background : '#edebf2',
        color: '#4900ff',
        boxShadow: "none",
    },
    parameters: {
        height: '100%',
        background: 'white',
        boxShadow: '0px 1px 10px 1px rgb(143, 143, 143)',
    },
}

export const textStyle = createMuiTheme({
    typography: {
        fontFamily: [
            '"Baloo Tamma 2"',
            'cursive',
        ].join(','),
    
        h1:{
            fontSize: '2.3rem',
            margin: '1.7em',
        },

        h2: {
            fontSize: '1.3rem',
            margin: '.5em',
        },

        body1: {
            fontSize: '1rem',
            margin: '1.5em',
        },
    },
});

export default { textStyle, dashboardStyle }