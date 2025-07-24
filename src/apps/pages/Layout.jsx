import Navbar from '../components/Navbar';
import SidebarHomePage from "../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarHomePage />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
