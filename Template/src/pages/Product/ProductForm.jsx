import Page from '@layout/Page'
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import axios from 'axios';
import React from 'react';
import REACT_APP_BASE_URL from 'API/api';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const ProductForm = () => {

    const [inputData, setInputData] = React.useState({
        productName: '',
        brandName: '',
        productId: '',
        sku: '',
        hsn: '',
        unit: '',
        category: '',
        store: '',
        productType: '',
        purchase: '',
        sales: '',
        consumption: '',
        purchaseGST: '',
        salesGST: '',
        genericName: '',
        sheduledDrug: ''
    });

    const toast = useToast();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${REACT_APP_BASE_URL}product-master`, {
                productName: inputData.productName,
                brandName: inputData.brandName,
                productId: inputData.productId,
                sku: inputData.sku,
                hsn: inputData.hsn,
                unit: inputData.unit,
                category: inputData.category,
                store: inputData.store,
                productType: inputData.productType,
                purchase: inputData.purchase,
                sales: inputData.sales,
                consumption: inputData.consumption,
                purchaseGST: inputData.purchaseGST,
                salesGST: inputData.salesGST,
                genericName: inputData.genericName,
                sheduledDrug: inputData.sheduledDrug
            })
            if (data) {
                toast({
                    title: 'Added New Product',
                    description: data.msg,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "bottom"
                });
                navigate('/product');
            } else {
                toast({
                    title: 'Server Error',
                    description: data.msg,
                    status: 'failure',
                    duration: 4000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Page title="Product Master">
                <form>
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ marginBottom: '10px' }}>General Information</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="product" label="Product Name" name='productName' value={inputData.productName} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="brand" label="Brand Name" name='brandName' value={inputData.brandName} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="sku" label="SKU" name='sku' value={inputData.sku} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="hsn" label="HSN Code" name='hsn' value={inputData.hsn} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="unit" label="Unit" name='unit' value={inputData.unit} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="category" label="Category" name='category' value={inputData.category} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="store" label="Store" name='store' value={inputData.store} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="id" label="ID" name='productId' value={inputData.productId} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl>
                                    <RadioGroup row aria-label="product-type" name="productType" value={inputData.productType} onChange={handleInputChange}>
                                        <FormControlLabel value='General' control={<Radio />} label="General" />
                                        <FormControlLabel value='Medical' control={<Radio />} label="Medical" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ marginBottom: '10px' }}>Account Information</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="purchase" label="Purchase" name='purchase' value={inputData.purchase} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="sales" label="Sales" name='sales' value={inputData.sales} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="consumption" label="Consumption" name='consumption' value={inputData.consumption} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ marginBottom: '10px' }}>Purchase GST</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <FormControl>
                                    <RadioGroup row aria-label="purchase-gst" name="purchaseGST" value={inputData.purchaseGST} onChange={handleInputChange}>
                                        <FormControlLabel value="0" control={<Radio />} label="0 %" />
                                        <FormControlLabel value="5" control={<Radio />} label="5 %" />
                                        <FormControlLabel value="12" control={<Radio />} label="12 %" />
                                        <FormControlLabel value="18" control={<Radio />} label="18 %" />
                                        <FormControlLabel value="28" control={<Radio />} label="28 %" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ marginBottom: '10px' }}>Sales GST</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <FormControl>
                                    <RadioGroup row aria-label="sale-gst" name="salesGST" value={inputData.salesGST} onChange={handleInputChange}>
                                        <FormControlLabel value="0" control={<Radio />} label="0 %" />
                                        <FormControlLabel value="5" control={<Radio />} label="5 %" />
                                        <FormControlLabel value="12" control={<Radio />} label="12 %" />
                                        <FormControlLabel value="18" control={<Radio />} label="18 %" />
                                        <FormControlLabel value="28" control={<Radio />} label="28 %" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ marginBottom: '10px' }}>Clinical Information</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="g-name" label="Generic Name" name='genericName' value={inputData.genericName} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                            <TextField fullWidth id="brands" label="Brands" variant="outlined" />
                        </Grid> */}
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="s-drug" label="Scheduled Drug" name='sheduledDrug' value={inputData.sheduledDrug} variant="outlined" onChange={handleInputChange} />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="contained" style={{ marginRight: '16px', backgroundColor: "rgb(8,155,171)" }} onClick={addProduct}>Save</Button>
                        <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)" }}>Cancel</Button>
                    </div>
                </form>
            </Page>
        </>
    )
}

export default ProductForm
