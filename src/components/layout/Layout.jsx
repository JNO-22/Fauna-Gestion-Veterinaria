import { Outlet } from "react-router";
import Alerta from "@components/ui/alert/Alert";
import Loading from "@components/ui/loading/Loading";
import useClearAlertOnPathChange from "@hooks/useClearUiPathChange";
import NavBar from "../layout/Navbar";

const Layout = () => {
  useClearAlertOnPathChange();
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <NavBar />
      <main>
        <Alerta />
        <Loading />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
