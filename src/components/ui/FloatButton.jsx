import { MdDelete, MdDeleteForever } from "react-icons/md";
import DeleteModal from "@components/modal/DeleteModal";

const FloatButton = ({ id, type }) => {
  return (
    <>
      <div
        className="toast  py-4 p-2 cursor-pointer"
        onClick={() => {
          document.getElementById("delete_modal").showModal();
        }}
      >
        <div className="alert alert-error rounded-box group p-4">
          <p className="font-semibold group-hover:text-white pl-10">
            Eliminar {type}
          </p>
          <MdDelete className="w-8 h-8 absolute group-hover:opacity-0 group-hover:w-0 transition duration-300" />
          <MdDeleteForever className="w-0 h-8 absolute opacity-0 group-hover:opacity-100 group-hover:w-8  transform group-hover:translate-x-2 group-hover:rotate-45    transition duration-500" />
        </div>
      </div>
      <DeleteModal type={type} id={id} />
    </>
  );
};

export default FloatButton;
