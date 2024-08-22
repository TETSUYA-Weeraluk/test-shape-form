import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataUser } from "../../pages/Form/type";

export interface FormState {
  user: DataUser[];
  editUser: DataUser | null;
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

const initialState: FormState = {
  user: [],
  editUser: null,
  loading: "idle",
  error: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    loadData: (state) => {
      const oldData = localStorage.getItem("data");
      if (oldData) {
        state.user = JSON.parse(oldData);
      }
    },
    addUser: (state, action: PayloadAction<DataUser>) => {
      state.user.push(action.payload);
      localStorage.setItem("data", JSON.stringify(state.user));
    },
    editUser: (state, action: PayloadAction<DataUser>) => {
      state.editUser = action.payload;
    },
    updateUser: (state, action: PayloadAction<DataUser>) => {
      const index = state.user.findIndex(
        (item) => item.id === action.payload.id
      );
      state.user[index] = action.payload;
      localStorage.setItem("data", JSON.stringify(state.user));
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.user = state.user.filter((item) => item.id !== action.payload);
      localStorage.setItem("data", JSON.stringify(state.user));
    },
    resetForm: (state) => {
      state.editUser = null;
    },
  },
});

export const {
  loadData,
  addUser,
  editUser,
  resetForm,
  updateUser,
  deleteUser,
} = formSlice.actions;
export default formSlice.reducer;
