import Page from '@layout/Page';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import ProcurementData from './ProcurementData';
import PurchaseRequisition from './PurchaseRequisition';
import PurchaseOrder from './PurchaseOrder';
import PurchaseScreen from './PurchaseScreen';
import DmPurchase from './DmPurchase';

const Procurement = () => {
    const [title, setTitle] = useState("Procurement Data");
    const [activeButton, setActiveButton] = useState("Procurement Data");

    const handleButtonClick = (buttonTitle) => {
        setTitle(buttonTitle);
        setActiveButton(buttonTitle);
    }

    const buttonStyles = (buttonTitle) => ({
        backgroundColor: activeButton === buttonTitle ? '#004d4d' : 'rgb(8, 155, 171)',
        color: 'white',
    });

    return (
        <>
            <Page title={title}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <Button variant="contained" onClick={() => handleButtonClick("Procurement Data")} style={buttonStyles("Procurement Data")}>Procurement Data</Button>
                    <Button variant="contained" onClick={() => handleButtonClick("Purchase Requisition")} style={buttonStyles("Purchase Requisition")}>Purchase Req.</Button>
                    <Button variant="contained" onClick={() => handleButtonClick("Purchase Order")} style={buttonStyles("Purchase Order")}>Purchase Order</Button>
                    <Button variant="contained" onClick={() => handleButtonClick("DM Purchase")} style={buttonStyles("DM Purchase")}>DM Purchase</Button>
                    <Button variant="contained" onClick={() => handleButtonClick("Purchase Screen")} style={buttonStyles("Purchase Screen")}>Purchase Screen</Button>
                    <Button variant="contained" onClick={() => handleButtonClick("GRN")} style={buttonStyles("GRN")}>GRN</Button>
                    <Button variant="contained" onClick={() => handleButtonClick("Purchase Return")} style={buttonStyles("Purchase Return")}>Purchase Return</Button>
                </div>
                <hr />
                {activeButton === "Procurement Data" && <ProcurementData />}
                {activeButton === "Purchase Requisition" && <PurchaseRequisition />}
                {activeButton === "Purchase Order" && <PurchaseOrder />}
                {activeButton === "Purchase Screen" && <PurchaseScreen />}
                {activeButton === "DM Purchase" && <DmPurchase />}
            </Page>
        </>
    )
}

export default Procurement;
