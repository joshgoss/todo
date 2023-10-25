import "./LoginLayout.scss";
import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginLogo from "./LoginLogo";
import Notification from "../features/notifications/Notification";
import { clearNotifications } from "../features/notifications/notificationsSlice";

const LoginLayout = ({ children }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearNotifications());
        });
    }, [dispatch, history]);

    return (
        <div className="login-layout">
            <Notification />
            <main className="page">
                <div className="brand">
                    <div className="brand-content">
                        <LoginLogo />
                    </div>
                </div>
                <div className="page-content">{children}</div>
            </main>
        </div>
    );
};

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <LoginLayout>
                    <Component {...props} />
                </LoginLayout>
            )}
        />
    );
};

export default LoginLayoutRoute;
