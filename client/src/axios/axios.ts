import axios from "axios-observable";
import { useToast } from "vue-toastification";

/**
 * Setup Axios
 */

const $axios = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});

/**
 * Interceptors
 */

$axios.interceptors.response.use(
    res => res,
    err => {
        const toast = useToast();
        const errorResponse = err.response;
        const error = err.response.data;

         if (error) {
            switch (errorResponse.status) {
                case 400: {
                    if (error.errors) {

                        const modalStateErrors = [];
                        for (const key in error.errors) {
                            console.log(key);
                            if (error.errors[key]) {
                                toast.error(error.errors[key][0]);
                                modalStateErrors.push(error.errors[key][0]);
                            }
                        }
                        console.log(modalStateErrors);
                        throw modalStateErrors;
                    }
                    else {
                        toast.error(errorResponse.status + ': ' + error);
                        throw err;
                    }

                }
                case 401: {
                    toast.error(errorResponse.status + ': ' + error);
                    throw err;
                }
                case 404: {
                    toast.error(errorResponse.status + ': ' + error);
                    throw err;
                }
                case 500: {
                    toast.error(errorResponse.status + ': ' + error);
                    throw err;
                }
                default: {
                    toast.error('Something unexpected happened!');
                    console.error(error);
                    throw err;
                }
                
            }
        } else if (err.response.status) {
            toast.error(err.response.status + ': ' + err.response.data);
        }
        
        throw err;
    }
  );

export default $axios;