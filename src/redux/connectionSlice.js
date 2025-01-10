import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance as axios } from "../services/Api";

const BASE_URL = "https://adminsr.life/public/api";

const connectionService = {
     createConnection: async (data) => {
          return await axios.post(`${BASE_URL}/new-connections`, data);
     },
     getAllConnections: async () => {
          return await axios.get(`${BASE_URL}/new-connections`);
     },
     getConnection: async (id) => {
          return await axios.get(`${BASE_URL}/new-connections/${id}`);
     },
     updateConnection: async (id, data) => {
          return await axios.put(`${BASE_URL}/new-connections/${id}`, data);
     },
     deleteConnection: async (id) => {
          return await axios.delete(`${BASE_URL}/new-connections/${id}`);
     },
};

export const createConnection = createAsyncThunk(
     "connections/create",
     async (data) => {
          const response = await connectionService.createConnection(data);
          return response.data;
     },
);

export const fetchConnections = createAsyncThunk(
     "connections/fetchAll",
     async () => {
          const response = await connectionService.getAllConnections();
          return response.data;
     },
);

export const fetchConnectionByCustomerId = createAsyncThunk(
     "connections/fetchByCustomerId",
     async (customerId) => {
          const response = await connectionService.getConnection(customerId);
          return response.data;
     },
);

export const updateConnection = createAsyncThunk(
     "connections/update",
     async ({ id, data }) => {
          const response = await connectionService.updateConnection(id, data);
          return response.data;
     },
);

export const deleteConnection = createAsyncThunk(
     "connections/delete",
     async (id) => {
          await connectionService.deleteConnection(id);
          return id;
     },
);

const connectionSlice = createSlice({
     name: "connections",
     initialState: {
          items: [],
          isLoading: false,
          error: null,
     },
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(createConnection.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(createConnection.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.items.push(action.payload);
               })
               .addCase(createConnection.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message;
               })
               .addCase(fetchConnections.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(fetchConnections.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.items = action.payload;
               })
               .addCase(fetchConnections.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message;
               })
               .addCase(updateConnection.fulfilled, (state, action) => {
                    const index = state.items.findIndex(
                         (item) => item.id === action.payload.id,
                    );
                    if (index !== -1) {
                         state.items[index] = action.payload;
                    }
               })
               .addCase(deleteConnection.fulfilled, (state, action) => {
                    state.items = state.items.filter(
                         (item) => item.id !== action.payload,
                    );
               });
     },
});

export default connectionSlice.reducer;
