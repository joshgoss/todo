import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";

import AppLayoutRoute from "./layouts/AppLayout";
import LoginLayoutRoute from "./layouts/LoginLayout";
import CreateAccountPage from "./features/account/CreateAccountPage";
import LoginPage from "./features/account/LoginPage";
import TodoPage from "./features/todo/TodoPage";

function App() {
  return (
    <Router>
      <Switch>
        <LoginLayoutRoute
          exact
          path="/create-account"
          component={CreateAccountPage}
        />
        <LoginLayoutRoute exact path="/login" component={LoginPage} />
        <AppLayoutRoute exact path="/" component={TodoPage} />
      </Switch>
    </Router>
  );
}

export default App;
