import { ACTIONS } from "redux-api-call";

const addRequestHeadersMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const { type, payload } = action;
    const isFormData = payload.body instanceof FormData;

    if (type === ACTIONS.START) {
      const defaultHeaders = !isFormData
        ? { "Content-Type": "application/json" }
        : {};

      const withHeadersAction = {
        type: ACTIONS.START,
        payload: {
          ...payload,
          body: isFormData ? payload.body : JSON.stringify(payload.body),
          headers: {
            Accept: "application/json",
            ...defaultHeaders,
            ...payload.headers,
          },
        },
      };
      next(withHeadersAction);
    } else {
      next(action);
    }
  };

export default addRequestHeadersMiddleware;
