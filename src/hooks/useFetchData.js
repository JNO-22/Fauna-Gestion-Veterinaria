import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setAlert, clearAlert } from "../store/uiStateSlice";
import { useSelector } from "react-redux";
import { setTurnos } from "../store/turnoReducer";
import { setMascotas, setSelectedMascota } from "../store/mascotReducer";
import { setClients, setSelectedClient } from "../store/clientReducer";

const useFetchData = (resourceType, resourceId = null) => {
  const existingItems = useSelector((state) => state[resourceType].items);
  const dispatch = useDispatch();

  const [fetchedData, setFetchedData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const apiEndpoint = `${import.meta.env.VITE_API_URL}/${resourceType}`;

  const fetchData = async () => {
    dispatch(setLoading(true));
    dispatch(clearAlert());

    try {
      const requestUrl = resourceId
        ? `${apiEndpoint}/${resourceId}`
        : apiEndpoint;
      const response = await fetch(requestUrl);

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.error || `Unexpected error: ${response.status}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      const data = result.data;

      if (resourceType === "turno") {
        dispatch(setTurnos(data));
      } else if (resourceType === "cliente") {
        dispatch(resourceId ? setSelectedClient(data) : setClients(data));
      } else if (resourceType === "mascota") {
        dispatch(resourceId ? setSelectedMascota(data) : setMascotas(data));
      }

      setFetchedData(data);
    } catch (error) {
      const isNetworkError = error.message.includes("NetworkError");
      const alertMessage = isNetworkError ? "API not available" : error.message;
      dispatch(setAlert({ message: alertMessage, type: "error" }));
      setFetchError({ message: alertMessage });
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (Array.isArray(existingItems) && existingItems.length > 0) {
      return;
    }
    console.log("fetching data...");
    fetchData();
    return;
  }, [resourceType, resourceId]);

  return { data: fetchedData, error: fetchError, fetchData };
};

export default useFetchData;
