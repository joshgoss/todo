import "./AppLayout.scss";
import { capitalize } from "lodash";
import React, { useEffect } from "react";
import { Route, Redirect, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLogo from "./AppLogo";
import Notification from "../features/notifications/Notification";
import { getAuth, hasTokenExpired, isAuthenticated } from "../utils/session";
import { wipeSession, fetchMe } from "../features/account/accountActions";
import { accountSelector } from "../features/account/accountSelectors";
import { clearNotifications } from "../features/notifications/notificationsSlice";

const TopBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const account = useSelector(accountSelector) || {};

    return (
        <div className="top-bar-container">
            <section className="top-bar">
                <div className="brand">
                    <AppLogo />
                </div>
                <div className="account">
                    <span className="username">
                        {capitalize(account.username)}&nbsp;
                    </span>
                    (
                    <Link
                        to="#"
                        onClick={() => {
                            dispatch(wipeSession());
                            history.push("/login");
                        }}
                    >
                        logout
                    </Link>
                    )
                </div>
            </section>
        </div>
    );
};

const AppLayout = ({ children }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearNotifications());
        });

        if (isAuthenticated()) {
            const auth = getAuth();

            if (hasTokenExpired(auth.expiration)) {
                dispatch(wipeSession());
                history.push("/login");
            } else {
                dispatch(fetchMe());
            }
        }
    }, [dispatch, history]);

    if (!isAuthenticated()) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="app-layout">
            <Notification />
            <TopBar />

            <main className="page">{children}</main>
        </div>
    );
};

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <AppLayout>
                    <Component {...props} />
                </AppLayout>
            )}
        />
    );
};

export default LoginLayoutRoute;
