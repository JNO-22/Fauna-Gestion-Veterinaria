import { createSlice } from "@reduxjs/toolkit";

const mascotReducer = createSlice({
  name: "mascot",
  initialState: {
    items: [],
    selectedMascota: null,
  },
  reducers: {
    setMascotas: (state, action) => {
      state.items = action.payload;
    },
    addMascota: (state, action) => {
      state.items.push(action.payload);
    },
    updateMascota: (state, action) => {
      const index = state.items.findIndex(
        (mascota) => mascota._id === action.payload._id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteMascota: (state, action) => {
      state.items = state.items.filter(
        (mascota) => mascota._id !== action.payload
      );
    },
    setSelectedMascota: (state, action) => {
      state.selectedMascota = action.payload;
    },
  },
});

export const {
  setMascotas,
  addMascota,
  updateMascota,
  deleteMascota,
  setSelectedMascota,
} = mascotReducer.actions;

export default mascotReducer.reducer;
