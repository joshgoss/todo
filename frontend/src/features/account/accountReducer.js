import { createReducer } from "@reduxjs/toolkit";
import { fetchMe, loadSession, login, wipeSession } from "./accountActions";
import { getAuth, getAccount } from "../../utils/session";

const initialState = { auth: null, account: null };

const accountReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadSession, (state, action) => {
      state.auth = getAuth();
      state.account = getAccount();
    })
    .addCase(wipeSession, (state, action) => {
      state.auth = null;
      state.account = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload;
    })
    .addCase(fetchMe.fulfilled, (state, action) => {
      state.account = action.payload;
    });
});

export default accountReducer;
