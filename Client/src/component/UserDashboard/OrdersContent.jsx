import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

const OrdersContent = (props) => {
  return (
    <div>OrderContent</div>
  )
}

OrdersContent.propTypes = {
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps, {})(OrdersContent)