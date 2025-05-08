import { AllRoutes } from './routes/AllRoutes';
import { Header, Footer } from './components/index';
import React, {useState } from "react";
import './App.css';
import { AuthProvide } from './context/AuthContext';
import { useLocation } from "react-router-dom";
 // import { AuthProvide } from './context/AuthContext';
// import MemoryOptimizedApp from './path/to/MemoryOptimizedApp';
export default function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/admin"|| location.pathname === "/dashboard" 
  || location.pathname === "/dashboard/requestgetpage"
  || location.pathname === "/dashboard/CustomerOrderDetail"
  || location.pathname === "/dashboard/add-new-book"
  || location.pathname.startsWith("/dashboard/edit-book")
  || location.pathname === "/dashboard/manage-books";

  // const [productsCount, setProductsCount] = useState(0);
  return (
    <div className='App'>
    <AuthProvide>
    {/* <Header /> */}
    {!hideHeaderFooter && <Header />}
     <main>
          <AllRoutes />   
          {/* <MemoryOptimizedApp />  */}
     </main>
     {!hideHeaderFooter && <Footer />}

      {/* <Footer /> */}
    
    </AuthProvide>
    
     
    </div>
  );
}
