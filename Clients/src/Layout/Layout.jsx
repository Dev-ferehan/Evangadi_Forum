import React from 'react'
import Header from '../Pages/Header/Header'
import Footer from '../Pages/Footer/Footer'
function Layout({children}) {
  return (
    <div>
          <Header />
      {children}
      <Footer/>
   
    </div>
  )
}

export default Layout
