import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ComponentsState = {
  snackbar: {
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
  };
};

const initialState: ComponentsState = {
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
};

export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<Omit<ComponentsState, "snackbar.open">>
    ) => {
      state.snackbar.open = true;
      state.snackbar = {
        ...state.snackbar,
        message: action.payload.snackbar.message,
        severity: action.payload.snackbar.severity,
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
      state.snackbar = {
        ...state.snackbar,
        message: "",
        severity: "info",
      };
    },
  },
});

export const { showSnackbar, hideSnackbar } = componentsSlice.actions;

export default componentsSlice.reducer;
