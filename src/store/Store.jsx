import { configureStore } from "@reduxjs/toolkit";
import uiStateSlice from "./uiStateSlice";
import turnoReducer from "./turnoReducer";
import clientReducer from "./clientReducer";
import mascotReducer from "./mascotReducer";

export const store = configureStore({
  reducer: {
    uiState: uiStateSlice,
    turno: turnoReducer,
    cliente: clientReducer,
    mascota: mascotReducer,
  },
});
