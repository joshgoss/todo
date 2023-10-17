import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const priority = {
  NONE: "none",
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const createTodo = createAsyncThunk(
  "todo/create",
  async (data, thunkAPI) => {
    return await api.post(`/todos/`, data);
  }
);

export const fetchTodos = createAsyncThunk(
  "todo/list",
  async (data, thunkAPI) => {
    return await api.get("/todos/");
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (id, thunkAPI) => {
    return await api.destroy(`/todos/${id}`);
  }
);

export const updateTodo = createAsyncThunk(
  "todo/update",
  async ({ id, data }, thunkAPI) => {
    return await api.put(`/todos/${id}`, data);
  }
);

const initialState = { data: [] };

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload.id);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.data = state.data.map((d) => {
          return d.id === action.payload.id
            ? {
                ...d,
                ...action.payload,
              }
            : d;
        });
      });
  },
});

export default todoSlice.reducer;
