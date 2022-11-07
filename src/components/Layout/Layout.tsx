import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar/NavigationBar";

const Layout = () => (
  <div className="bg-gray-200 min-w-screen min-h-screen">
    <NavigationBar />
    <div className="p-6">
      <Outlet />
    </div>
  </div>
);

export default Layout;
