import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAuthToken = createAsyncThunk(
  'auth/fetchToken',
  async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/signin');
      if (!response.ok) {
        throw new Error('Failed to fetch authToken details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const sendAuthData = createAsyncThunk(
  'auth/sendData',
  async (formData) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to send auth details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthToken.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAuthToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const selectAuthData = (state) => state.auth.data;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
