import React from 'react'

const Provider = ({children} : {children : React.ReactNode}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default Provider