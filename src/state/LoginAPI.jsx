import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN, getUserDataFromCookie } from "../services/Api";

export const fetchLogin = createAsyncThunk(
     "login/fetchLogin",
     async (param) => {
          let isError = true;
          let errorMessage = "";
          let data = null;
          let token = null;
          try {
               if (!param.isLoadFromCookie) {
                    const { username, password } = param;
                    const response = await fetch(LOGIN, {
                         method: "post",
                         headers: {
                              "ngrok-skip-browser-warning": "69420",
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              username: username,
                              password: password,
                         }),
                    }).catch((e) => {
                         console.warn(e);
                         isError = true;
                         errorMessage = e.message;
                    });
                    const res = await response.json();
                    console.log(res);
                    data = res;
                    token = res.token;
                    if (
                         res.token == undefined ||
                         res.token == "" ||
                         res.token == null
                    ) {
                         isError = true;
                         errorMessage =
                              "Invalid username or password please check";
                    } else {
                         storeUserDataInCookie(data);
                         isError = false;
                    }
               } else {
                    let cookieData = getUserDataFromCookie();
                    if (
                         cookieData !== null &&
                         cookieData.token !== undefined &&
                         cookieData.token !== "" &&
                         cookieData.token !== null
                    ) {
                         data = cookieData;
                         token = cookieData.token;
                         isError = false;
                    }
                    //console.log(cookieData);
               }
               //console.log(data);
          } catch (e) {
               console.warn(e);
               isError = true;
               errorMessage = e.message;
          }
          return { data, token, isError, errorMessage };
     },
);

const loginSlice = createSlice({
     name: "login",
     initialState: {
          isLoading: false,
          data: null,
          isError: false,
          errorMessage: "",
          token: null,
     },
     extraReducers: (builder) => {
          builder.addCase(fetchLogin.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(fetchLogin.fulfilled, (state, action) => {
               //console.log(action.payload);
               state.isLoading = false;
               state.data = action.payload.data;
               state.isError = action.payload.isError;
               state.errorMessage = action.payload.errorMessage;
               state.token = action.payload.token;
          });
          builder.addCase(fetchLogin.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default loginSlice.reducer;

function storeUserDataInCookie(data) {
     document.cookie = `token=${data.token}`;
     document.cookie = `user_id=${data.LoginInfo.user_id}`;
     document.cookie = `role=${data.LoginInfo.role}`;
     document.cookie = `username=${data.LoginInfo.username}`;
     document.cookie = `name=${data.userDetails[0].name}`;
}