import { Dispatch } from "@reduxjs/toolkit";

export type ReduxType = {
  getState: any;
  dispatch: Dispatch<any>;
  rejectWithValue: any;
};

export type ApiResponse<T> = {
  // payload: {
  data: T;
  total?: number;
  // };
};

export type ApiResponseError = {
  payload: {
    data: {
      message: string;
      name: string;
      stack?: string;
      status: number;
    };
  };
};
