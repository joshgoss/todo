import {
    addNotification,
    notificationType,
} from "../features/notifications/notificationsSlice";
import { wipeSession } from "../features/account/accountActions";
import { store } from "../store";
import { getAuth, hasTokenExpired } from "./session";

export const JSON_CONTENT_TYPE = "application/json;charset=utf-8";
export const FORM_CONTENT_TYPE =
    "application/x-www-form-urlencoded;charset=utf-8";

const convertData = (contentType = JSON_CONTENT_TYPE, data) => {
    if (!data) {
        return data;
    }

    if (contentType === JSON_CONTENT_TYPE) {
        return JSON.stringify(data);
    } else if (contentType === FORM_CONTENT_TYPE) {
        return Object.keys(data)
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(
                        data[key]
                    )}`
            )
            .join("&");
    } else {
        throw new Error(`Unsupported content type: ${contentType}`);
    }
};

export const apiFetch = async ({
    endpoint = "",
    method = "",
    isForm = false,
    data,
    params = undefined,
    headers = {
        "Content-Type": JSON_CONTENT_TYPE,
    },
}) => {
    const ep = endpoint.startsWith("/") ? endpoint.substring(1) : endpoint;
    const url = `${process.env.REACT_APP_API_URL}${ep}`;

    let h = { "Content-Type": JSON_CONTENT_TYPE, ...headers };
    const auth = getAuth();

    if (auth && auth.access_token) {
        if (hasTokenExpired(auth.expiration)) {
            store.dispatch(wipeSession());
            window.location = "/login";
            return Promise.reject(null);
        }

        h["Authorization"] = `Bearer ${auth.access_token}`;
    }

    let message = "Something went wrong while performing a request.";

    const response = await fetch(url, {
        method,
        cache: "no-cache",
        credentials: "include",
        headers: h,
        mode: "cors",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: convertData(headers["Content-Type"], data),
    })
        .then((r) => {
            if (!r.ok) {
                return r
                    .json()
                    .then((json) => {
                        store.dispatch(
                            addNotification({
                                message:
                                    typeof json.detail === "string"
                                        ? json.detail
                                        : message,
                                type: notificationType.FAILURE,
                            })
                        );
                    })
                    .catch((r) => {
                        store.dispatch(
                            addNotification({
                                message: message,
                                type: notificationType.FAILURE,
                            })
                        );
                        return Promise.reject(r);
                    });
            }

            return Promise.resolve(r);
        })
        .catch((e) => {
            e.json()
                .then((json) => {
                    store.dispatch(
                        addNotification({
                            message:
                                typeof json.detail === "string"
                                    ? json.detail
                                    : message,
                            type: notificationType.FAILURE,
                        })
                    );

                    return Promise.resolve(json);
                })
                .catch((r) => {
                    store.dispatch(
                        addNotification({
                            message,
                            type: notificationType.FAILURE,
                        })
                    );

                    return Promise.reject(e);
                });
        });

    return response.json();
};

export const destroy = (endpoint = "", params) => {
    return apiFetch({
        endpoint,
        method: "DELETE",
        params,
    });
};

export const get = (endpoint = "", params = {}) => {
    return apiFetch({
        endpoint,
        method: "GET",
        params,
    });
};

export const post = (endpoint = "", data = {}, headers = {}) => {
    return apiFetch({
        endpoint,
        method: "POST",
        data,
        headers,
    });
};

export const put = (endpoint = "", data = {}, headers = {}) => {
    return apiFetch({
        endpoint,
        method: "PUT",
        data,
        headers,
    });
};

const api = {
    apiFetch,
    destroy,
    get,
    post,
    put,
};

export default api;
