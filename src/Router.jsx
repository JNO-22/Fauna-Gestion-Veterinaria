import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@components/layout/Layout";
import ClientList from "./pages/ClientList";
import Cliente from "./pages/ClientDetail";
import Home from "./pages/LandingPage";
import Turnos from "./pages/AppointmentList";
import MascotList from "./pages/MascotList";
import MascotDetail from "./pages/MascotDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clientes" element={<ClientList />} />
          <Route path="turnos" element={<Turnos />} />
          <Route path="clientes/:id" element={<Cliente />} />
          <Route path="mascotas" element={<MascotList />} />
          <Route path="mascotas/:id" element={<MascotDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
