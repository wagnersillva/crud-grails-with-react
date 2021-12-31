import { errorCods } from "./errosRequestsCod";

export default  function request ({ url, id = null,  method, headers =  { "content-type" : "application/json" }, body }) {
    switch (method) {
        case "GET":
                return getRequest( { url, id, headers, method });
            break
        case "POST":
            return postRequest({ url, headers, method, body });
            break
        case "PUT":
            if(id){
                return postRequest({ url, id, headers, method, body });
            } else {
                 return  { succes: false, message: "id cannot be empty" };
            }
            break
        case "DELETE":
            if(id){
                return deleteRequest( { url, headers, id });
            } else {
                return  { succes: false, message: "id cannot be empty" };
            }
            break
        default:
           return  { succes: false, message: "Method not found" };
    }
}

const getRequest = ({ url, headers, id }) => {
    const urlRequest = `${ url }${ id ? `/${id}` : "" }`
    const entity = fetch(urlRequest, {
        method: 'GET',
        headers
    })
        .then( response => response.ok ? response.json() : {error: true, cod: response.status })
        .then( response => response.error ? {success: false, message: errorCods[response.cod], cod: response.cod} : {success: true, data: response})
        .catch( responseError => { return {success: false, message: responseError, cod: responseError }});
    return entity;
}

const postRequest = ({ url, id, method, headers, body }) => {
    const urlRequest = `${ url }${ id ? `/${id}` : "" }`
    const entity = fetch(urlRequest, {
        method,
        headers,
        body: JSON.stringify(body)
    })
        .then( response => response.ok ? response.json() : {error: true, cod: response.status })
        .then( response => response.error ? {success: false, message: errorCods[response.cod], cod: response.cod} : {success: true, data: response})
        .catch( responseError =>{ return { success: false, message: responseError, cod: responseError }});
     return entity;
}     

const deleteRequest = ({ url, id, headers }) => {
    const urlRequest = `${ url }${ id ? `/${id}` : "" }`
    const response = fetch(urlRequest, {
        method: 'DELETE',
        headers
    })
        .then( response => response.ok ? {success: true} : {error: true, cod: response.status })
        .catch(error => {
            return { success: false, message: error };;
        });
    return response;
}