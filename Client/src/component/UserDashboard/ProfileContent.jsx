import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

const ProfileContent = (props) => {
  return (
    <div>Your profile details go here.</div>
  )
}

ProfileContent.propTypes = {
  
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps, {})(ProfileContent)