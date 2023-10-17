import { createSelector, createSlice } from '@reduxjs/toolkit';

export const notificationType = {
  FAILURE: 'failure',
  SUCCESS: 'success',
  INFO: 'info'
}

const initialState = { data: [] }

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, action) => {
        state.data.unshift(action.payload)
      },
      prepare: ({
        message,
        type = notificationType.SUCCESS
      }={}) => {
        return {
          payload: {
            id: Date.now(),
            message,
            type
          }
          
        };
      }
    },
    dismissNotification: {
      reducer: (state, action) => (state.data = state.data.filter((n) => (n.id !== action.payload.id))),
      prepare: (id) => ({payload: {id}})
    },
    clearNotifications(state) {
        state.data = [];
    }
  },
});

export const {addNotification, dismissNotification, clearNotifications} = notificationsSlice.actions;
export default notificationsSlice.reducer;

const getNotifications = (state) => state.notifications.data;

export const selectNotification = createSelector(
  [getNotifications],
  (data) => (data.length > 0 ? data[0] : undefined),
);