import { createSlice } from "@reduxjs/toolkit";

const turnoReducer = createSlice({
  name: "turno",
  initialState: {
    items: [],
    selectedTurno: null,
  },
  reducers: {
    setTurnos: (state, action) => {
      state.items = action.payload;
    },
    addTurno: (state, action) => {
      state.items.push(action.payload);
    },
    updateTurno: (state, action) => {
      const index = state.items.findIndex(
        (turno) => turno._id === action.payload._id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTurno: (state, action) => {
      state.items = state.items.filter((turno) => turno._id !== action.payload);
    },
    setSelectedTurno: (state, action) => {
      state.selectedTurno = action.payload;
    },
  },
});

export const {
  setTurnos,
  addTurno,
  updateTurno,
  deleteTurno,
  setSelectedTurno,
} = turnoReducer.actions;
export default turnoReducer.reducer;
