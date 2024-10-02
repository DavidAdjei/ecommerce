import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

const SettingsContent = (props) => {
  return (
    <div>SettingsContent</div>
  )
}

SettingsContent.propTypes = {
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {})(SettingsContent)