import axios from "axios";

const Axios = axios.create({
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

Axios.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        const error = {
            status: err.response?.status,
            original: err,
            validation: {},
            message: null,
        };

        switch (err.response?.status) {
            case 422:
                for (let field in err.response?.data?.errors) {
                    error.validation[field] =
                        err.response?.data?.errors[field][0];
                }
                error.message = "Validation error";
                break;
            case 401:
                error.message = "Unauthorized";
                break;
            case 403:
                error.message = "Forbidden";
                break;
            case 404:
                error.message = "Not found";
                break;
            case 500:
                error.message =
                    "Internal server error. Please try again later.";
                break;
            default:
                error.message = "Something went wrong";
        }

        return Promise.reject(error);
    }
);

export default Axios;
