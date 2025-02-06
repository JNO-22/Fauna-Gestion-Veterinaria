import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setAlert } from "../store/uiStateSlice";
import { updateTurno, addTurno, setSelectedTurno } from "../store/turnoReducer";
import {
  updateClient,
  addClient,
  setSelectedClient,
} from "../store/clientReducer";
import {
  addMascota,
  setSelectedMascota,
  updateMascota,
} from "../store/mascotReducer";

const usePostData = (subject, data, id = null) => {
  const dispatch = useDispatch();
  const [postDataResponse, setPostDataResponse] = useState(null);
  const [postDataError, setPostDataError] = useState(null);
  const endpoint = `${import.meta.env.VITE_API_URL}/${subject}`;
  const url = id ? `${endpoint}/${id}` : endpoint;

  const postData = async () => {
    dispatch(setLoading(true));

    try {
      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          charset: "UTF-8",
        },
        body: JSON.stringify(data),
      });

      // Manejo de errores en la petición
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.error || `Unexpected error: ${response.status}`;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      setPostDataResponse(responseData);

      if (subject === "turno") {
        dispatch(id ? updateTurno(data) : addTurno(data));
        setSelectedTurno(data);
      } else if (subject === "cliente") {
        dispatch(id ? updateClient(data) : addClient(data));
        setSelectedClient(data);
      } else if (subject === "mascota") {
        dispatch(id ? updateMascota(data) : addMascota(data));
        setSelectedMascota(data);
      }

      dispatch(
        setAlert({ message: "Se ha guardado con éxito", type: "success" })
      );
    } catch (error) {
      const isNetworkError = error.message.includes("NetworkError");
      const alertMessage = isNetworkError ? "API not available" : error.message;
      dispatch(setAlert({ message: alertMessage, type: "error" }));
      setPostDataError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { postDataResponse, postDataError, postData };
};

export default usePostData;
