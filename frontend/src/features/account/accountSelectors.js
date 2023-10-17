import { createSelector } from "@reduxjs/toolkit";

const getAuthState = (state) => state.session.auth;
const getAccountState = (state) => state.session.account;

export const isAuthenticatedSelector = createSelector([getAuthState], (auth) =>
  auth && auth.access_token ? true : false
);

export const accountSelector = createSelector(
  [getAccountState],
  (account) => account
);
