import { FiEdit } from "react-icons/fi";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { setSelectedClient } from "@store/clientReducer";

const CardList = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="card p-4 bg-base-200 group hover:bg-green-100 h-fit md:w-96 shadow-lg gap-4">
      <div className="card-actions flex flex-col md:pl-8 items-start">
        <h2 className="card-title">{data.nombre}</h2>
        <p className="text-sm text-gray-500"> {data.email}</p>
      </div>
      <div className="card-actions flex flex-row md:px-8 justify-between">
        <p> Tel: {data.telefono}</p>
        <Link
          to={`/clientes/${data._id}`}
          onClick={() => dispatch(setSelectedClient(data))}
          className="flex items-center gap-2 transition duration-300 text-green-300 hover:text-base-100 hover:bg-green-300  px-2 py-1 rounded-md"
        >
          Editar <FiEdit className="w-4 h-4 " />
        </Link>
      </div>
    </div>
  );
};

export default CardList;
