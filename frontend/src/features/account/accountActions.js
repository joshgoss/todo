import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import api, { FORM_CONTENT_TYPE } from "../../utils/api";
import { setAccount, setAuth, clearSession } from "../../utils/session";

export const fetchUsernameExists = createAsyncThunk(
    "account/fetchUsernameExists",
    async (username, thunkAPI) => {
        return await api.get(
            `/users/username-exists/${encodeURIComponent(username)}`
        );
    }
);

export const createAccount = createAsyncThunk(
    "account/create",
    async (data, thunkAPI) => {
        return await api.post(`/users/`, data);
    }
);

export const login = createAsyncThunk(
    "account/login",
    async (data, thunkAPI) => {
        console.log("inside login action: ");

        const resp = await api.post(`/token/`, data, {
            "Content-Type": FORM_CONTENT_TYPE,
        });
        console.log("finish login action");
        setAuth(resp);
        return resp;
    }
);

export const fetchMe = createAsyncThunk(
    "account/fetchMe",
    async (username, thunkAPI) => {
        const resp = await api.get(`/users/me`);
        setAccount(resp);
        return resp;
    }
);

export const loadSession = createAction("session/load");

export const wipeSession = createAction("session/clear", () => {
    clearSession();
    return { payload: {} };
});
