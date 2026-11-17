import { useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname.toLowerCase().includes("admin");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-canvas text-obsidian">
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default Layout;
