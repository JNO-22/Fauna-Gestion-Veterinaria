import useFetchData from "@hooks/useFetchData";
import { formatDate } from "@utils/DateFormatter";
import TurnosModal from "@components/modal/TurnosModal";
import { setSelectedTurno } from "@store/turnoReducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const Turnos = () => {
  const { data, loading, error } = useFetchData("turno");
  const dispatch = useDispatch();
  const turnos = useSelector((state) => state.turno.items);
  const [mascota, setMascota] = useState("");
  const [cliente, setCliente] = useState("");

  // cargar el listado de clientes y mascotas sino estan cargados
  useFetchData("cliente");
  useFetchData("mascota");

  const mascotasList = useSelector((state) => state.mascota.items);
  const clientsList = useSelector((state) => state.cliente.items);

  function handleClick(turno) {
    dispatch(setSelectedTurno(turno));
    document.getElementById("my_modal").showModal();
  }

  const filteredMascotas = mascotasList?.filter((mascota) =>
    mascota.cliente?.nombre.includes(cliente)
  );

  const filteredTurnos = turnos?.filter((turno) =>
    turno.mascota?.nombre.includes(mascota)
  );

  return (
    <div className="flex flex-col gap-4 pt-20">
      <h1 className="text-4xl font-bold">Gestiona tus turnos</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <select
          className="select w-full max-w-xs"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        >
          <option value="">Cliente</option>
          {clientsList?.map((cliente) => (
            <option key={cliente._id} value={cliente?.nombre}>
              {cliente.nombre}
            </option>
          ))}
        </select>

        <select
          className="select w-full max-w-xs"
          value={mascota}
          onChange={(e) => setMascota(e.target.value)}
        >
          <option value="">Mascota</option>
          {filteredMascotas?.map((mascota) => (
            <option key={mascota._id} value={mascota.nombre}>
              {mascota.nombre}
            </option>
          ))}
        </select>
      </div>
      <table className="table ">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Mascota</th>
            <th className="hidden md:table-cell">Especie</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredTurnos?.map((turno, index) => (
            <tr
              onClick={() => handleClick(turno)}
              className="hover:bg-green-100"
              key={index}
            >
              <td>{formatDate(turno.fecha)}</td>
              <td>{turno.mascota?.cliente.nombre}</td>
              <td>{turno.mascota?.nombre}</td>
              <td className="hidden md:table-cell">{turno.mascota?.especie}</td>
              <td>{turno.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="toast p-8 " onClick={() => handleClick({})}>
        <button className="btn btn-info shadow">Añadir Turno</button>
      </div>
      <TurnosModal />
    </div>
  );
};

export default Turnos;
