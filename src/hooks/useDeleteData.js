import { useDispatch } from "react-redux";
import { deleteClient, setSelectedClient } from "../store/clientReducer";
import { deleteTurno, setSelectedTurno } from "../store/turnoReducer";
import { deleteMascota, setSelectedMascota } from "../store/mascotReducer";
import { setLoading, setAlert } from "@store/uiStateSlice";

const useDeleteData = (subject = null, id = null) => {
  const dispatch = useDispatch();
  const abortController = new AbortController();

  if (!subject || id === null) {
    abortController.abort();
  }

  const deleteData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${subject}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            charset: "UTF-8",
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.error || `Unexpected error: ${response.status}`;
        throw new Error(errorMessage);
      }

      if (subject === "turno") {
        dispatch(deleteTurno(id));
        dispatch(setSelectedTurno(null));
      } else if (subject === "cliente") {
        dispatch(deleteClient(id));
        dispatch(setSelectedClient(null));
      } else if (subject === "mascota") {
        dispatch(deleteMascota(id));
        dispatch(setSelectedMascota(null));
      }

      dispatch(setAlert({ message: "Deleted successfully", type: "success" }));
    } catch (error) {
      dispatch(setAlert({ message: error.message, type: "error" }));
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { deleteData };
};

export default useDeleteData;
