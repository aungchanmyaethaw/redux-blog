import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const BASE_URL = "  http://localhost:8000";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const res = await axios.get(BASE_URL + "/users");
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers(builder) {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => state.users;

export const selectUserById = createSelector(
  [selectAllUsers, (state, userId) => userId],
  (users, userId) => {
    return users.find((user) => user.id === userId);
  }
);

export default userSlice.reducer;
