import useDeleteData from "@hooks/useDeleteData";
import useFetchData from "@hooks/useFetchData";
import { data, useNavigate } from "react-router";

const DeleteModal = ({ type, id }) => {
  const closeModal = () => document.getElementById("delete_modal").close();
  const navigate = useNavigate();
  const { fetchData } = useFetchData("mascota");
  const { fetchData: fetchData2 } = useFetchData("cliente");
  const { fetchData: fetchDat3 } = useFetchData("turno");

  const { deleteData } = useDeleteData(type, id);

  const handleDelete = () => {
    deleteData(data)
      .then(() => fetchData())
      .then(() => fetchData2())
      .then(() => fetchDat3())
      .then(() => navigate(`/${type}s`));
  };

  return (
    <dialog id="delete_modal" className="modal modal-middle">
      <form method="dialog" className="modal-box w-3/4">
        <h3 className="font-bold text-lg">
          Estas seguro de eliminar{" "}
          {type == "mascota" ? "esta mascota" : "este cliente"} ?
        </h3>
        <p className="py-4">
          {type == "mascota"
            ? " Eliminar la mascota tambien eliminara sus turnos asociados"
            : " Eliminar el cliente tambien eliminara sus mascotas asociadas"}
        </p>
        <div className="modal-action">
          <button onClick={closeModal} className="btn">
            Cancel
          </button>
          <button onClick={() => handleDelete()} className="btn btn-error">
            Delete
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteModal;
