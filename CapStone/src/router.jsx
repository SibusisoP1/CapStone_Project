import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

// Any logged-in user may access; otherwise send to login.
const RequireAuth = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo ? children : <Navigate to="/login" replace />;
};

// Only hosts may access; guests go to the hotels page, anon to login.
const RequireHost = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  if (!userInfo) return <Navigate to="/login" replace />;
  if (userInfo.user?.role !== "host")
    return <Navigate to="/locations" replace />;
  return children;
};

const Router = () => {
  return (
    <Routes>
      {/* Main routes with navigation */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/locations" element={<MainLayout><Locations /></MainLayout>} />
      <Route path="/location/:id" element={<MainLayout><Location_detail /></MainLayout>} />
      
      {/* Authentication routes */}
      <Route path="/login" element={<SimpleLayout><Login /></SimpleLayout>} />
      
      {/* Host-only admin routes */}
      <Route path="/admin" element={<RequireHost><AdminLayout><Admin_add_Hotel /></AdminLayout></RequireHost>} />
      <Route path="/admin/view-listing" element={<RequireHost><AdminLayout><Admin_add_Hotel /></AdminLayout></RequireHost>} />
      <Route path="/admin/create-listing" element={<RequireHost><AdminLayout><View_Listing /></AdminLayout></RequireHost>} />

      {/* Reservations: any logged-in user (guest sees own, host sees all) */}
      <Route path="/admin/reservations" element={<RequireAuth><AdminLayout><Reservetion /></AdminLayout></RequireAuth>} />
      
      {/* Fallback route */}
      <Route path="*" element={<MainLayout><Home /></MainLayout>} />
    </Routes>
  );
};

export default Router;