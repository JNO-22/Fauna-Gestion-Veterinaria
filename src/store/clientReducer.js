import { createSlice } from "@reduxjs/toolkit";

const clientReducer = createSlice({
  name: "client",
  initialState: {
    items: [],
    selectedClient: null,
  },
  reducers: {
    setClients: (state, action) => {
      state.items = action.payload;
    },
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
    addClient: (state, action) => {
      state.items.push(action.payload);
    },
    updateClient: (state, action) => {
      const index = state.items.findIndex(
        (client) => client._id === action.payload._id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteClient: (state, action) => {
      state.items = state.items.filter(
        (client) => client._id !== action.payload
      );
    },
  },
});

export const {
  setClients,
  setSelectedClient,
  addClient,
  updateClient,
  deleteClient,
} = clientReducer.actions;

export default clientReducer.reducer;
