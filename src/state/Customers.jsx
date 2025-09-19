import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CUSTOMER_DATA, getLoginData } from "../services/Api";
import { localDB, storeCustomer } from "../db/db";
import { useDispatch } from "react-redux";
import { storeCustomerSuccess } from "../redux/localData/localCustomers";
export const fetchCustomerData = createAsyncThunk(
     "customer/fetchCustomerData",
     async (_, { dispatch }) => {
          let error = true;
          let data = null;
          let errorMessage = "";
          try {
               const token = sessionStorage.getItem("authToken");
               const response = await fetch(CUSTOMER_DATA + "?isAdmin=" + true, {
                    method: "get",
                    headers: new Headers({
                         "ngrok-skip-browser-warning": "69420",
                         Authorization: `Bearer ${token}`,
                    }),
               });
               data = await response.json();
               //check if data.data and data.userdata is not null, undefined or not an array
               if ((data.data != null || data.userdata == null || data.data.length != 0 || data.userdata.length != 0)) {
                    //console.log(data);
                    try {
                         /*
{id: 1, user_id: 1, diaryNumber: 2, aadhar_card_no: '437567655333', totalBalance: '103772'}
                         */
                         const customers = data.data;
                         /*
{id: 102, name: 'UMASHANKAR', address: 'ROHITVASH', phone_no: '9998259700'}
                         */
                         const users = data.userdata;
                         //customer-user_id = user-id
                         customers.forEach((customer) => {
                              const user = users.find((user) => user.id == customer.user_id);
                              //console.log("store customer");
                              storeCustomer(
                                   customer.id,
                                   customer.user_id,
                                   user.name,
                                   customer.aadhar_card_no,
                                   customer.diaryNumber,
                                   user.address,
                                   user.phone_no,
                                   customer.totalBalance
                              )
                         });
                         dispatch(storeCustomerSuccess());
                    } catch (e) {
                         console.log(e)
                    }
               }
               error = false;
          } catch (e) {
               console.warn(e);
               error = true;
               errorMessage = e.message;
          }
          return { data, error, errorMessage };
     },
);

const customerSlice = createSlice({
     name: "customer",
     initialState: {
          isLoading: false,
          data: null,
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(fetchCustomerData.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(fetchCustomerData.fulfilled, (state, action) => {
               state.isLoading = false;
               state.data = action.payload.data;
               state.isError = action.payload.error;
               state.errorMessage = action.payload.errorMessage;
          });
          builder.addCase(fetchCustomerData.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default customerSlice.reducer;