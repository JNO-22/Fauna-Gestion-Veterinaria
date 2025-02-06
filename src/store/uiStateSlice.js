import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  Alert: {
    visible: false,
    message: "",
    type: "",
  },
};

const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAlert: (state, action) => {
      state.Alert.visible = true;
      state.Alert.message = action.payload.message;
      state.Alert.type = action.payload.type;
    },
    clearAlert: (state) => {
      state.Alert.visible = false;
      state.Alert.message = "";
      state.Alert.type = "";
    },
  },
});

export const { setLoading, setAlert, clearAlert } = uiStateSlice.actions;

export default uiStateSlice.reducer;
