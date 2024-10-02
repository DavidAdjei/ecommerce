import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

const OrdersContent = ({orders}) => {
  return (
    <div>
      {
        orders.map((order, index) => (
          <div key={index}>
            <p>{order.orderDate}</p>
            <p>{order.totalPrice}</p>
            <p>{order.payment}</p>
            <div>
              {order.orderItems.map((item, i) => (
                <p style={{textTransform: "capitalize"}}>{item.title}</p>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  )
}

OrdersContent.propTypes = {
}

const mapStateToProps = (state) => ({
  orders: state.auth.orders
})


export default connect(mapStateToProps, {})(OrdersContent)