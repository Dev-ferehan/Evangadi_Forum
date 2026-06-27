import React from 'react'
import Header from '../Pages/Header/Header'
import Footer from '../Pages/Footer/Footer'
function Layout({children}) {
  return (
    < >
          <Header />
      {children}
      <  Footer/>
   
    </>
  )
}

export default Layout
