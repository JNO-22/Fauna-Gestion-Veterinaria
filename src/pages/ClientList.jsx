import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedClient } from "@store/clientReducer";
import useFetchData from "@hooks/useFetchData";
import Pagination from "@components/ui/pagination/Pagination";
import CardList from "@components/card/CardList";
import { Link } from "react-router";
const Clientes = () => {
  useFetchData("cliente", null, false);
  const [offset, setOffset] = useState(0);
  const pageSize = 4;
  const clientes = useSelector((state) => state.cliente.items);
  const total = clientes.length;
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-base-100 flex flex-col items-center px-8 py-20">
      <h1 className="text-2xl md:text-4xl text-center font-bold">
        Gestiona a tus clientes
      </h1>
      <Pagination
        totalCount={total}
        pageSize={pageSize}
        offset={offset}
        setOffset={setOffset}
      />

      <div className="grid grid-cols-1 px-8 py-4 lg:grid-cols-2 gap-8 max-md:overflow-y-auto ">
        {clientes.slice(offset, offset + pageSize).map((client) => (
          <CardList key={client._id} data={client} />
        ))}
      </div>

      <div className="toast p-8">
        <Link
          to="/clientes/nuevo"
          onClick={dispatch(setSelectedClient({}))}
          className="btn btn-primary shadow"
        >
          Añadir cliente{" "}
        </Link>
      </div>
    </div>
  );
};

export default Clientes;
