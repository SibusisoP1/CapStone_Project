import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AirBnb_Nav from "./components/AirBnb_Nav";
import Footer from "./components/footer";
import Login from "./Pages/Login";
import Locations from "./Pages/Locations";
import Location_detail from "./Pages/Location_detail";
import View_Listing from "./Pages/View_Listing";
import Admin_add_Hotel from "./Pages/Admin_add_Hotel";
import Reservetion from "./Pages/Reservetion";

// Layout components
const MainLayout = ({ children }) => (
  <>
    <AirBnb_Nav />
    {children}
    <Footer />
  </>
);

const AdminLayout = ({ children }) => (
  <>
    {children}
  </>
);

const SimpleLayout = ({ children }) => (
  <>
    {children}
  </>
);

const Router = () => {
  return (
    <Routes>
      {/* Main routes with navigation */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/locations" element={<MainLayout><Locations /></MainLayout>} />
      <Route path="/location/:id" element={<MainLayout><Location_detail /></MainLayout>} />
      
      {/* Authentication routes */}
      <Route path="/login" element={<SimpleLayout><Login /></SimpleLayout>} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout><Admin_add_Hotel /></AdminLayout>} />
      <Route path="/admin/view-listing" element={<AdminLayout><Admin_add_Hotel /></AdminLayout>} />
      <Route path="/admin/create-listing" element={<AdminLayout><View_Listing /></AdminLayout>} />
      <Route path="/admin/reservations" element={<AdminLayout><Reservetion /></AdminLayout>} />
      
      {/* Fallback route */}
      <Route path="*" element={<MainLayout><Home /></MainLayout>} />
    </Routes>
  );
};

export default Router;