import React from 'react'
import BaseHeader from '../shared/BaseHeader'

const AddressEditHeader = () => {
  return (
    <BaseHeader
      titleId={'pages.addressEdit'}
      backButton={{ id: 'pages.addresses', path: '/addresses' }}
      shouldAlwaysShowBackButton
    />
  )
}

export default AddressEditHeader
