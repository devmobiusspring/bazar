import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, ReduxType } from "@/types";

type AsyncAction<ReturnType, ArgType> = (
  args: ArgType,
  helpers: ReduxType
) => Promise<ApiResponse<ReturnType>>;

export const actionBuilder = <ReturnType, ArgType>(
  typePrefix: string,
  asyncAction: AsyncAction<ReturnType, ArgType>
): AsyncThunk<ApiResponse<ReturnType>, ArgType, {}> =>
  createAsyncThunk<ApiResponse<ReturnType>, ArgType>(
    typePrefix,
    async (args, { dispatch, rejectWithValue, getState }) => {
      try {
        return await asyncAction(args, { dispatch, rejectWithValue, getState });
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );
