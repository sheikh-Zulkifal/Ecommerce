import React from 'react'
import Helmet from "react-helmet"

const MetaData = ({title}) => {
  // alert(title)
  return (
    
    <Helmet>
        <title>{title}</title>
      
    </Helmet>
  )
}

export default MetaData
