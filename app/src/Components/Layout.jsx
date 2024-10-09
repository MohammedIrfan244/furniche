import { useLocation } from 'react-router-dom';
import Footer from './Footer'

// eslint-disable-next-line react/prop-types
function Layout({children}) {
  const location = useLocation();
  
  const isAdminPage = location.pathname.startsWith("/adminpanel");
  return (
    <>
    {children}
    {!isAdminPage && <Footer />}
  </>
  )
}

export default Layout