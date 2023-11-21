import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Page from '@layout/Page';
import PartyMaster from './PartyMaster';
import ProductMaster from './ProductMaster';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    btn: {
        marginRight: '10px'
    },
    container: {
        marginBottom: '20px'
    }
}));

function Product() {
    const classes = useStyles();
    const [title, setTitle] = React.useState("Party Master");
    const [activeButton, setActiveButton] = React.useState("Party Master");

    const handleButtonClick = (buttonTitle) => {
        setTitle(buttonTitle);
        setActiveButton(buttonTitle);
    }

    const buttonStyles = (buttonTitle) => ({
        backgroundColor: activeButton === buttonTitle ? '#004d4d' : 'rgb(8, 155, 171)',
        color: 'white',
    });

    return (
        <Page title={title}>
            <div className={classes.container}>
                <Button variant="contained" className={classes.btn} onClick={() => handleButtonClick("Party Master")} style={buttonStyles("Party Master")}>Party Master</Button>
                <Button variant="contained" className={classes.btn} onClick={() => handleButtonClick("Product Master")} style={buttonStyles("Product Master")}>Product Master</Button>
            </div>
            <hr />
            {activeButton === "Party Master" && <PartyMaster />}
            {activeButton === "Product Master" && <ProductMaster />}
        </Page>
    );
}

export default Product


