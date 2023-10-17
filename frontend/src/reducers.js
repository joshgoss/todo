import { combineReducers } from "redux";
import notificationsReducer from "./features/notifications/notificationsSlice";
import accountReducer from "./features/account/accountReducer";
import todoReducer from "./features/todo/todoSlice";

export const rootReducer = combineReducers({
  notifications: notificationsReducer,
  session: accountReducer,
  todos: todoReducer,
});

export default rootReducer;
