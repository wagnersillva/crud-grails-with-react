import { SERVER_URL } from  "../../config";
import request from "../../requests";
import { headers } from "./headers";
export const API = {

    get: ({ url, id = null, customHeader }) => {
      return new Promise((resolve, reject) =>{
            try {
                const promise = request({ url: `${SERVER_URL}/api/${url}`, id: id ? id : null, method: "GET", headers: customHeader || headers });
                promise.then( e => {
                   if(e.success) {
                        resolve({ success: true, data: e.data });
                   } else {
                        reject({ success: false, message: e.message, cod: e.cod });
                   }
                })
            } catch(e) {
                reject({ success: false, message: e });
            }
      })
    },
    post: ({ url, body, customHeader }) => {
        return new Promise((resolve, reject) =>{
            try {
                const promise = request({ url: `${SERVER_URL}/api/${url}`, method: "POST", body, headers: customHeader || headers });
                promise.then( e => {
                   if(e.success) {
                        resolve({ success: true, data: e.data });
                   } else {
                        reject({ success: false, message: e.message, cod: e.cod });
                   }
                })
            } catch(e) {
                reject({ success: false, message: e });
            }
      })
    },
    put: ({ url, id, body, customHeader }) => {
        return new Promise((resolve, reject) =>{
            try {
                const promise = request({ url: `${SERVER_URL}/api/${url}`, id: id ? id : null, method: "PUT", body, headers: customHeader || headers });
                promise.then( e => {
                   if(e.success) {
                        resolve({ success: true, data: e.data });
                   } else {
                       reject({ success: false, message: e.message, cod: e.cod });
                    }
                })
            } catch(e) {
                reject({ success: false, message: e });
            }
      })
    },
    delete: ({ url, id, customHeader }) => {
        return new Promise((resolve, reject) =>{
            try {
                if(!id){
                    reject({ success: false, message: "Id is require" }); 
                }
                const promise = request({ url: `${SERVER_URL}/api/${url}`, id, method: "DELETE", headers: customHeader || headers });
                promise.then( e => {
                   if(e.success) {
                        resolve({ success: true, data: e.data });
                   } else {
                        reject({ success: false, message: e.message });
                   }
                })
            } catch(e) {
                reject({ success: false, message: e });
            }
      })
    }

}