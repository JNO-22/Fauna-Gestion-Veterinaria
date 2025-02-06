import { useState } from "react";
import { useSelector } from "react-redux";
import useFetchData from "@hooks/useFetchData";
import Pagination from "@components/ui/pagination/Pagination";
import { useDispatch } from "react-redux";
import { setSelectedMascota } from "@store/mascotReducer";
import { Link, useNavigate } from "react-router";

const MascotList = () => {
  const [offset, setOffset] = useState(0);
  const mascotas = useSelector((state) => state.mascota.items);
  const dispatch = useDispatch();
  const pageSize = 6;
  const total = mascotas.length;
  const navigate = useNavigate();

  useFetchData("mascota");

  function handleClick(mascota) {
    dispatch(setSelectedMascota(mascota));
    navigate(`/mascotas/${mascota._id}`);
  }

  return (
    <div className="w-full bg-base-100 flex flex-col items-center px-8 py-20">
      <h1 className="text-2xl md:text-4xl text-center font-bold">Mascotas</h1>

      <Pagination
        totalCount={total}
        pageSize={pageSize}
        offset={offset}
        setOffset={setOffset}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.slice(offset, offset + pageSize).map((mascota) => (
            <tr
              className="cursor-pointer transition duration-150 even:bg-base-200 hover:bg-brand-lightblue odd:hover:bg-brand-lightpink hover:text-white"
              key={mascota._id}
              onClick={() => handleClick(mascota)}
            >
              <td>{mascota.cliente?.nombre}</td>
              <td>{mascota.nombre}</td>
              <td>{mascota.raza}</td>
              <td>{mascota.edad}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="toast p-8">
        <Link
          to="/mascotas/nuevo"
          onClick={dispatch(setSelectedMascota({}))}
          className="btn btn-primary shadow"
        >
          Añadir mascota{" "}
        </Link>
      </div>
    </div>
  );
};

export default MascotList;
