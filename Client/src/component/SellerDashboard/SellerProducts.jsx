import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
    Table, 
    TableBody, 
    TableCell, 
    Button, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TablePagination, 
    Paper, 
    Avatar, 
    Box 
} from '@mui/material';
import EditModal from './EditModal';

const SellerProducts = ({ products }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedProducts = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (products.length === 0) {
        return (
            <div>No products found</div>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>In Stock</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProducts.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    <Avatar
                                        src={product.imgs && product.imgs[0] ? product.imgs[0] : ''}
                                        alt={product.title}
                                        variant="square"
                                        sx={{ width: 60, height: 60 }}
                                    />
                                </TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.inStock}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => setModalOpen(true)}>
                                        Edit Product
                                    </Button>
                                    <EditModal 
                                        product={product}
                                        open={modalOpen}
                                        onClose={() => setModalOpen(false)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

SellerProducts.propTypes = {
    products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    products: state.sellerProduct.products,
});

export default connect(mapStateToProps)(SellerProducts);
