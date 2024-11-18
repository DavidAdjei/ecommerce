import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination
} from '@mui/material';

const getStatusStyles = (status) => {
  let s = status.toLowerCase();
  switch (s) {
    case 'delivered':
      return { color: 'green', border: '1px solid green' };
    case 'pending':
      return { color: 'orange', border: '1px solid orange' };
    case 'processing':
      return { color: 'blue', border: '1px solid blue' };
    case 'shipped':
      return { color: 'purple', border: '1px solid purple' };
    default:
      return { color: 'black', border: '1px solid gray' };
  }
};

const getPaymentStyles = (payment) => {
  return payment.toLowerCase() === 'paid'
    ? { color: 'green', border: '1px solid green' }
    : { color: 'red', border: '1px solid red' };
};

const OrdersContent = ({ orders }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ padding: 2 }}>
      <TablePagination
        component="div"
        count={orders.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Order Items</TableCell>
              <TableCell>Order Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>GH&#8373;{order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Box sx={{
                    padding: 1,
                    borderRadius: 1,
                    ...getPaymentStyles(order.payment),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '8rem'
                  }}>
                    {order.payment}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    {order.orderItems.map((item) => (
                      <Typography key={item._id} variant="body2" style={{ textTransform: 'capitalize' }}>
                        {item.title}
                      </Typography>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{
                    padding: 1,
                    borderRadius: 1,
                    ...getStatusStyles(order.status),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '8rem'
                  }}>
                    {order.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrdersContent.propTypes = {
  orders: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.auth.orders,
});

export default connect(mapStateToProps, {})(OrdersContent);
