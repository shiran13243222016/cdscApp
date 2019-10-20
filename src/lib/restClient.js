
//import axios from 'axios'

import { getRequest, postRequest } from './requestClient';

const convertRESTRequestToHTTP = (type, resource, params) => {
        const options = {};
        switch (type) {
            case "GET_LIST": {
                return getRequest(`${resource}`, params).then((response) => {
                    return response;
                });
            }
            case "GET_ONE":
                return getRequest(`${resource}`, params).then((response) => {
                    return response;
                });
            case "GET_MANY": {
                let filter = JSON.stringify({ id: params.ids });
                return getRequest(`${resource}`).then((response) => {
                    return { data: response.data };
                });
            }
            case "GET_MANY_REFERENCE": {
                // const { page, perPage } = params.pagination;
                // const { field, order } = params.sort;
                // const query = {
                //     //sort: JSON.stringify([field, order]),
                //     range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                //     filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
                // };
                return getRequest(`${resource}`).then((response) => {
                    return response;
                });
            }
            case "UPDATE":
				      // options.method = 'PUT';
				      options.body = params;
				      return postRequest(`${resource}`,options).then((response) => {
				        return response;
				      });

            case "CREATE":
                options.body = params;
                return postRequest(`${resource}`,options).then((response) => {
                    //return { data: { ...params.data, id: response.data.id }};
					//return { data: { ...params.body, id: response.data.id }};
					return response
                });
            case "DELETE":
                options.method = 'DELETE';
                options.body = params;
                return postRequest(`${resource}`,options).then((response) => {
                    return response;
                });
            //default:
               // return P.reject(Unsupported axios action type ${type});
        }
    }
    

export default convertRESTRequestToHTTP
