import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
  "fetchusers",
  async (__, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/users", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "GET",
      });
      const data = await response.json();
      console.log("🚀 ~ data:", data);
      if (!response?.ok) {
        return rejectWithValue(data?.error);
      } else {
        return data;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        // return [...state, ...action];
        state.users = action.payload?.users;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.users = [];
      });
  },
});

export default userSlice.reducer;
