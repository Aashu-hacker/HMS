import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';
import REACT_APP_BASE_URL from 'API/api';
import axios from 'axios';

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
        marginTop: '12px',
    },
    search: {
        border: '1px solid rgb(8, 155, 171)',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '18px'
    },
}));

function ProductMaster() {
    const classes = useStyles();
    const [productData, setProductDate] = React.useState([]);
    const navigate = useNavigate();

    const getProducts = async () => {
        const {data} = await axios.get(`${REACT_APP_BASE_URL}product-master`)
        if (data && data.allProduct) {
            setProductDate(data.allProduct);
        }
    }
    React.useEffect(() => {
        getProducts()
    },[])
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '12px 0' }}>
                <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", }} onClick={() => navigate("/product-form")}>Add</Button>
                <input type='text' className={classes.search} placeHolder='Search Product' />
            </div>
            <Paper>
                <TableContainer>
                    <Table aria-label="Department Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>SN</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Product ID</TableCell>
                                <TableCell>SKU</TableCell>
                                <TableCell>HSN no.</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Purchase GST</TableCell>
                                <TableCell>Sales GST</TableCell>
                                <TableCell>Packing</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {productData && productData.map((product, index) => (
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.productId}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.hsn}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.purchaseGST}%</TableCell>
                                <TableCell>{product.salesGST}%</TableCell>
                                <TableCell>NA</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}

export default ProductMaster;
