import axios from "axios";

type Methods = "get" | "post" | "put" | "patch" | "delete";

const defaults = {
  headers: () => ({
    "Content-Type": "application/json",
  }),
  error: {
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong. Please check your internet connection or contact our support.",
    status: 503,
    data: {},
  },
};

const api = (
  method: Methods,
  url: string,
  variables?: {}
): Promise<{ data: {} }> =>
  new Promise<{ data: {} }>((resolve, reject) => {
    axios({
      url,
      method,
      headers: defaults.headers(),
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
    }).then(
      (response: any) => {
        resolve(response);
      },
      () => {
        reject(defaults.error);
      }
    );
  });

export default {
  get: (...args: [url: string, variable?: {}]) => api("get", ...args),
  post: (...args: [url: string, variable?: {}]) => api("post", ...args),
  put: (...args: [url: string, variable?: {}]) => api("put", ...args),
  patch: (...args: [url: string, variable?: {}]) => api("patch", ...args),
  delete: (...args: [url: string, variable?: {}]) => api("delete", ...args),
};
